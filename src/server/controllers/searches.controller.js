import mongoose from 'mongoose';
import Search from 'bing.search';
import util from 'util';
import ImgSearchSchema from '../models/searches.model';
const ImgSearch = mongoose.model('lookup', ImgSearchSchema);
import moment from 'moment';
const search = new Search(process.env.API_KEY);
import _ from 'lodash';

var objectFilterer = (target, props) => _.map(target, e => _.pick(e, props));

export default class {
    handleLanding (req, res) {
        // Landing page
        res.sendFile('../../views/index.html')
    }

    handleQuery (req, res) {
        let offset = 0;

        if (Object.keys(req.query).length !== 0) {

            // Handle offset
            if(req.query.hasOwnProperty('offset')){
                offset = req.query.offset;
            }
        }

        const term = req.params.searchterm;

        const postToDb = () => {
            ImgSearch.create({term: term, timestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}, (err, search) => {
                if (err) { console.log('ERROR:', err) }
            });
        };

        // Use Bing to search for images
        search.images(term, {top: 10, skip: offset}, (err, results) => {
            // console.log(util.inspect(results, {colors: true, depth: null}));
            if (err) {
                res.send({error: 'Nothing found for ' + term})
            } else {
                // Post to db for /api/searches
                postToDb();

                // Output results to client
                res.send(objectFilterer(results, ['url', 'title', 'sourceUrl']));
            }
        });
    }

    getListOfPrevQueries (req, res) {
        // Handle list of 10 most recent searches
        ImgSearch.find({}).sort({_id:-1}).limit(10).exec((err, result) => {
            if (err) console.log('ERROR:', err);

            // Output results to client
            res.send(objectFilterer(result, ['term', 'timestamp']));
        });
    }
}