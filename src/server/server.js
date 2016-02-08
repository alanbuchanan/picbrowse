import express from 'express';
const app = express();

import Search from 'bing.search';
import util from 'util';

const search = new Search(process.env.API_KEY);

search.web('lolcats funny',
	{top: 2},
	(err, results) => {
		console.log(util.inspect(results, {colors: true, depth: null}));
	}
);

// app.get('/', (req, res) => {

// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`got your back on ${port}, time: ${Date.now().toString().slice(5, 9)}`);
});