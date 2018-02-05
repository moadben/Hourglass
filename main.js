(function () {
    // Grabbing data from the background script and displaying overall time data 
    var data = chrome.extension.getBackgroundPage();
    var objs = data.backgroundfunction_times();
    console.log(objs);
    var newHTML = [];
    newHTML.push('<ul>');
	for (key in objs.times) {
	    newHTML.push('<li style=\"border-bottom:1px, solid, black\"">' + '<img src=' + objs.times[key].favicon + '/>' + objs.times[key].webname +": " + objs.times[key].total_time/1000 + '</li>');
	}
	newHTML.push('</ul>')
    $("div.curr").html(newHTML);
    

    // Charting chart data using canvasjs
    window.onload = function () {
        
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Browsing timeline"
            },
            axisX:{
                title: "Website"
            },
            axisY: {
                title: "Time spent (in seconds)",
                includeZero: false,
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                }
            },
            data: [{
                type: "area",
                dataPoints: objs.chart
            }]
        });
        chart.render();
    }

})();