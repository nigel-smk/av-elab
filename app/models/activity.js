var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
    sid: String,
    pid: String,
    timestamp: {type: Date, default: Date.now()},
    description: String
});;

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;