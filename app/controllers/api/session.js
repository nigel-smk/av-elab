var Session = require('../../models/session');
var auth = require('../../services/jwtauth');

module.exports.controller = function(app) {

    app.post('/api/sessionData', [auth], function (req, res) {
        //console.log('got session data post');
        //console.log(req.body);
        var session = new Session({
            sid: req.body.sid,
            pid: req.body.pid,
            activity: req.body.activity
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

    app.put('/api/sessionData', [auth], function (req, res) {
        Session.findOneAndUpdate(
            {
                sid: req.body.sid,
                pid: req.body.pid
            },
            {
                $push: req.body.activity
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
}