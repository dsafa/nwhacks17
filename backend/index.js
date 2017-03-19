var app = require('express')();
var multer = require('multer')();
var pool = require('pg').Pool;
var async = require('async');

var config = {
  user: 'root',
  host: 'localhost',
  database: 'NWHacks17',
  port: 26257
};

var pg = new pool(config)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

  pg.query('SELECT * FROM Hotspot', [], function (err, result) {
    if (err) throw err;

    // just print the result to the console
    result.rows.forEach(function(row) {
      console.log(row);
    });
  });
})

app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  next(); 
});

app.post('/api/location', multer.array(), function (req, res) {
	console.log(req.body);
	res.send("OK");
})