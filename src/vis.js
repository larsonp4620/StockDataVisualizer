var width = window.innerWidth,
    height = window.innerHeight;

var tempDispArray = [];

var displayIndex=0;
var color = [];
var alterColor = [];
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
	
var dataArray = [];
var textArray = [];

var textHeight = 10;
var animationStep = 100;
var interval;
var isLooping = false;

var predatorIndex = 0;
var preyIndex = 0;

createCircles();

var ColorLuminance = function(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

var calculateAverageChange = function(i) {
	var windowSize = 4;
	var halfSize = windowSize/2;
	var start = displayIndex - halfSize;
	var end = displayIndex + halfSize;

	var totalChange = 0;
	
	if(start < 0)
		start = 0;
	if(end >= dataArray[i].length)
		end = dataArray[i].length - 1;
	
	for(var j=start; j<end; j++){
		totalChange = tempDispArray[i][j+1] - tempDispArray[i][j];
	}
	
	var returnMe = totalChange/(end-start+1)
	
	if(isNaN(returnMe))
		return 0;
	
	return returnMe;
}

var pushTowards = function(source, dest) {
	if(source != dest){
		dataArray[source].x = (dataArray[dest].x/10) - dataArray[source].x;
		dataArray[source].y = (dataArray[dest].y/10) - dataArray[source].y;
	}
}

function updateCircles() {

    displayIndex++;
    if (displayIndex >= tempDispArray[0].length)
        displayIndex = 0;

	var min = calculateAverageChange(0);
	var max = 0;
    for (var i = 0; i < tempDispArray.length; i++) {
        dataArray[i].radius = tempDispArray[i][displayIndex];
		var change = calculateAverageChange(i);
		
		if(change > max){
			max = change;
			predatorIndex = i;
		} else if(change < min) {
			min = change;
			preyIndex = i;
		}
		
		alterColor[i] = ColorLuminance(color[i], change/6);
    }
	
	pushTowards(preyIndex, predatorIndex);
	pushTowards(predatorIndex, preyIndex);
	
    svg.selectAll("circle").data(dataArray);
    svg.selectAll("circle").attr("r", function (d) { return d.radius; });
	svg.selectAll("circle").style("fill", function (d, i) {return alterColor[i]; });
	
	svg.selectAll("text").data(dataArray);
	svg.selectAll("text").text( function (d, i) {return d.text});
	svg.selectAll("text").attr("x", function (d) { return d.x });
	svg.selectAll("text").attr("y", function (d) { return d.y + d.radius +10});
}

function createCircles() {
    displayIndex = 0;
    dataArray = [];
    for (var i = 0; i < tempDispArray.length; i++) {
		color[i] = '#'+Math.floor(Math.random()*(16777215 - 1000) + 1000).toString(16);
        dataArray.push({ radius: tempDispArray[i][0], x: width / tempDispArray.length * ((i + 1) - 1 / 2), y: height / 2, dy: 0, dx: 0 });

        var circleText = names[i].substring(0, names[i].length - 10).trim();
        dataArray[i].text = circleText;
    }

    svg.selectAll("circle").data(dataArray)
                           .enter().append("circle");
						   
    svg.selectAll("circle").attr("r", function (d) { return d.radius; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y;})
    .style("fill", function (d, i) { return color[i]; });
	
	
	//for (var i = 0; i < tempDispArray.length; i++) {
    //    textArray.push({x: (width / tempDispArray.length * ((i + 1) - 1 / 2)), y: height / 2, dy: 0, dx: 0 });
	//}
	svg.selectAll("text").data(dataArray)
						 .enter().append("text");
						 
	svg.selectAll("text").text( function (d) {return d.text;})
	.attr("x",function (d) {return d.x;})
	.attr("y", function (d) { return d.y + d.radius+10; })
	.attr("font-family", "sans-serif")
	.attr("font-size", "25px");
	svg.selectAll("text").style("fill", "white");
	
}

var buttonClick = function () {
    var name = $("#textBox").val();
    parseJSON(name, function () {
        tempDispArray = averagePrices;
        createCircles();
    });
}

var button2Click = function () {
    if (isLooping) {
        clearInterval(interval);
        isLooping = false;
    } else {
        interval = setInterval(updateCircles, animationStep);
        isLooping = true;
    }
}