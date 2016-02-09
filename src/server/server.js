require('dotenv').config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import SearchesController from './controllers/searches.controller';
const SearchesMethods = new SearchesController();
import path from 'path';

let mongoURI = process.env.DEV_URI;
if (process.env.NODE_ENV === 'production') mongoURI = process.env.MONGOLAB_URI;

mongoose.connect(mongoURI, err => {if (err) console.log(err)});

// Serve static landing page
app.use(express.static(path.join(__dirname, '../../views')));

app.get('/', SearchesMethods.handleLanding);
app.get('/api/imagesearch/:searchterm', SearchesMethods.handleQuery);
app.get('/api/searches', SearchesMethods.getListOfPrevQueries);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`got your back on ${port}, time: ${Date.now().toString().slice(5, 9)}`);
});