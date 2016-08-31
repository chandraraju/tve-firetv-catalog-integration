var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

module.exports = function() {
    return {
        _endpoint: "",
        _method: "GET",

        endpoint: function (value) {
            this._endpoint = value;
            return this;
        },

        method: function (value) {
            this._method = value;
            return this;
        },

        anonymous: function() {
            // set default headers on every request
            // this.set("headers", _.extend({ 'mcd_apikey': this.get('config').service.middleware.key }, this.get("defaultHeaders"), this.get("headers")));

            var requestOptions = {
                method: this._method,
                url: this._endpoint
            };

            console.log(requestOptions.method);


            return request.getAsync(requestOptions);
        },
    };
}

//module.exports.id = 'serviceRequest';