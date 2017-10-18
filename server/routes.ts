import * as express from 'express';

import ImageUploadCtrl from './controllers/image-upload';
import StudyCtrl from './controllers/study';
import PermissionCtrl from './controllers/permission';

export default function setRoutes(app) {

  const router = express.Router();

  const imageUploadCtrl = new ImageUploadCtrl();
  const studyCtrl = new StudyCtrl();
  const permissionCtrl = new PermissionCtrl();

  router.route('/image-upload').post(imageUploadCtrl.upload);

  router.route('/studies').get(studyCtrl.getAll);
  router.route('/studies').post(studyCtrl.insert);
  router.route('/study/:id').put(studyCtrl.update);
  router.route('/study/:id').delete(studyCtrl.delete);

  router.route('/permissions').get(permissionCtrl.getAll);
  router.route('/permissions').post(permissionCtrl.create);
  router.route('/permission/:id').delete(permissionCtrl.delete);

  // const userCtrl = new UserCtrl();
  //
  // // Users
  // router.route('/login').post(userCtrl.login);
  // router.route('/users').get(userCtrl.getAll);
  // router.route('/users/count').get(userCtrl.count);
  // router.route('/user').post(userCtrl.insert);
  // router.route('/user/:id').get(userCtrl.get);
  // router.route('/user/:id').put(userCtrl.update);
  // router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

