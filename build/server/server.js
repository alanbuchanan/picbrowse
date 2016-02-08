'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _keys = require('./config/keys.config');

var _keys2 = _interopRequireDefault(_keys);

var _searches = require('./controllers/searches.controller');

var _searches2 = _interopRequireDefault(_searches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var SearchesMethods = new _searches2.default();

var mongoURI = 'mongodb://127.0.0.1:27017/image-search';
_mongoose2.default.connect(_keys2.default.MONGOLAB_URI || mongoURI, function (err) {
    if (err) console.log(err);
});

app.get('/', SearchesMethods.handleLanding);
app.get('/api/imagesearch/:searchterm', SearchesMethods.handleQuery);
app.get('/api/searches', SearchesMethods.getListOfPrevQueries);

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('got your back on ' + port + ', time: ' + Date.now().toString().slice(5, 9));
});