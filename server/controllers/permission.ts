import gdrive from '../services/gdrive';

export default class PermissionCtrl {

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

  getAll(req, res) {
    gdrive.getPermissions(['eLab'])
      .then((permissions) => {
        const readerPermissions = permissions.filter((permission) => permission.role === 'reader');
        res.json(readerPermissions.length === 0 ? [] : readerPermissions);
      })
      .catch((err) => {
        res.status(500).end();
      });

  }

  delete(req, res) {
    const id = req.params.id;
    if (!id) {
      // TODO give more details
      res.status(400).send();
    }

    gdrive.deletePermissionById(['eLab'], id)
      .then(() => res.status(200).end())
      .catch((err) => res.status(500).end());
  }

}
