const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  date: String,
  content: String,
  type: ['TEXT', 'EMOJI', 'PICTURE']
});

mongoose.model('messages', messageSchema);
