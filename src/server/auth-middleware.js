/**
 * modules to make authentication work
 */
const session = require('express-session');
const connect = require('connect-redis');
const redis = require('redis');
const genNonce = require('./nonce');
const path = require('path');

/**
 * set up express session with redis
 */
const url = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(url);
const SessionStore = connect(session);
const store = new SessionStore({ client });
const login = path.join(process.cwd(), 'public', 'auth.html');
const secret = genNonce();

// options for each session
const sessionOptions = {
  store, // use a redis store
  secret, // use a random password
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000,
  },
};

/**
 * add some middleware to ensure that a user is authed
 * @param {express.Router} router express router
 */
module.exports = router => {
  // init a session
  router.use(session(sessionOptions));
  // add middleware to check auth
  router.get('*', (req, res, next) => {
    if (req.session.authed) {
      next(); // if we're logged in, procese
    } else {
      res.sendFile(login); // not logged in? don't proceed
    }
  });
};
