var times = [];
var topten = [];
var activeTab;
var timesIndex = 0;
var currentDomain;

function backgroundfunction_times(){
  console.log("yo....")
  times[timesIndex].total_time = times[timesIndex].total_time + (new Date().getTime() - times[timesIndex].start_time);
  times[timesIndex].start_time = new Date().getTime();
  chrome.storage.sync.set({'stored_times': times});
  return times;
}

chrome.windows.onFocusChanged.addListener(function(windowId) {
    initTime();
});

chrome.windows.onCreated.addListener(function(windowId){
  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
      
});

chrome.runtime.onStartup.addListener(function(){
      chrome.storage.sync.get('stored_times',function(items){
        console.log("Shaaaaaaaaky Warriah");
        times = items.stored_times;
        alert(items.stored_times);
      });
});

chrome.tabs.onUpdated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
    if(tabs.length == 0){
      return;
    }
    chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onActivated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
     if(tabs.length == 0){
      return;
    }
     chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onCreated.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
    if(tabs.length == 0){
      return;
    }
     chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
});

chrome.tabs.onRemoved.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
  activeTab = tabs[0];
  if(tabs.length == 0){
      return;
    }
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "track_tab" ) {
      times = request.times;
      currentDomain = request.url;
      timesIndex = request.index;
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
          timesIndex = i;
          var cool = (times[i].webname + ": " + times[i].total_time/1000);
          console.log(cool);
          chrome.storage.sync.set({'stored_times': times});
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
          timesIndex = i;
          var cool = (times[i].webname + ": " + times[i].total_time/1000);
          return;
        }
      }
}