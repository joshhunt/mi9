var _ = require('underscore'),
    utils = require('./utils.js');

module.exports.showIndex = function(req, res) {
    utils.error(res, 'Method not allowed: Plz POST instead', 405);
};

module.exports.filterShows = function(req, res) {
    if (!req.body || !req.body.payload) {
        utils.error(res, 'Could not decode request: Key \'payload\' missing in JSON body', 400);
    }

    var validShows = _.chain(req.body.payload)
        .filter(function(show) {
            return show.drm && show.episodeCount > 0;
        })
        .map(function(show) {
            return {
                image: show.image.showImage,
                slug: show.slug,
                title: show.title
            };
        })
        .value();

    res.json({response: validShows});
};