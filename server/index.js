const express = require('express');
const mongoose = require('mongoose');
const ProductStyles = require('./models/stylesModel');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://mongo:27017/sdc-project', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

app.get('/products/:product_id/styles', (req, res) => {
  const { params } = req;
  console.log(params)

  ProductStyles.find(params)
    .then(result => {
      console.log(result)
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});