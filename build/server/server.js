'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bing = require('bing.search');

var _bing2 = _interopRequireDefault(_bing);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _keys = require('./config/keys.config');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


var search = new _bing2.default(_keys2.default.API_KEY);

search.images('lolcats funny', { top: 2 }, function (err, results) {
	console.log(_util2.default.inspect(results, { colors: true, depth: null }));
});

var mongoURI = 'mongodb://127.0.0.1:27017/image-search';
_mongoose2.default.connect(_keys2.default.MONGOLAB_URI || mongoURI, function (err) {
	if (err) console.log(err);
});

app.get('/', function (req, res) {
	// Landing page
	res.send('hello');
});

app.get('/api/imagesearch/:searchterm', function (req, res) {
	if (req.query) {
		// handle offset
		console.log(req.query);
	}
	res.send('hello');
});

app.get('/api/searches', function (req, res) {
	// Handle list of latest searches
	// Searches.find().limit(10);
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('got your back on ' + port + ', time: ' + Date.now().toString().slice(5, 9));
});