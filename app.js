const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression')();
const logger = require('morgan')('dev');
const helmet = require('helmet')();

/**
 * app vars
 */
const app = express();
const pub = path.join(__dirname, 'public');
const index = path.join(pub, 'index.html');

/**
 * express middleware
 */
app.use('/public', express.static(pub));
app.use(compression);
app.use(logger);
app.use(helmet);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));


/**
 * middleware for service worker
 * Needed to use /worker to enable the worker to use the
 * entire project dir for cache (if necessary)
 */
app.get('/worker.js', (req, res) => res.sendFile(path.join(pub, 'javascripts', 'worker.js')));

/**
 * This middle must be the last one set up
 * used for react - enables client-side routing
 */
app.get('*', (req, res) => res.sendFile(index));

// export for bin/www
module.exports = app;