var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    sid: String,
    pid: Number
});

var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;