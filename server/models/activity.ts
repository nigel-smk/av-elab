import * as mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
  study: String,
  subject: String,
  timestamp: {type: Date, default: Date.now()},
  description: String
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
