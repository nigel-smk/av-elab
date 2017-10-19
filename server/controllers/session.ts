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
      .then((session) => {
        if (!session) {
          throw new Error('Session does not exist.')
        }
        return this.studyModel.findOne({ study: study });
      })
      .then((study) => {
        const payload = {
          subject: subject,
          study: study.study,
          youtubeId: study.youtubeId,
          briefing: study.briefing,
          redirect: study.redirect
        };
        // TODO fetch expiresIn from environment
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "3h" });
        res.status(200).json({ token: token });
      })
      .catch((err) => res.sendStatus(403));
  }

  testLogin = (req, res) => {
    const study = req.body.study;
    const subject = req.body.subject;

    if (subject !== 'test') {
      res.sendStatus(401);
      return;
    }

    this.studyModel.findOne({ study: study }).exec()
      .then((study) => {
        const payload = {
          subject: subject,
          study: study.study,
          youtubeId: study.youtubeId,
          briefing: study.briefing,
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
    const studyName = req.query.study;
    const token = req.query.token;
    const subject = shortid.generate();

    this.studyModel.findOne({ study: studyName, token: token }).exec()
      .then((study) => {
        if (!study) {
          throw new Error('Study not found.');
        }
        return new this.model({ study: studyName, subject: subject }).save();
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
