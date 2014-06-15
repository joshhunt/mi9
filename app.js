var express = require('express'),
    colors = require('colors'),
    bodyParser = require('body-parser');

var controllers = require('./controllers'),
    utils = require('./utils.js');

var app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(utils.catchJsonErrors);

app.listen(port);
module.exports = app;

console.log('Started server on'.green, ('http://localhost:' + port).blue);
console.log('Post JSON data to'.cyan, ('http://localhost:' + port + '/').blue, 'to test'.cyan);
console.log('Or run'.cyan, 'npm test'.blue, 'to run unit tests locally'.cyan);

app.route('/')
    .get(controllers.showIndex)
    .post(controllers.filterShows);