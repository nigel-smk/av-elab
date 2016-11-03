var Activity = require('../models/activity');
var auth = require('../services/jwtauth');

module.exports.controller = function(app) {

    app.get('/api/activities', [auth], function (req, res) {
        Activity.find({}).exec(function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send("Mongoose error. See logs.");
            } else {
                res.json(result);
            }
        });
    });

    app.post('/api/activity', [auth], function (req, res) {
        var activity = new Activity({
            sid: req.body.sid,
            pid: req.body.pid,
            description: req.body.description
        });
        activity.save(function (err) {
            if (err) {
                console.error(err);
                //res.send("Error: internal database error");
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
}