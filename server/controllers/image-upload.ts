import * as fs from'fs';
import * as stream from 'stream';

export default class ImageUploadCtrl {

  constructor() { }

  upload(req, res) {
    console.log(req.body.snapshot);

    let stream;

    try {
      stream = decodeBase64Image(req.body.snapshot);
    }
    catch (e) {
      res.status(400).end();
      return;
    }

    res.status(200).end();

    stream.data.pipe(fs.createWriteStream('testPic.jpeg'));
  }

}

function decodeBase64Image(dataString): {type: string, data: stream.PassThrough} {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !==3) {
    throw new Error('Invalid encoding');
  }

  let passThrough = new stream.PassThrough();
  passThrough.end(new Buffer(matches[2], 'base64'));

  return {
    type: matches[1],
    data: passThrough
  };
}
