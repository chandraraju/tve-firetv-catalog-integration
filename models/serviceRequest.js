var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

module.exports = function() {
    return {
        _endpoint: "",
        _method: "GET",
        _querystring: "",
        _apikey: "",

        endpoint: function (value) {
            this._endpoint = value;
            return this;
        },

        method: function (value) {
            this._method = value;
            return this;
        },

        querystring: function (value) {
            this._querystring = value;
            return this;
        },

        apikey: function (value){
            this._apikey = value;
            return this;
        },

        anonymous: function() {
            // set default headers on every request
            var requestOptions = {
                method: this._method,
                url: this._endpoint + this._querystring,
                headers: {
                    'api_key':this._apikey,
                    'Content-Type':'application/json'
                }
            };

            console.log(requestOptions.method, requestOptions.url);

            return request.getAsync(requestOptions);
        },
    };
}

//module.exports.id = 'serviceRequest';