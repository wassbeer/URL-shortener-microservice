const MongoClient = require('mongodb').MongoClient,
	MONGO_URL = process.env.MONGO_URL || `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds117158.mlab.com:17158/urlshortenermicroservice`;
let _db;

const connect = async(callback) => {
		try {
			MongoClient.connect(MONGO_URL, (err, db) => {
				_db = db
				console.log('connected to db')
				return callback(err);
			});
		} catch (e) {
			throw e;
		}
	},
	getDb = () => _db,
	disconnectDb = () => _db.close();

module.exports = { connect, getDb, disconnectDb };
