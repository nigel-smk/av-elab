import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Server, createServer } from 'http';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import gdrive from './services/gdrive';

import setRoutes from './routes';

const app = express();
const server: Server = createServer(app);

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.MONGODB_TEST_URI);
} else {
  mongoose.connect(process.env.MONGODB_URI);
}

const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  gdrive.init()
    .then(() => {
      return gdrive.mkDir(['eLab']);
    })
    .then(() => {

      setRoutes(app);

      app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });

      if (!module.parent) {
        server.listen(app.get('port'), () => {
          console.log('Angular Full Stack listening on port ' + app.get('port'));
        });
      }
    });



});

export { app };
