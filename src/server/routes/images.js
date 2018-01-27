const express = require('express');
const fileUpload = require('express-fileupload');
const { join } = require('path');
const genNonce = require('../nonce');

const img = express.Router();
const imageLoc = join(process.cwd(), 'public', 'images');

img.use(fileUpload());

// middleware used:
// https://www.npmjs.com/package/express-fileupload
img.post('/upload', async (req, res) => {
  if (!req.files) {
    return req.status(400).json({ status: 'error', message: 'No file provided' });
  }
  if (!req.session.authed) {
    return req.status(400).json({ status: 'error', message: "User isn't authed" });
  }
  const { image } = req.files;
  // todo: parse the mimetype
  const { name, mv: move, mimetype } = image;
  const { username } = req.session;
  const filename = `${username}:${genNonce()}:${name}`;
  const newLocation = join(imageLoc, filename);
  try {
    await move(newLocation);
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err });
  }
  return res.json({ status: 'success', path: filename });
});

module.exports = img;
