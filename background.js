var times = [];
var activeTab;
var currentDomain;

/*chrome.browserAction.onClicked.addListener(function(tab){
 chrome.app.window.create('popup.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});*/

function backgroundfunction(){
  updateTime();
  return times;
}

chrome.tabs.onSelectionChanged.addListener(function(tab) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onUpdated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onRemoved.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  activeTab = tabs[0];
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "track_tab" ) {
      times = request.times;
      currentDomain = request.url;
      //alert(request.url);
    }
  }
);

function updateTime(){
  if(times.length == 0){
    return;
  }
  for(i = 0; i<times.length; i++){
        if(times[i].webname == currentDomain){
          times[i].total_time = times[i].total_time + (new Date().getTime() - times[i].start_time);
          times[i].start_time = new Date().getTime();
          var cool = (times[i].webname + ": " + times[i].total_time/1000);
          console.log(cool);
          return;
        }
      }
}

var newHTML = [];
for (var i = 0; i < times.length; i++) {
    newHTML.push('<span>' + times[i].webname +": " + times[i].total_time + '</span>');
}
$(".curr").html(newHTML.join(""));