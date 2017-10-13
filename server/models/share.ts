import * as mongoose from 'mongoose';

const shareSchema = mongoose.Schema({
  name: String,
  email: String,
  permission: String
});

const Share = mongoose.model('Share', shareSchema);

export default Share;
