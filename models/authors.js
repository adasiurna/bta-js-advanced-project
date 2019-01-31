const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  category: String,
  city: String,
  bookCount: Number,
  phone: String
});


module.exports = mongoose.model('Author', AuthorSchema);