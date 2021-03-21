const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/olxdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', router);
// обработчики ошибок
app.use((err, req, res, next) => {
  throw err;
  res
    .status(500)
    .send({ message: 'На сервере произошла ошибка'});
  return next();
})
app.listen(3000);