var config = require('../config/apiService');

/*
 * This loads the configuration to the request
 */
module.exports = function(req, res, next) {

    console.log("loading configurations on to " + req.url);

    req.config = config;

    next();
};
