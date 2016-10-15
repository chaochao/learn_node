// example

var weather = require('./weather')
var location = require('./location')
//set up -l location 
var argv = require('yargs')
    .option('location', {
      alias: 'l',
      demand: false,
      describe: 'location',
      type: 'string'
    })
    .help('help')
    .argv;
//validation
if(typeof argv.location === 'string' && argv.location.length>0) {
   var location = encodeURIComponent(argv.location.trim())
   console.log('with location info');
   var city = argv.location;
   weather(city).then(function (weatherInfo){
    //print the weather
    console.log(weatherInfo.name +' '+weatherInfo.temp);
  });
   // get wether from this place
} else {
// get the location from the location
console.log('no location info');
location().then(function (city) {
  console.log("your location: "+ city);
  weather(city).then(function (weatherInfo){
    //print the weather
    console.log(weatherInfo.name +' '+weatherInfo.temp);
  });
});
}