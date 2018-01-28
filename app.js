// modules and dependencies
const express = require('express'),
	db = require('./db'),
	favicon = require('serve-favicon'),
	path = require('path'),

	// application
	app = express(),
	port = 3000;

// avoiding req.url === favicon.io
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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

module.exports = app;
