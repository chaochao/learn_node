var express = require('express');
var app = express();
const PORT = 3000
var middleware = {
  requireAuthentication: function (req, res, next) {
    console.log('private route hit!');
    next();
  },
  logger: function (req, res, next) {
    var date = new Date().toString();
    console.log('Request: '+ date + req.method + req.originalUrl);
    next();
  }
}
// app.get('/', function(req, res) {
//   res.send('hello Express!');
// });

// function everytime it hits and so far it's print console
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(req, res) {
  res.send('about me!');
});

app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
app.listen(PORT, function  () {
  console.log("Express started! at port: "+ PORT)
});