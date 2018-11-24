const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversationSchema = require('./conversationSchema');

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  photo: String,
  status: String,
  userClientID: String,
  messageClientID: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'conversations' }],
  contacts: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

mongoose.model('users', userSchema);
