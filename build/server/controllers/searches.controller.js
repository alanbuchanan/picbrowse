'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bing = require('bing.search');

var _bing2 = _interopRequireDefault(_bing);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _searches = require('../models/searches.model');

var _searches2 = _interopRequireDefault(_searches);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImgSearch = _mongoose2.default.model('lookup', _searches2.default);

var search = new _bing2.default(process.env.API_KEY);


var objectFilterer = function objectFilterer(target, props) {
    return _lodash2.default.map(target, function (e) {
        return _lodash2.default.pick(e, props);
    });
};

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'handleLanding',
        value: function handleLanding(req, res) {
            // Landing page
            res.sendFile('../../views/index.html');
        }
    }, {
        key: 'handleQuery',
        value: function handleQuery(req, res) {
            var offset = 0;

            if (Object.keys(req.query).length !== 0) {

                // Handle offset
                if (req.query.hasOwnProperty('offset')) {
                    offset = req.query.offset;
                }
            }

            var term = req.params.searchterm;

            var postToDb = function postToDb() {
                ImgSearch.create({ term: term, timestamp: (0, _moment2.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss') }, function (err, search) {
                    if (err) {
                        console.log('ERROR:', err);
                    }
                });
            };

            // Use Bing to search for images
            search.images(term, { top: 10, skip: offset }, function (err, results) {
                // console.log(util.inspect(results, {colors: true, depth: null}));
                if (err) {
                    res.send({ error: 'Nothing found for ' + term });
                } else {
                    // Post to db for /api/searches
                    postToDb();

                    // Output results to client
                    res.send(objectFilterer(results, ['url', 'title', 'sourceUrl']));
                }
            });
        }
    }, {
        key: 'getListOfPrevQueries',
        value: function getListOfPrevQueries(req, res) {
            // Handle list of 10 most recent searches
            ImgSearch.find({}).sort({ _id: -1 }).limit(10).exec(function (err, result) {
                if (err) console.log('ERROR:', err);

                // Output results to client
                res.send(objectFilterer(result, ['term', 'timestamp']));
            });
        }
    }]);

    return _class;
}();

exports.default = _class;