import express from 'express';
const app = express();
import mongoose from 'mongoose';
import keys from './config/keys.config';
import SearchesController from './controllers/searches.controller';
const SearchesMethods = new SearchesController();

const mongoURI = 'mongodb://127.0.0.1:27017/image-search';
mongoose.connect(keys.MONGOLAB_URI || mongoURI, err => {if (err) console.log(err)});

app.get('/', SearchesMethods.handleLanding);
app.get('/api/imagesearch/:searchterm', SearchesMethods.handleQuery);
app.get('/api/searches', SearchesMethods.getListOfPrevQueries);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`got your back on ${port}, time: ${Date.now().toString().slice(5, 9)}`);
});