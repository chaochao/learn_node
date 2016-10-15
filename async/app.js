// example

var weather = require('./weather')
var location = require('./location')
//input location from terminal with option: -l location
var argv = require('yargs')
    .option('location', {
      alias: 'l',
      demand: false,
      describe: 'location',
      type: 'string'
    })
    .help('help')
    .argv;
if(typeof argv.location === 'string' && argv.location.length>0) {
   var location = encodeURIComponent(argv.location.trim())
   console.log('with location info');
   var city = argv.location;
   weather(city).then(function (weatherInfo){
     console.log(weatherInfo.name +' '+weatherInfo.temp);
  }).catch(function (error ){
    console.log('error: '+ error);
  });
} else {
console.log('no location info');
location().then(function (city) {
  return weather(city)
}).then(function (weatherInfo) {
  console.log(weatherInfo.name +' '+weatherInfo.temp);
})
}