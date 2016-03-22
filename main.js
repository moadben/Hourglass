(function () {
    var data = chrome.extension.getBackgroundPage();
    var times = data.backgroundfunction();
    console.log(times);
    var newHTML = [];
	for (var i = 0; i < times.length; i++) {
		newHTML.push('<ul>')
	    newHTML.push('<il>' + times[i].webname +": " + times[i].total_time/1000 + '</il>');
	    newHTML.push('</ul');
	}
	$("div.curr").html(newHTML);
})();