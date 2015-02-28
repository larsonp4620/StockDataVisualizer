var names = [];
var points = [];

var parseJSON = function(name){
	queryServer(name, function(unparsed){
		var upd = unparsed.data[0].securityData;
		names.push(upd.security);	
		points.push(upd.fieldData);
		alert(upd.security);
	});
}