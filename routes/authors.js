const express = require('express');
const router = express.Router();
const Author = require('../models/authors');

router.get('/', (req, res) => {
  console.log('Grazinam visus autorius');

  Author.find({}).exec((error, authors) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(authors);
      res.send(authors);
    }
  })
})  // ++ 

router.get('/:id', (req, res) => res.send('Grazinam autoriu pagal ID')); // ++

router.post('/', (req, res) => {
  console.log('sukuriam nauja autoriu', req.body);

  const newAuthor = new Author();

  newAuthor.name = req.body.name;
  newAuthor.category = req.body.category;
  newAuthor.city = req.body.city;
  newAuthor.bookCount = req.body.bookCount;
  newAuthor.phone = req.body.phone;

  newAuthor.save((error, author) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log(author);
      res.status(201).send(author);
    }
  })
}); // ++

router.put('/:id', (req, res) => {
  console.log('Atnaujiname pasirinkta autoriu pagal ID');

  Author.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: mapToAuthor(req.body),
    },
    { new: true },
    (error, author) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(author);
        res.status(200).send(author);
      }
    }
  )

});



router.delete('/:id', (req, res) => res.send('Istriname viena autoriu pagal ID'));



const mapToAuthor = (author) => {
  let newAuthor = {};

  const name = book.name ? book.name : null;
  const category = book.category ? book.category : null;
  const city = book.city ? book.city : null;
  const bookCount = book.bookCount ? book.bookCount : null;
  const phone = book.phone ? book.phone : null;

  if (name) {
    newBook = Object.assign(newBook, { name: name });
  }

  if (category) {
    newBook = Object.assign(newBook, { category: category });
  }

  if (city) {
    newBook = Object.assign(newBook, { city: city });
  }

  if (bookCount) {
    newBook = Object.assign(newBook, { bookCount: bookCount });
  }

  if (phone) {
    newBook = Object.assign(newBook, { phone: phone });
  }

  return newBook;
};

module.exports = router;