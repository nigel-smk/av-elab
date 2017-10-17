import { GDrive } from './gdrive';
import * as fs from 'fs';

const drive = new GDrive();

run().then(() => console.log('success'),
  (err) => console.error(err));

async function run() {
  await drive.init();
  //await drive.mkDir(['first', 'second']);
  // await drive.unLink(['eLab']);
  await drive.mkDir(['eLab', 'pics']);
  await drive.writeFile(['eLab', 'pics', 'cat.jpg'], fs.createReadStream('/home/nigel/dev/projects/elab/server/services/cat.jpg'));
  await drive.createPermission(['eLab'], 'kahler.maynard@gmail.com', 'reader', 'user');
}
