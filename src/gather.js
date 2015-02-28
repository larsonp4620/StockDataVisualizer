var queryServer = function() {
	$.ajax({	type:"POST",
				url: "https://http-api.openbloomberg.com/request?ns=blp&service=refdata&type=HistoricalDataRequest",
				data: JSON.stringify({
						"securities": ["IBM US Equity", "AAPL US Equity"],
						"fields": ["PX_LAST", "OPEN"],
						"startDate": "20120101",
						"endDate": "20120105",
						"periodicitySelection": "DAILY"}
						),
				error: 	function(xhr, status, error) {
								var err = eval("(" + xhr.responseText + ")");
								console.log(xhr);
								},
				port: 443,
				
				
	}).done(	function (msg) {
						alert("did something: "+ msg);
						}
				);
	
}

window.onload = queryServer();