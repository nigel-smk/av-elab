import * as jwt from 'jsonwebtoken';

export default function(req, res, next) {
  const token = req.headers['x-access-token'];
  // (req.body && req.body.access_token)
  // || (req.query && req.query.access_token)
  // ||

  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.auth = {
        subject: decoded.subject,
        study: decoded.study
      };
      next();
    } catch (err) {
      console.error(err);
      res.status(401).send('Invalid token');
    }
  } else {
    console.error("jwtAuth | error: no access token in request");
    res.status(401).send('Invalid token');
  }
}

