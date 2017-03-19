var app = require('express')();
var request = require('request');
var pool = require('pg').Pool;
var bodyParser = require("body-parser");
var async = require("async");
var util = require("util");

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

    // Get score
    vals = {"locations" : []};

    var calls = [];
    result.rows.forEach(function(row) {
      calls.push(function(next) {
        row["score"] = calcCrimeScore(row);

        request(util.format("https://maps.googleapis.com/maps/api/directions/json?origin=%s,%s&destination=%s,%s&mode=@mode&key=AIzaSyA2xBMlDvfU5ffBfgnQL4GzXTI3LLQT-P0"
          ,src[0], src[1], row["Lat"], row["Long"]), function (error, response, body) {
            var json = JSON.parse(body);
            row["duration"] = json["routes"][0]["legs"][0]["duration"]["value"];
            console.log(json["routes"][0]["legs"][0]["duration"]);
            vals["locations"].push(row);
            next();
        }); 
      });
    });



    async.parallel(calls, function(err, result) {
      if (err) {
        res.status(500).json({"message":"error"});
        return;
      }

      vals["locations"].sort(function(a, b) {
        return a["score"] - b["score"];
      });
      vals["locations"] = vals["locations"].slice(0, 3);

      if (vals["locations"].length == 0) {
        res.status(500).json({"message":"No recommended locations"});
      } else {
        res.status(200).json(vals)
      }
    });
  });
});
