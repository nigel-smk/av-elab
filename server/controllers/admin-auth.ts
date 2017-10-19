import * as jwt from 'jsonwebtoken';

export default class AdminAuthCtrl {

  constructor() { }

  login(req, res) {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (req.body.username === username && req.body.password === password) {
      const token = jwt.sign({ username: username, admin: true }, process.env.SECRET_TOKEN, { expiresIn: "7d" });
      res.status(200).json({ token: token });
    }
    else {
      res.status(401).end();
    }
  }

}
