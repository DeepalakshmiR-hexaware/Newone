var express = require('express');
var app = express();


  app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })
app.listen(8080, () => console.log("listening.."));
