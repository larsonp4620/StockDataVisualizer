var queryServer = function(queryName, callback) {
	$.ajax({	type:"GET",
				dataType: "json",
				data: { "name": queryName },
				url: "BloomData",
				error: 	function(xhr, status, error) {
								var err = eval("(" + xhr.responseText + ")");
								console.log(xhr);
								},
				port: 8888,
				
	}).done(	function (msg) {
					if(msg.data[0].securityData.fieldData.length != 0){
						callback(msg);
					} else {
						alert('Invalid company name. Try abbreviations like "ININ" for Interactive Intelligence.');
					}
				});
	
}
