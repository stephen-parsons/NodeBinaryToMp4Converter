var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//API CALL THAT TAKES BYTEARRAY IN REQ.BODY AND SAVES IT TO HARD DISK AS MP4 FILE
app.post('/convert', function(req, res) {
	console.log("POST DATA", req.body);

	//FILE SAVING
	//Creat buffer for writeFile to read
	let data = req.body.bytearray
	let myBuffer = new Buffer(data.length);
		for (var i = 0; i < data.length; i++) {
		  myBuffer[i] = data[i];
		}
	//Write file
	fs.writeFile(path.join(__dirname, './user_uploads/', req.body.filename), myBuffer, (err) => {
	 	if (err) throw err;
		console.log('It\'s saved!');
		return res.json("Success!")
	});
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});