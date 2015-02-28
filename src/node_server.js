var http = require("http");
var url = require("url");
var bloom = require("./bloomQuery.js");
var fs = require("fs");
var querystring = require("querystring");
	
function onRequest(request, response) {
	
    var pathname = url.parse(request.url).pathname;
    var queryPart = url.parse(request.url).query;
	console.log("Request for "+pathname+" recieved.");
		//console.log(pathname == "/");
	if(pathname == "/BloomData")
	{

	    var name = querystring.parse(queryPart)["name"];
	    console.log("Passed name was: " + name);
	    if (typeof name === "undefined")
	        name = "MSFT";
		response.writeHead(200, {"Content-Type": "application/json"});
		//response.write("Fetching Data Below: \n");
		console.log("Called Search");
		bloom.search(response,name);

	}
	else //if(pathname != "/favicon.ico")
	{
		if(pathname == "/")
			pathname ="/index.html";
		fs.readFile(pathname.slice(1),function(err,data) {
			response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length':data.length});
			response.write(data);
			response.end();
	
		});
		
	} 
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");


