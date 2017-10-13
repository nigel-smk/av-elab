import * as mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  study: String,
  subject: String
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
