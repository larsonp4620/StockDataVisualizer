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
					callback(msg)
				});
	
}
