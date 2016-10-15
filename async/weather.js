var request = require('request');

module.exports = function(city,callback) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city
  +'&APPID=5380693afcd9a8800c6c17856c7e92f5&units=metric';
  request({
    url: url,
    json: true
    }, function (error,response,body) {
    if (error) {
      console.log(error);
      console.log("unable to fetch data");
    } else {
      callback({name: body.name, temp: body.main.temp})

    }
  });
  
};