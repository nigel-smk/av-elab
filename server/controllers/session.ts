import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as shortid from 'shortid';

import Session from '../models/session';
import BaseCtrl from './base';
import Study from '../models/study';

export default class SessionCtrl extends BaseCtrl {
  model = Session;
  private studyModel = Study;

  login = (req, res) => {
    const study = req.body.study;
    const subject = req.body.subject;

    this.model.findOne({ study: study, subject: subject }).exec()
      .then((user) => {
        return this.studyModel.findOne({ study: study });
      })
      .then((study) => {
        const payload = {
          subject: subject,
          youtubeId: study.youtubeId,
          instructions: study.instructions,
          redirect: study.redirect
        };
        // TODO fetch expiresIn from environment
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "3h" });
        res.status(200).json({ token: token });
      })
      .catch((err) => res.sendStatus(403));
  }

  // this route is called by a WebService module on the qualtrics presurvey. It generates a subject and returns it to the survey.
  // the survey then redirects to the eLab, logging in with the provided subject and study.
  create = (req, res) => {
    const study = req.params.study;
    const token = req.params.token;
    const subject = shortid.generate();

    this.studyModel.findOne({ study: study, token: token }).exec()
      .then(() => {
        return new this.model({ study: study, subject: subject }).save();
      })
      .then(() => {
        // qualtrics expects a string of this format
        res.status(200).send(`subject=${subject}`);
      })
      .catch(() => {
        res.status(400).end();
      });
  }

}
