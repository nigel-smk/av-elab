import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import Session from '../models/session';
import BaseCtrl from './base';

export default class SessionCtrl extends BaseCtrl {
  model = Session;

  login = (req, res) => {
    const study = req.body.study;
    const subject = req.body.subject;

    this.model.findOne({ study: study, subject: subject }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      // TODO fetch expiresIn from environment
      const token = jwt.sign({ subject: subject }, process.env.SECRET_TOKEN, { expiresIn: "3h" });
      res.status(200).json({ token: token });
      });
  }

}
