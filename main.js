(function () {
    var data = chrome.extension.getBackgroundPage();
    var times = data.backgroundfunction_times();
    console.log(times);
    var newHTML = [];
    newHTML.push('<ul>');
	for (var i = 0; i < times.length; i++) {
	    newHTML.push('<li style=\"border-bottom:1px, solid, black\"">' + '<img src=' + times[i].favicon + '/>' + times[i].webname +": " + times[i].total_time/1000 + '</li>');
	}
	newHTML.push('</ul>')
	$("div.curr").html(newHTML);
})();