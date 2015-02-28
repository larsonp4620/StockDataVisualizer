var queryServer = function(callback) {
	$.ajax({	type:"GET",
				dataType: "json",
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
