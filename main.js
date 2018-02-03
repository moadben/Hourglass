(function () {
    var data = chrome.extension.getBackgroundPage();
    var objs = data.backgroundfunction_times();
    console.log(objs);
    var newHTML = [];
    newHTML.push('<ul>');
	for (var i = 0; i < objs.times.length; i++) {
	    newHTML.push('<li style=\"border-bottom:1px, solid, black\"">' + '<img src=' + objs.times[i].favicon + '/>' + objs.times[i].webname +": " + objs.times[i].total_time/1000 + '</li>');
        // newHTML.push('<li style=\"border-bottom:1px, solid, black\"">' + objs.chart[i][0] +": " + objs.chart[i][1]/1000 + '</li>');
	}
	newHTML.push('</ul>')
	$("div.curr").html(newHTML);
})();