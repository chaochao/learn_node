var request = require('request');
var url ='http://ipinfo.io'

module.exports = function() {
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      json: true
      }, function (error,response,body) {
      if (error) {
        console.log("unable to fetch data");
        reject(error);
      } else {
        resolve(body.city);
      }
    });
  });
}

