const express = require("express");
const bodyParser = require("body-parser");
var fs = require('fs');

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
app.post("/api/v1/updateParameters", async function (req, res) {
	console.log(req.body);
	var dataToSend;
	
	await fs.writeFile('input.json',JSON.stringify(req.body), function (err) {
		if (err) throw err;
		console.log('File is created successfully.');
	  }); 
	// spawn new child process to call the python script
	//to pass parameters to script1.py, use [‘script1.py’,’param1’,’param2’, ...] and sys.argv[1] in python script   
	py = spawn('python', ['LinkBudget.py']); //JSON.stringify(req.body)
	// collect data from script
	// in close event we are sure that stream from child process is closed
	py.on('close', (code) => {
	console.log(`child process close all stdio with code ${code}`);
	});
	
	// process python output to JSON object
	let rawdata = await fs.readFileSync('LinkBudgetOut.json');
	let vals = JSON.parse(rawdata);
	var obj = new Object();

	console.log('here')

	obj.linkMarginEM = vals.e_m.margin;
	obj.linkMarginME = vals.m_e.margin;
	obj.effBitRateEM = vals.e_m.bitrate_eff;
	obj.effBitRateME = vals.m_e.bitrate_eff;
	obj.messageTimeEM = vals.e_m.time_elapsed;
	obj.messageTimeME = vals.m_e.time_elapsed;
	obj.distance = vals.e_m.distance;

	console.log('here2')

	var jsonString = JSON.stringify(obj);
	console.log(jsonString)
	
	res.send(JSON.parse(jsonString));
});

app.listen(port);
 
console.log("Server.js listening on port: " + port);