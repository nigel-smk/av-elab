import gdrive  from './gdrive';
import * as fs from 'fs';

run().then(() => console.log('success'),
  (err) => console.error(err));

async function run() {
  await gdrive.listFiles();
  //await gdrive.init();
  //await drive.mkDir(['first', 'second']);
  //await gdrive.unLink(['eLab']);
  //await gdrive.mkDir(['eLab']);
  //console.log(await gdrive.writeFile(['eLab', 'pics', 'cat3.jpg'], fs.createReadStream('/home/nigel/dev/projects/elab/server/services/cat.jpg')));
  //await gdrive.createPermission(['eLab'], 'kahler.maynard@gmail.com', 'reader', 'user');
  //await gdrive.unLinkById('0B89mm4BwiIloXzJtWDd4TWRXdk0');
}
