const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const notFoundErrCode = 404;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6362793dd21176fa41c7b903',
  };

  next();
});

app.use('/users', require('./routes/user'));

app.use('/cards', require('./routes/card'));

app.all('/*', (req, res) => {
  res.status(notFoundErrCode).send({ message: 'Неверный адрес' });
});

app.listen(PORT, () => {
});
