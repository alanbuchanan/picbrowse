'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _searches = require('./controllers/searches.controller');

var _searches2 = _interopRequireDefault(_searches);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

var SearchesMethods = new _searches2.default();


var mongoURI = process.env.DEV_URI;
if (process.env.NODE_ENV === 'production') mongoURI = process.env.MONGOLAB_URI;

_mongoose2.default.connect(mongoURI, function (err) {
    if (err) console.log(err);
});

// Serve static landing page
app.use(_express2.default.static(_path2.default.join(__dirname, '../../views')));

app.get('/', SearchesMethods.handleLanding);
app.get('/api/imagesearch/:searchterm', SearchesMethods.handleQuery);
app.get('/api/searches', SearchesMethods.getListOfPrevQueries);

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('got your back on ' + port + ', time: ' + Date.now().toString().slice(5, 9));
});