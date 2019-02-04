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
      res.send(authors.map(author => mapToAuthor(author)));
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
        res.status(200).send(mapToAuthor(author));
      }
    }
  )

});



router.delete('/:id', (req, res) => {
  console.log('Istriname viena autoriu pagal ID');
  Author.findByIdAndRemove(
    { _id: req.params.id },
    (error, success) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(success);
        res.status(200).send(success);
      }
    }
  )
});



const mapToAuthor = (author) => {
  return {
    vardasPavarde: author.name,
    kategorija: author.category,
    kiekKnyguIsleista: author.bookCount
  }
};

module.exports = router;