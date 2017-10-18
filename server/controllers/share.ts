import gdrive from '../services/gdrive';

export default class ShareCtrl {

  constructor() { }

  create(req, res) {
    const email = req.body.email;
    if (!email) {
      // TODO give more details
      res.status(400).send();
    }

    gdrive.createPermission(['eLab'], email, 'reader', 'user')
      .then(() => {
        res.status(200).end();
        return;
      })
      .catch((err) => {
        res.status(500).end();
        return;
      })
  }

  get(req, res) {
    gdrive.getPermissions(['eLab'])
      .then((permissions) => {
        const readerPermissions = permissions.filter((permission) => permission.role === 'reader');
        res.json(readerPermissions);
      })
      .catch((err) => {
        res.status(500).end();
      });

  }

  delete(req, res) {
    const email = req.body.email;
    if (!email) {
      // TODO give more details
      res.status(400).send();
    }

    gdrive.deletePermission(['eLab'], email)
      .then(() => res.status(200).end())
      .catch((err) => res.status(500).end());
  }

}
