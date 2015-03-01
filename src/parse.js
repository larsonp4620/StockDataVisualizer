var names = [];
var startTime;
var fieldDataLengths = [];
var averagePrices = [];

var parseJSON = function(name){
	queryServer(name, function(unparsed){
		var upd = unparsed.data[0].securityData;
		var fieldDataLength = upd.fieldData.length;
		
		var updFix = upd.fieldData[0];
		var thisStartTime = updFix.date;
		
		fieldDataLengths.push(fieldDataLength);
		
		for(var i=0; i<fieldDataLengths.length-1; i++){
			if(fieldDataLengths[i] != fieldDataLength || startTime != thisStartTime){
				fieldDataLengths.pop();
				alert('This company does not exist in the same time frame.');
				return;
			}
		}
		
		names.push(upd.security);	
		
		var prices = [];
		for(var j=0; j<fieldDataLength; j++){
			var a = upd.fieldData[j].PX_LAST;
			var b = upd.fieldData[j].OPEN;
			prices.push((a+b)/2);
		}
		averagePrices.push(prices);
		
		alert(upd.security);
		
		if(names.length > 100)
			names.shift();
	});
}