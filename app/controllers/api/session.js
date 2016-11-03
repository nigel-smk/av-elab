var Session = require('../../models/session');
var auth = require('../../services/jwtauth');

module.exports.controller = function(app) {

    // app.get('/api/sessionData/activities', [auth], function (req, res) {
    //     Session.find({}, function(err, sessions) {
    //         //TODO need a better schema. shouldn't be doing this work every time I query
    //         var activities = [];
    //         sessions.forEach(function(session) {
    //            session.activity.forEach(function(activity) {
    //                activities.push({
    //                    sid: session.sid,
    //                    pid: session.pid,
    //                    timestamp: activity.timestamp,
    //                    type: activity.type,
    //                    description: activity.description
    //                });
    //            });
    //         });
    //         res.json(activities);
    //     });
    // });

    app.post('/api/sessionData', [auth], function (req, res) {
        //console.log('got session data post');
        //console.log(req.body);
        var session = new Session({
            sid: req.body.sid,
            pid: req.body.pid
        });
        session.save(function (err) {
            if (err) {
                console.log(err);
                //TODO need better failure status
                res.sendStatus(418);
            } else {
                res.sendStatus(200);
            }
        });
    });

    // app.put('/api/sessionData', [auth], function (req, res) {
    //     Session.findOneAndUpdate(
    //         {
    //             sid: req.body.sid,
    //             pid: req.body.pid
    //         },
    //         {
    //             $push: req.body.activity
    //         },
    //         null,
    //         function (err, result) {
    //             if (err) {
    //                 //TODO what to do on error?
    //                 console.error();
    //                 res.sendStatus(500);
    //             }
    //             res.sendStatus(200);
    //         }
    //     );
    // });
}