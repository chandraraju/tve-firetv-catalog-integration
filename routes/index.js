var express = require('express');
var router = express.Router();

var externalservices = require('../controller/serviceController.js');


/*
 * Router middleware options
 */

/*
 * Router param values

router.param('version',function(req, res, next, val){
    req.version = val;
    next();
});
router.param('brand',function(req, res, next, val){
    req.brand = val;
    next();
});
router.param('platform',function(req, res, next, val){
    req.platform = val;
    next();
});
router.param('device_type',function(req, res, next, val){
    req.deviceType = val;
    next();
});
 */


module.exports = router;
