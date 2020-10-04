const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require('child_process');
var app = express();

const port = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

//runs python script on post request 
app.post("/api/v1/updateParameters", function(req, res) {
	console.log(req.body);
	var dataToSend;
	
	// spawn new child process to call the python script
	//to pass parameters to script1.py, use [‘script1.py’,’param1’,’param2’, ...] and sys.argv[1] in python script   
	const python = spawn('python', ['LinkBudget.py', JSON.stringify(req.body)]);
	// collect data from script
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		dataToSend = data.toString();
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
	console.log(`child process close all stdio with code ${code}`);
	
	// process python output to JSON object
	var vals = dataToSend.split(' ');
	var obj = new Object();

	obj.linkMarginEM = vals[0];
	obj.linkMarginME = vals[1];
	obj.effBitRateEM = vals[2];
	obj.effBitRateME = vals[3];
	obj.messageTimeEM = vals[4];
	obj.messageTimeME = vals[5];
	obj.distance = vals[6];
	//obj.dist = vals[3];

	var jsonString = JSON.stringify(obj);
	// send JSON object to browser {'':'',
	res.send(JSON.parse(jsonString));
	});
 
});

app.listen(port);
 
console.log("Server.js listening on port: " + port);