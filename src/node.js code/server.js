var http = require("http");
var url = require("url");
var bloom = require("./bloomQuery.js");
	
function onRequest(request, response) {
	
	var pathname = url.parse(request.url).pathname;
		console.log("Request for "+pathname+" recieved.");
		//console.log(pathname == "/");
	if(pathname == "/")
	{
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Fetching Data Below: \n");
		console.log("Called Search");
		bloom.search(response);
		
	}
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");


