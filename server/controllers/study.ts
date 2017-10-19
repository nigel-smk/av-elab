import * as uuid from 'uuid/v4';

import BaseCtrl from './base';
import Study from '../models/study';

// TODO study routes require admin access
export default class StudyCtrl extends BaseCtrl {
  model = Study;

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

}
