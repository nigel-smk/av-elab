import * as express from 'express';

import ImageUploadCtrl from './controllers/image-upload';
import StudyCtrl from './controllers/study';
import PermissionCtrl from './controllers/permission';
import auth from './middleware/auth';
import adminAuth from './middleware/admin-auth';
import AdminAuthCtrl from './controllers/admin-auth';

export default function setRoutes(app) {

  const router = express.Router();

  const imageUploadCtrl = new ImageUploadCtrl();
  const studyCtrl = new StudyCtrl();
  const permissionCtrl = new PermissionCtrl();
  const adminAuthCtrl = new AdminAuthCtrl();

  router.route('/image-upload').post([auth], imageUploadCtrl.upload);

  router.route('/studies').get([adminAuth], studyCtrl.getAll);
  router.route('/studies').post([adminAuth], studyCtrl.insert);
  router.route('/study/:id').put([adminAuth], studyCtrl.update);
  router.route('/study/:id').delete([adminAuth], studyCtrl.delete);

  router.route('/permissions').get([adminAuth], permissionCtrl.getAll);
  router.route('/permissions').post([adminAuth], permissionCtrl.create);
  router.route('/permission/:id').delete([adminAuth], permissionCtrl.delete);

  router.route('/admin/auth').post(adminAuthCtrl.login);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

