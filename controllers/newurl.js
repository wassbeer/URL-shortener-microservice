// depencies and modules
const uniqid = require('uniqid'),
	express = require('express'),
	router = express.Router(),
	db = require('./../lib/db');

// variables
let originalUrl,
	shortenedUrl;

// providing new url
router.get(`/:htt${'p'||'ps'}://:url*`, (req, res) => { // http or https
	req.params.url.indexOf('.') < 1 ? // checking validity of provided url
		res.json({ 'Error': 'Url is invalid' }) :
		originalUrl = req.url.substring(1),
		shortenedUrl = `http://localhost:3000/${uniqid()}`;
	db.getDb().collection('urls').findOne({ // find the provided url
			original_url: originalUrl
		},
		(err, result) => {
			err ? console.log(err) :
				result !== null ? res.json({ 'original_url': result.original_url, 'shortened_url': result.shortened_url }) : // if found, send the stored shortened url
				(db.getDb().collection('urls').insertOne({ // if not found, insert te new original and shortened url (1/2)
						original_url: originalUrl,
						shortened_url: shortenedUrl
					}),
					res.json({ // and send the shortened url (2/2)
						'original_url': `${originalUrl}`,
						'shortened_url': `${shortenedUrl}`
					})
				);
		});
});

module.exports = router;
