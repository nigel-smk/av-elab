import * as uuid from 'uuid/v4';

import BaseCtrl from './base';
import Study from '../models/study';
import Session from '../models/session';
import gdrive from '../services/gdrive';

// TODO study routes require admin access
export default class StudyCtrl extends BaseCtrl {
  model = Study;
  sessionModel = Session;

  insert = (req, res) => {
    // generate unique token for session creation
    req.body.token = uuid();

    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

  // Delete by id
  delete = (req, res) => {
    // TODO how to handle one of the cascade delete jobs failing
    let study;

    this.model.findOne({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          throw "study doesn't exist";
        }
        study = data;

        return data.remove();
      })
      .then(() => {
        return this.sessionModel.remove({ study: study.study });
      })
      .then(() => {
        return gdrive.unLink(['eLab', study.study]);
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: 'cascade delete failed.' })
      });

  }

}
