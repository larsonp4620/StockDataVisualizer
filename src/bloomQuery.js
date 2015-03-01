var https = require('https');
var fs = require('fs');

var search = function(response,name) {
	var host = process.argv[2] || "http-api.openbloomberg.com";
	var port = 443
	var data = "";
	var options = {
		host: host,
		port: port,
		path: '/request?ns=blp&service=refdata&type=HistoricalDataRequest',
		method: 'POST',
		key: fs.readFileSync('Certificates/hackillinois_spring_2015_038.key'),
		cert: fs.readFileSync('Certificates/hackillinois_spring_2015_038.crt'),
		ca: fs.readFileSync('Certificates/bloomberg.crt')
	};

	var req = https.request(options, function(res) {
		//console.log("statusCode: ", res.statusCode);
		//console.log("headers: ", res.headers);

		res.on('data', function(d) {
		  console.log("Gathering Data. ");
		  //if(!response.finished){
			data +=d;
			//response.end();
		  //}
		});
		
		res.on('end', function() {
			response.write(data);
			response.end();
			console.log("finished fetching")
		});
	});
	var securitiesString = name + " US Equity";
	console.log("Querying for: " +securitiesString);
	req.write(JSON.stringify( {
		"securities": [securitiesString],
		"fields": ["PX_LAST", "OPEN"],
		"startDate": "20120101",
		"endDate": "20140501",
		"periodicitySelection": "WEEKLY"
	}));
	req.end();

	req.on('error', function(e) {
		console.log("Error Response Generated");
		response.write(e);
		response.end();
	});

}
exports.search = search;