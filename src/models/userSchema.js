const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversationSchema = require('./conversationSchema');

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  photo: String,
  status: String,
  conversations: [conversationSchema]
});
userSchema.add({ contacts: [userSchema] });

mongoose.model('users', userSchema);
