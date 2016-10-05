;//TODO better way to do path?
var mongoose = require('mongoose'),
    Study = mongoose.model('Study'),
    Session = mongoose.model('Session'),
    //Study = require('../../models/study'),
    //Session = require('../../models/session'),
    AppData = require('../../models/appData'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    flakeIdGen = require('flake-idgen'),
    intformat = require('biguint-format'),
    generator = new flakeIdGen,
    SECRET = require('../../../credentials/jwtSecret.json').secret;

module.exports.controller = function(app) {

    //TODO change to /api/auth/admin
    app.post('/api/auth', function (req, res) {
        console.log(req.body);
        if (req.body.username == 'admin' && req.body.password == 'petersonelab1!') {
            var expires = moment().add('hours', 16).valueOf();
            var token = jwt.encode({
                admin: true,
                exp: expires
            }, SECRET);

            res.json({
                token: token,
                exp: expires,
                user: req.body.username
            });
        } else {
            res.send(401);
        }
    });

    //provides a key (participantId) to the qualtrics survey for later authentication
    app.get('/api/auth/generateKey', function(req, res) {
        var studyKey = req.query.studyKey;
        var sid = req.query.sid;
        if (!sid || !studyKey){
            //TODO server crashes when calling res.end(418); Could this be because GET requires a string be sent?
            res.send("Error: sid or studyKey parameter is missing from the url query parameters.");
            return;
        }
        Study.findOne({sid: sid, key: studyKey}).exec(function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error: internal database error");
                //res.end(418);
                return;
            } else if (result == null) { //the study does not exist
                res.send("Error: invalid sid");
                //res.end(418);
                return;
            }
            var pid = intformat(generator.next(), 'dec');
            var session = new Session({
                sid: sid,
                pid: pid
            });
            session.save(function (err) {
                if (err) {
                    console.error(err);
                    res.send("Error: internal database error");
                    //res.send(500);
                    return;
                }
                res.send('pid=' + pid);
            });
        });
    });

    //authenticates the participantId/sid and generates a JWTtoken
    app.post('/api/auth/session', function (req, res) {
        var sid = req.body.sid;
        var pid = req.body.pid;
        Study.findOne({sid: sid, pid: pid}).exec(function (err, studyResult) {
            if (err) {
                console.error(err);
                //todo better status
                res.end(418);
                return;
            }

            //authenticate user
            console.log('auth | authentication for ', sid, ', ', pid, 'successful.');
            var expires = moment().add('hours', 1).valueOf();
            var token = jwt.encode({
                sid: sid,
                pid: pid,
                exp: expires
            }, SECRET);
            res.json({
                token: token,
                exp: expires,
                pid: pid,
                sid: sid,
                youTubeId: studyResult.youTubeId,
                instructions: studyResult.instructions,
                redirect: studyResult.redirect
            });
            //log the session start
            Session.findOneAndUpdate(
                {
                    sid: sid,
                    pid: pid
                },
                {
                    $push: {
                        activity: {
                            type: "progress",
                            description: "User authenticated"
                        }
                    }
                },
                null, 
                function (result) {
                    if (err) {
                        //TODO what to do on error?
                        console.error();
                    }
                }
            );
        });
    });

}