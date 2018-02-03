(function () {
    var data = chrome.extension.getBackgroundPage();
    var objs = data.backgroundfunction_times();
    console.log(objs);
    var newHTML = [];
    newHTML.push('<ul>');
	for (key in objs.times) {
	    newHTML.push('<li style=\"border-bottom:1px, solid, black\"">' + '<img src=' + objs.times[key].favicon + '/>' + objs.times[key].webname +": " + objs.times[key].total_time/1000 + '</li>');
        // newHTML.push('<li style=\"border-bottom:1px, solid, black\"">' + objs.chart[i][0] +": " + objs.chart[i][1]/1000 + '</li>');
	}
	newHTML.push('</ul>')
	$("div.curr").html(newHTML);
})();