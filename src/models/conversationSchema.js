const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = require('./messageSchema');
const userSchema = require('./userSchema');

const conversationSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: 'users' },
  messages: [messageSchema]
});

mongoose.model('conversations', conversationSchema);
