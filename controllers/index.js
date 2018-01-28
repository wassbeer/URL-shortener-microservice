const express = require('express'),
	router = express.Router();

// Routes
router.use('/new', require('./newurl.js'));
router.use('/', require('./redirect.js'));

module.exports = router;
