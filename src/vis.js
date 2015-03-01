var width = window.innerWidth,
    height = window.innerHeight;

var testArray = [[20, 30, 40], [10, 15, 10], [100, 50, 25]];
var displayIndex=0;
var color = ["#779ECB", "#B39EB5", "#F49AC2","#FFD1DC"];
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
var singleArray = [];
createCircles();

function updateCircles() {
    displayIndex++;
    if (displayIndex >= testArray.length)
        displayIndex = 0;
    for (var i = 0; i < testArray.length; i++) {
        singleArray[i].radius = testArray[i][displayIndex];
    }
    svg.selectAll("circle").data(singleArray);
    svg.selectAll("circle").attr("r", function (d) { return d.radius; });
}

function createCircles() {
    //var singleArray = [];
    for (var i = 0; i < testArray.length; i++) {
        singleArray.push({radius: testArray[i][0], x:width/testArray.length*((i+1)-1/2),y:height/2});
    }
    console.log(singleArray);

    svg.selectAll("circle").data(singleArray)
                            .enter().append("circle")
    .attr("r", function (d) { return d.radius; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y;})
    .style("fill", function (d, i) { return color[i]; });
}


var buttonClick = function () {
    var name = $("#textBox").val();
    parseJSON(name);
}