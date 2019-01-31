const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const moment = require('moment');
moment.locale('lt');

const app = express();
const port = 3000;

const databaseUser = 'bta-studentas';
const databasePassword = 'studentas123';
const databaseName = 'ados-javascript-db';
const databasePort = 59682;

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
})
);

// database config
mongoose.connect(
  `mongodb://${databaseUser}:${databasePassword}@ds059682.mlab.com:${databasePort}/${databaseName}`,
  { useNewUrlParser: true }
);

app.get('/', (req, res) => res.send('Knygynas')); // ++
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);



app.listen(port, () => console.log(`BTA API application listening on port ${port}!`))