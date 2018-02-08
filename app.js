// modules and dependencies
const express = require('express'),
	db = require('./lib/db'),
	favicon = require('serve-favicon'),
	path = require('path'),
	logger = require('morgan'),

	// application
	app = express(),
	port = 3000;

// middleware setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // avoiding req.url === favicon.io
app.use(logger('dev'));

// database
db.connect((err) => { // connecting to mlab database
	err ? console.log(err) :
		// listen
		app.listen(port, (err) => { // on db connection, app listen for requests
			err ? console.log(err) :
				console.log(`app listening on port ${port}`);
		});
});

// Routes
app.use(require('./controllers'));

// Exports
module.exports = app;
