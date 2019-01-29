const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  year: Date,
  category: String,
  bestSeller: Boolean
});


module.exports = mongoose.model('Book', BookSchema);