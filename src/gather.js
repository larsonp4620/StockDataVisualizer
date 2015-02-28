var queryServer = function() {
	$.ajax({	type:"GET",
				url: "127.0.0.1",
				error: 	function(xhr, status, error) {
								var err = eval("(" + xhr.responseText + ")");
								console.log(xhr);
								},
				port: 8888,
				
	}).done(	function (msg) {
						alert("did something: "+ msg);
						}
				);
	
}

window.onload = queryServer();