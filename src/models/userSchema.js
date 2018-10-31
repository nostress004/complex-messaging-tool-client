const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  photo: String
});

mongoose.model('users', userSchema);
