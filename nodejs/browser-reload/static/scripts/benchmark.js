var ctx = $("#result").get(0).getContext("2d");
var benchmark_graph = new Chart(ctx);

var socket = io(getSocketUrl() + '/benchmark');

var barchartOptions = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1
};

socket.on('server:draw', function(data) {
    console.log('draw stuff');
    benchmark_graph.Bar(data, barchartOptions);
});

$('#start').on('click', function() {
    socket.emit('client:start');
});

function getSocketUrl() {
    var url = document.getElementsByTagName('script')[0].src;
    //console.log(url);
    return url.slice(0, url.indexOf('/socket'));
}

//var data = {
//    labels: ["January", "February", "March", "April", "May", "June", "July"],
//    datasets: [
//        {
//            label: "My First dataset",
//            fillColor: "rgba(220,220,220,0.5)",
//            strokeColor: "rgba(220,220,220,0.8)",
//            highlightFill: "rgba(220,220,220,0.75)",
//            highlightStroke: "rgba(220,220,220,1)",
//            data: [65, 59, 80, 81, 56, 55, 40]
//        },
//        {
//            label: "My Second dataset",
//            fillColor: "rgba(151,187,205,0.5)",
//            strokeColor: "rgba(151,187,205,0.8)",
//            highlightFill: "rgba(151,187,205,0.75)",
//            highlightStroke: "rgba(151,187,205,1)",
//            data: [28, 48, 40, 19, 86, 27, 90]
//        }
//    ]
//};
//


//benchmark_graph.Bar(data, options);
