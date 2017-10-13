import * as mongoose from 'mongoose';

const studySchema = mongoose.Schema({
  study: String,
  token: String,
  youtubeId: String,
  instructions: String,
  redirect: String,
  dateTime: {type: Date, default: Date.now()}
});

const Study = mongoose.model('Study', studySchema);

export default Study;
