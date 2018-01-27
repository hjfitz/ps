// pull in express, create a router
const express = require('express');
const SHA256 = require('crypto-js/sha256');
const CryptoJS = require('crypto-js');
const { createUser, checkAuth } = require('../auth/user');

const salt = process.env.SALT;

const router = express.Router();
const _hash = word => SHA256(word).toString(CryptoJS.enc.Base64);
const hashAndSalt = word => _hash(_hash(word) + salt);

router.post('/create', async (req, res) => {
  const { user, pass, passConf } = req.body;
  const round2Pass = hashAndSalt(pass);
  const round2Conf = hashAndSalt(passConf);
  if (round2Pass === round2Conf) {
    const resp = await createUser(user, round2Pass);
    if (resp) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'error', message: 'user already exists' });
    }
  } else {
    res.json({ status: 'error', message: 'passwords do not match' });
  }
});

// attempt to login
router.post('/info', async (req, res) => {
  const { user, pass } = req.body;
  const round2 = hashAndSalt(pass);
  const { loggedin, reason } = await checkAuth(user, round2);
  if (loggedin) {
    req.session.authed = true;
    req.session.username = user;
    res.json({ loggedin, status: 'logged in' });
  } else {
    res.json({ loggedin, reason });
  }
});

module.exports = router;
