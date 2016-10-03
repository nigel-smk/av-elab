var binaryServer = require('binaryjs').BinaryServer;
var drive = require('../services/googleDrive.js');
var fs = require('fs');
var jwt = require('jwt-simple');
var SECRET = require('../../credentials/jwtSecret.json').secret;

module.exports = function(server, path) {
    var server = binaryServer({server: server, path: path});

    server.on('connection', function (client) {
        var fileWriter = null;

        client.on('stream', function (stream, meta) {

            //validate the token
            try {
                var decoded = jwt.decode(meta.token, SECRET);
                if (decoded.exp <= Date.now()) {
                    client.close();
                    return;
                }
            } catch(err) {
                //TODO no error message is returned
                console.error('binary-server | Unauthorized connection rejected')
                client.close();
                return;
            }

            //stream.pipe(fs.createWriteStream('test.ogv'));

            drive.insert({
                path: ['eLab', meta.sid, new Date().toLocaleDateString("en-US")],
                title: meta.pid + ".ogv",
                body:stream
            });

            stream.on('end', function() {
                console.log("mic readStream has ended.");
            });
        });
    });
};

