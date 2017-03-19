var app = require('express')()
var multer = require('multer')()


app.post('/api/location', multer.array(), function (req, res) {
	console.log(req.body)
	res.send("OK")
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})