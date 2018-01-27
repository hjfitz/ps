const express = require('express');
const login = require('./user');
const images = require('./images');

const api = express.Router();

api.get('/', (req, res) => {
  res.send('Welcome to APIv1');
});

api.use('/login', login);
api.use('/images', images);


module.exports = api;
