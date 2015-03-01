var width = window.innerWidth,
    height = window.innerHeight;

var tempDispArray = [];
var displayIndex=0;
var color = ["#779ECB", "#B39EB5", "#F49AC2","#FFD1DC"];
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
var dataArray = [];
var animationStep = 100;
var interval;
var isLooping = false;
var blockMovement = true;
createCircles();

function updateCircles() {
    if (!blockMovement) {
        displayIndex++;
        if (displayIndex >= tempDispArray[0].length)
            displayIndex = 0;

        for (var i = 0; i < tempDispArray.length; i++) {
            dataArray[i].radius = tempDispArray[i][displayIndex];
            console.log(tempDispArray[i][displayIndex]);
        }
        svg.selectAll("circle").data(dataArray);
        svg.selectAll("circle").attr("r", function (d) { return d.radius; });
    } else {
        moveCircles();
    }
}

function moveCircles() {
    for (var i = 0; i < tempDispArray.length; i++) {
        dataArray[i].x += dataArray[i].dx;
        dataArray[i].y += dataArray[i].dy;
    }
    svg.selectAll("circle").attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
}

function createCircles() {
    displayIndex = 0;
    dataArray = [];
    for (var i = 0; i < tempDispArray.length; i++) {
        dataArray.push({ radius: tempDispArray[i][0], x: width / tempDispArray.length * ((i + 1) - 1 / 2), y: height / 2, dy: 1, dx: 1 });
    }
    console.log(dataArray);

    svg.selectAll("circle").data(dataArray)
                            .enter().append("circle");
    svg.selectAll("circle").attr("r", function (d) { return d.radius; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y;})
    .style("fill", function (d, i) { return color[i]; });
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