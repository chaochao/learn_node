var request = require('request');
var url ='http://ipinfo.io'

module.exports = function(callback) {

 request({
    url: url,
    json: true
    }, function (error,response,body) {
    if (error) {
      console.log(error);
      console.log("unable to fetch data");
    } else {
      callback(body);
    }
  });

}

