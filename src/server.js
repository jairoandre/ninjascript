var express = require('express');

initApp();

function initApp() {
  var app = express();

  app.get('/', function(req, res) {
    res.send('Hello World!');
  });

  app.listen(3000, function() {
    console.log('Running app listening on port 3000.');
  });

}
