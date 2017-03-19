var app = require('express')()
var multer = require('multer')()
var pg = require('pg')
var async = require('async')

var config = {
  user: 'test',
  host: 'localhost',
  database: 'test',
  port: 26257
};

pg.connect(config, function (err, client, done) {
  // Closes communication with the database and exits.
  var finish = function () {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }
  // async.waterfall([
  //   function (next) {
  //     // Create the "accounts" table.
  //     client.query("CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);", next);
  //   },
  //   function (next) {
  //     // Insert two rows into the "accounts" table.
  //     client.query("INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250);", next);
  //   },
  //   function (results, next) {
  //     // Print out the balances.
  //     client.query('SELECT id, balance FROM accounts;', next);
  //   },
  // ],
  // function (err, results) {
  //   if (err) {
  //     console.error('error inserting into and selecting from accounts', err);
  //     finish();
  //   }

  //   console.log('Initial balances:');
  //   results.rows.forEach(function (row) {
  //     console.log(row);
  //   });

  //   finish();
  // });
});



app.post('/api/location', multer.array(), function (req, res) {
	console.log(req.body)
	res.send("OK")
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})