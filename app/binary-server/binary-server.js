var binaryServer = require('binaryjs').BinaryServer;
var drive = require('../services/googleDrive.js');
var fs = require('fs');

module.exports = function(server, path) {
    var server = binaryServer({server: server, path: path});

    server.on('connection', function (client) {
        var fileWriter = null;

        client.on('stream', function (stream, meta) {

            stream.on('end', function() {
                console.log("mic readStream has ended.");
            });

            //stream.pipe(fs.createWriteStream('test.ogv'));

            drive.insert({
                path: ['eLab', 'avData', meta.sid, new Date().toLocaleDateString("en-US")],
                title: meta.pid + ".ogv",
                body:stream
            });
        });

        // client.on('close', function () {
        //     if (stream != null) {
        //         stream.end();
        //     }
        // });
    });
};

