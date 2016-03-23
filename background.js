var times = [];
var activeTab;
var currentDomain;

function backgroundfunction(){
  updateTime();
  return times;
}


chrome.tabs.onUpdated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
    while(!activeTab.id){
      initTime();
    }
    chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onActivated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
     while(!activeTab.id){
      initTime();
    }
     chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onCreated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
     while(!activeTab.id){
      initTime();
    }
     chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onRemoved.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
  activeTab = tabs[0];
  while(!activeTab.id){
      initTime();
    }
   // chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "track_tab" ) {
      times = request.times;
      currentDomain = request.url;
      // alert(request.url);
      return true;
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

function initTime(){
  if(times.length == 0){
    return;
  }
  for(i = 0; i<times.length; i++){
        if(times[i].webname == currentDomain){
          times[i].start_time = new Date().getTime();
          var cool = (times[i].webname + ": " + times[i].total_time/1000);
          console.log("Yeah");
          return;
        }
      }
}