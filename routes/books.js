const express = require('express');
const router = express.Router();
const moment = require('moment');
const Book = require('../models/books');

moment.locale('lt');

router.get('/', (req, res) => {
  console.log('Grazinam visas knygas');

  Book.find({}).exec((error, books) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(books);
      res.send(books.map(book => mapToBook(book)));
    }
  })
}); // ++


router.get('/bestseller', (req, res) => {
  console.log('Grazinam visus bestselerius, ar veikia nodemonas?');
  console.log('neveikia nodemonas');

  Book.find({ bestSeller: true }).exec((error, books) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(books);
      res.send(books.map(book => mapToBook(book)));
    }
  })
}); // ++


router.get('/:id', (req, res) => {
  Book.findOne({ "_id": req.params.id }).exec((error, book) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(book);
      res.send(mapToBook(book));
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


router.put('/:id', (req, res) => {
  console.log('Atnaujinam pasirinkta knyga pagal ID');
  Book.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: Object.assign(req.body),
    },
    { new: true },
    (error, book) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(book);
        res.status(200).send(book);
      }
    }
  )
}); // ++


router.delete('/:id', (req, res) => {
  console.log('Istrinam viena knyga pagal ID');
  Book.findByIdAndRemove(
    { _id: req.params.id, },
    (error, success) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(success);
        res.status(200).send(success);
      }
    }
  )
}); // ++


const mapToBook = book => {
  return {
    pavadinimas: `${book.author}. ${book.title}`,
    suformuotaData: moment(book.year).format('MMMM Do YYYY, h:mm:ss a'),
    kategorija: book.category
  }
}

// const mapToBook = (book) => {
//   let newBook = {};

//   const title = book.title ? book.title : null;
//   const author = book.author ? book.author : null;
//   const year = book.year ? book.year : null;
//   const category = book.category ? book.category : null;
//   const bestSeller = book.bestSeller ? book.bestSeller : null;

//   if (title) {
//     newBook = Object.assign(newBook, { title: title });
//   }

//   if (author) {
//     newBook = Object.assign(newBook, { author: author });
//   }

//   if (year) {
//     newBook = Object.assign(newBook, { year: year });
//   }

//   if (category) {
//     newBook = Object.assign(newBook, { category: category });
//   }

//   if (bestSeller) {
//     newBook = Object.assign(newBook, { bestSeller: bestSeller });
//   }

//   return newBook;
// };

module.exports = router; // eksportuojam kad butu pasiekiama kituose failuose