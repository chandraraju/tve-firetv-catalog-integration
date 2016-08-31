var serviceRequest = require('../models/serviceRequest.js');
var Promise = require('bluebird');

var tests = {
    runRequest: function(req, res) {
        console.log(req.config);
        new serviceRequest()
            .endpoint(req.config.service.url + req.config.service.api.SHOWS_LIST)
            .querystring('?form=cjson')
            .anonymous().spread(function (response, body){
                console.log(response.statusCode, body);
                res.json(body);
            });
        //res.json(body);
    }
};

var data = [{ // dummy shows object
    type: 'shows',
    entries: 25,
    category: 'series'
},{ // dummy shows object
    type: 'shows',
    entries: 25,
    category: 'drama'
},{ // dummy shows object
    type: 'shows',
    entries: 25,
    category: 'movies'
}];

module.exports = tests;