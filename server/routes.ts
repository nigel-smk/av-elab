import * as express from 'express';

import ImageUploadCtrl from './controllers/image-upload';

export default function setRoutes(app) {

  const router = express.Router();

  const imageUploadCtrl = new ImageUploadCtrl();

  router.route('/image-upload').post(imageUploadCtrl.upload);

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

