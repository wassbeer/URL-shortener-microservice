// depencies and modules
const express = require('express'),
	router = express.Router(),
	db = require('./../lib/db');

// providing shortened url
router.get('/:shortenedurl', (req, res) => {
	db.getDb().collection('urls').findOne({ // find the shortened url in the database
		shortened_url: `http://localhost:3000${req.url}`
	}, (err, result) => {
		result !== null ?
			(res.writeHead(301, { Location: `${result.original_url}` }), // if found, redirect to the associated original url
				res.end()) :
			res.json({ 'shortened url': 'does not exist' }); // if not found, send "does not exist" message
	});
});

// homepage
router.get('/', (req, res) => {
	res.json ({
		"please provide a new URL at": "/new/<new-url>",
		"or visit a shortened url at": "/<shortened-url>"
	});
})

module.exports = router;
