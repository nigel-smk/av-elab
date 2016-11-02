var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    timestamp: {type: Date, default: Date.now()},
    type: String,
    description: String
});

var sessionSchema = mongoose.Schema({
    sid: String,
    pid: Number,
    activity: [eventSchema]
});

var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;