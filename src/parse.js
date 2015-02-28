var parseJSON = function (callback){
	queryServer(function(unparsed){
		var data = unparsed.data;
		
	});
	callback();
}
window.load = parseJSON();