const express = require('express');
const router = express.Router();
const Book = require('../models/books');

router.get('/', (req, res) => {
  console.log('Grazinam visas knygas');

  Book.find({}).exec((error, books) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(books);
      res.send(books);
    }
  })
}); // ++




router.get('/bestseller', (req, res) => {
  console.log('Grazinam visus bestselerius');

  Book.find({ bestSeller: true }).exec((error, books) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(books);
      res.send(books);
    }
  })
}); // ++




router.get('/drama', (req, res) => {
  console.log('Grazinam visus bestselerius');

  Book.find({ category: "Drama" }).exec((error, books) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(books);
      res.send(books);
    }
  })
}); // ++




router.get('/:id', (req, res) => {
  Book.findOne({ "_id": req.params.id }).exec((error, book) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(book);
      res.send(book);
    }
  })
});




router.post('/', (req, res) => {
  console.log('sukuriam nauja knyga', req.body);

  const newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.year = req.body.year;
  newBook.category = req.body.category;
  newBook.bestSeller = req.body.bestSeller;

  newBook.save((error, book) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log(book);
      res.status(201).send(book);
    }
  })
});





router.put('/:id', (req, res) => res.send('Atnaujinam pasirinkita knyga pagal ID')); // ++
router.delete('/:id', (req, res) => res.send('Istrinam viena knyga pagal ID')); // ++


module.exports = router; // eksportuojam kad butu pasiekiama kituose failuose