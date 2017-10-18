import BaseCtrl from './base';
import Study from '../models/study';

// TODO do not serve the study's token with getAll (check for admin permissions)
export default class StudyCtrl extends BaseCtrl {
  model = Study;
}
