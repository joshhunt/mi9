var express = require('express');

var app = express();

app.route('/')
    .get(function(req, res) {
        res.json({
            'error': 'plz post to this route'
        });
    });

app.listen(process.env.PORT || 3000);