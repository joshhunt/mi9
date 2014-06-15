var express = require('express'),
    bodyParser = require('body-parser');

var controllers = require('./controllers'),
    utils = require('./utils.js');

var app = express();

app.use(function (req, res, next){
    console.log('oh fuck it');
    console.log(req.method, req.originalUrl);
    req.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    next();
});

app.use(bodyParser.json());
app.use(utils.catchJsonErrors);

app.listen(process.env.PORT || 3000);
module.exports = app;

app.route('/')
    .get(controllers.showIndex)
    .post(controllers.filterShows);