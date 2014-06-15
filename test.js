var should = require('should'),
    assert = require('assert'),
    request = require('supertest');

var validRequest = require('./tests/sampleRequest.json'),
    validResponse = require('./tests/sampleResponse.json');

var app = require('./app');

///
// End-to-end tests
///
describe('GET /', function() {
    it('responds with 405 error', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(405, done);
    });
});

describe('POST /', function() {
    it('returns only valid shows', function(done) {
        request(app)
            .post('/')
            .send(validRequest)
            .expect(200)
            .end(function(err, res) {
                res.body.should.eql(validResponse);
                done();
            });
    });

    it('returns status code 400 when sent imporperly formatted body', function(done) {
        request(app)
            .post('/')
            // Unfortuantly, we can't send improperlly formatted JSON
            // with superagent/supertest. Needs more investigation...
            // .set('Content-Type', 'application/json')
            .send('invalidRequest')
            .expect(400)
            .end(function(err, res) {
                done();
            });
    });

    it('returns specified error message when sent imporperly formatted body', function(done) {
        request(app)
            .post('/')
            .send('invalidRequest')
            .end(function(err, res) {
                res.body.should.keys('error');
                res.body.error.should.containEql('Could not decode request');
                done();
            });
    });

    it('returns specified error message when sent wrong JSON object', function(done) {
        request(app)
            .post('/')
            .send({'hello': 'world'})
            .end(function(err, res) {
                res.body.should.keys('error');
                res.body.error.should.containEql('Could not decode request');
                res.body.error.should.containEql('\'payload\' missing');
                done();
            });
    });
});