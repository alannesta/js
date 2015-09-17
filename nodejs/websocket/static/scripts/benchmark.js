var ctx = $("#result").get(0).getContext("2d");
var benchmark_graph = new Chart(ctx);

var socket = io(getSocketUrl() + '/benchmark');

var barchartOptions = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - If there is a stroke on each bar
    barShowStroke: true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth: 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1
};

var barchartData = {
    labels: ["Java", "Ruby", "Python", "C", "Javascript"], // labels could be generated dynamically with one more socket round trip
    datasets: [{
        label: "whatever",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [0, 0, 0, 0, 0]
    }]
};
var bar = benchmark_graph.Bar(barchartData, barchartOptions);

/**
 * socket commands
 */
socket.on('server:draw', function(data) {
    updateGraph(data);
});

socket.on('server:finish', function() {
    //benchmark_graph.Bar(barchartData, barchartOptions);
});

$('#start').on('click', function() {
    barchartData.datasets[0].data = [0, 0, 0, 0, 0];    // reset datasets
    bar = benchmark_graph.Bar(barchartData, barchartOptions);   // repaint the canvas
    socket.emit('client:start');
});

function updateGraph(data) {
    for (var key in data) {
        var index = barchartData.labels.indexOf(key);
        bar.datasets[0].bars[index].value = data[key];      // update graph without repaint the canvas
    }
    bar.update();
}


function getSocketUrl() {
    var url = document.getElementsByTagName('script')[0].src;
    //console.log(url);
    return url.slice(0, url.indexOf('/socket'));
}

