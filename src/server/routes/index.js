const express = require('express');
const login = require('../routes/user');

const api = express.Router();

api.get('/', (req, res) => {
  res.send('Welcome to APIv1');
});

api.use('/login', login);


module.exports = api;
