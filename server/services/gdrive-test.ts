import gdrive  from './gdrive';
import * as fs from 'fs';

run().then(() => console.log('success'),
  (err) => console.error(err));

async function run() {
  // await gdrive.listFiles();
  await gdrive.init();
  // await gdrive.mkDir(['promiseTest']);
  // await gdrive.unLink(['promiseTest']);
  // await gdrive.mkDir(['promiseTest']);
  for (let x=0;x<80;x++) {
    console.log(x);
    gdrive.writeFile(['promiseTest', 'cat3.jpg'], fs.createReadStream('/home/nigel/dev/projects/av-elab/server/services/cat.jpg'));
  }
  // console.log(await gdrive.writeFile(['promiseTest', 'cat3.jpg'], fs.createReadStream('/home/nigel/dev/projects/av-elab/server/services/cat.jpg')));
  // await gdrive.createPermission(['promiseTest'], 'kahler.maynard@gmail.com', 'reader', 'user');
  // await gdrive.unLinkById('0B89mm4BwiIloejRnMGRHZkRxbDQ');
}
