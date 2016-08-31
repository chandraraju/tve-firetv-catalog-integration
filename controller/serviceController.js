var serviceRequest = require('../models/serviceRequest.js');
var config = require('../config/apiService');

var service = {
    programsRequest: function() {
        var programs = new serviceRequest()
            .apikey(config.service.api_key)
            .endpoint(config.service.url + config.service.api.SHOWS_LIST)
            .anonymous().spread(function (response, body){
                //console.log(response.statusCode, body);
                return response;
            });
        return programs;
    },

    videosRequest: function(program) {
        var videos = new serviceRequest()
            .apikey(config.service.api_key)
            .endpoint(config.service.url + config.service.api.SHOW_VIDEOS_LIST + program.id)
            .anonymous().spread(function (response, body){
                var result = {};
                result.response = response;
                result.program = program;
                return result;
            });
        return videos;
    },

    previewRequest: function(req, res) {
        var previews = require('../mock-data/' + req.brand + '/' + req.platform +  '/preview-clips');
        res.json(previews);
    }
};

module.exports = service;