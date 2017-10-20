var auth = require('../services/jwtauth'),
    gdrive = require('../services/googleDrive'),
    mongoose = require('mongoose'),
    Share = mongoose.model('Share');
    //Share = require('../models/share'),

module.exports.controller = function(app){

    app.post('/api/share', [auth], function(req, res){
        //check that token is admin token
        if (!req.isAdmin) {
            res.end('Invalid token', 401);
            return;
        }
        var fileInfo = {
            path: ['eLab']
        }
        gdrive.share(fileInfo, req.body.email, req.body.permission, function(err){
            if (err) {
                console.log(err);
            } else {
                var share = new Share(req.body);
                share.save(function(err){
                    if (err) {
                        console.error(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    })

    app.get('/api/getShared', [auth], function(req, res){
        if (!req.isAdmin) {
            res.end('Invalid token', 401);
            return;
        }
        Share.find({}, {"__v": 0}).exec(function(err, result){
            if (err){
                console.error(err);
                res.status(500).send("Mongoose error. See logs.");
            } else {
                res.json(result);
            }
        });
    });

    app.post('/api/unshare', [auth], function(req, res){
        if (!req.isAdmin) {
            res.end('Invalid token', 401);
            return;
        }
        var fileInfo = {
            path: ['eLab']
        }
        gdrive.unshare(fileInfo, req.body.email, function(err) {
            if (err) {
                console.error(err);
            } else {
                Share.findByIdAndRemove(req.body._id, function (err) {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Mongoose error. See logs.");
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
}