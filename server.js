const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const moment = require('moment');
moment.locale('lt');

const app = express();
const port = process.env.PORT || 3000; // process.env.PORT vietoje atsiras heroku portas

const databaseUser = 'bta-studentas';
const databasePassword = 'studentas123';
const databaseName = 'ados-javascript-db';
const databasePort = 59682;

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
})
);

// cors config
app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 3000')
})

// database config
mongoose.connect(
  `mongodb://${databaseUser}:${databasePassword}@ds059682.mlab.com:${databasePort}/${databaseName}`,
  { useNewUrlParser: true }
);

app.get('/', (req, res) => res.send('Knygynas')); // ++
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);



app.listen(port, () => console.log(`BTA API application listening on port ${port}!`))