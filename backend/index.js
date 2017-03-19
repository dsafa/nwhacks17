var app = require('express')();
var multer = require('multer')();
var pool = require('pg').Pool;
var bodyParser = require("body-parser");

var config = {
  user: 'root',
  host: '54.186.70.223',
  database: 'NWHacks17',
  port: 26257
};

var pg = new pool(config)

var crimeArr = [["SexOffences", 6.5], ["Assaults", 8.0], ["Robbery", 10.0], ["BreakingAndEntering", 2.0], ["TheftOfMotorVehicle", 4.5], ["TheftFromAuto", 4.5], ["Theft5K", 3.0], ["Arson", 2.5], ["Mischief", 1.0], ["OffensiveWeapons", 7.5]];  
var crimeStats = {};
pg.query("SELECT * FROM CrimeStatistics;",
    [], function (err, result) {
      if (err) throw err;
      result.rows.forEach(function(row) {
        crimeStats[row["Neighbourhood"]] = row;
      })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended : true}));

app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  next(); 
});

var calcCrimeScore = function(hotspot) {
  var neigh = hotspot["Neighbourhood"]
  var score = 0;
  var res = crimeStats[neigh];
  for (i = 0; i < crimeArr.length; i++) {
    score += parseInt(res[crimeArr[i][0]]) * crimeArr[i][1]
  }
    
  return score;
}

app.post('/api/location', function (req, res, next) {
  console.log(req.body);

  var src = req.body["location1"].split(",");
  var dest = req.body["location2"].split(",");

  var lat = (parseFloat(src[0]) + parseFloat(dest[0])) / 2;
  var lng = (parseFloat(src[1]) + parseFloat(dest[1])) / 2;

  pg.query("SELECT * FROM Hotspot H WHERE SQRT(POW($1 - H.Lat, 2) + POW($2 - H.Long, 2)) < $3;", 
    [lat, lng, parseFloat(req.body["radius"])/111], function (err, result) {
    if (err) throw err;

    // just print the result to the console
    vals = {"locations" : []};
    result.rows.forEach(function(row) {
      row["score"] = calcCrimeScore(row);
      console.log(row["score"] + "\n");
      vals["locations"].push(row);
    });

    vals["locations"].sort(function(a, b) {
      return a["score"] - b["score"];
    });
    vals["locations"] = vals["locations"].slice(0, 3);

    res.status(200).json(vals)
  });
});
