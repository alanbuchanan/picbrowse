'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bing = require('bing.search');

var _bing2 = _interopRequireDefault(_bing);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var search = new _bing2.default(_config2.default);

search.web('lolcats funny', { top: 2 }, function (err, results) {
	console.log(_util2.default.inspect(results, { colors: true, depth: null }));
});

// app.get('/', (req, res) => {

// });

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('got your back on ' + port + ', time: ' + Date.now().toString().slice(5, 9));
});