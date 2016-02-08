import express from 'express';
const app = express();
import mongoose from 'mongoose';
import Search from 'bing.search';
import util from 'util';
import keys from './config/keys.config';

const search = new Search(keys.API_KEY);

search.images('lolcats funny',
	{top: 2},
	(err, results) => {
		console.log(util.inspect(results, {colors: true, depth: null}));
	}
);

const mongoURI = 'mongodb://127.0.0.1:27017/image-search';
mongoose.connect(keys.MONGOLAB_URI || mongoURI, err => {if (err) console.log(err)});

app.get('/', (req, res) => {
	// Landing page
	res.send('hello')
});

app.get('/api/imagesearch/:searchterm', (req, res) => {
	if (req.query) {
		// handle offset
		console.log(req.query)
	}
	res.send('hello');
});

app.get('/api/searches', (req, res) => {
	// Handle list of latest searches
	// Searches.find().limit(10);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`got your back on ${port}, time: ${Date.now().toString().slice(5, 9)}`);
});