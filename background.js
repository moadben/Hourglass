// GLOBAL VARIABLES USED THROUGHOUT BACKGROUND.JS //
var chart = [];
var times = {};
var activeTab;
var timesIndex = "";
var currentDomain;
var prevDomain;
// GLOBAL VARIABLES USED THROUGHOUT BACKGROUND.JS //


/*                                                                        * 
* Background.js is the main content script that tracks the changing       *
* of chrome tabs/windows and manipulates the time and chart objects       *
* with the assistance of myscript.js which creates new time variables     *
* whenever a new website has been logged                                  *
*                                                                        */                                                                        


// Function called from the main script to grab latest chart/times objects
function backgroundfunction_times(){
  times[timesIndex].total_time = times[timesIndex].total_time + (new Date().getTime() - times[timesIndex].start_time);
  times[timesIndex].start_time = new Date().getTime();
  chrome.storage.sync.set({'stored_times': times});
  return {"times": times, "chart": chart};
}

// When focus of chrome screen is changed
chrome.windows.onFocusChanged.addListener(function(windowId) {
    initTime();
});

// When a new window is created
chrome.windows.onCreated.addListener(function(windowId){
  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
    activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "tab_changed", "times": times});
  });
      
});

// Grabs stored time data when chrome is opened 
chrome.runtime.onStartup.addListener(function(){
      chrome.storage.sync.get('stored_times',function(items){
        times = items.stored_times;
        alert(items.stored_times);
      });
});

// When a new website has been loaded/refreshed
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

// When a chrome tab is re-activated
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

// When a new tab is created
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

// When a tab is closed
chrome.tabs.onRemoved.addListener(function(tab) {
  updateTime();

  chrome.tabs.query({active: true, currentWindow: true, 'lastFocusedWindow': true}, function(tabs) {
  activeTab = tabs[0];
  if(tabs.length == 0){
      return;
    }
  });
});

// When myscript is done and sends the new time object back
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "track_tab" ) {
      times = request.times;
      currentDomain = request.url;
      if(timesIndex!=undefined && timesIndex != request.index){
        if(chart.length==10){
          chart.shift();
        }
        chart.push({ "y": ((times[timesIndex].total_time - times[timesIndex].prev_total_time)/1000), "label": times[timesIndex].webname});
      }
      timesIndex = request.index;
      return true;
    }
  }
);

// Update time is called whenever a tab/window changes
function updateTime(){
  if(Object.keys(times).length == 0){
    return;
  }
  if(prevDomain != currentDomain){
    times[currentDomain].prev_total_time = times[currentDomain].total_time;
    console.log(currentDomain)
  }
  times[currentDomain].total_time = times[currentDomain].total_time + (new Date().getTime() - times[currentDomain].start_time);
  times[currentDomain].start_time = new Date().getTime();
  timesIndex = currentDomain;
  prevDomain = currentDomain;
  chrome.storage.sync.set({'stored_times': times});
  return;
}

// Inittime is called when a chrome window has changed
function initTime(){
  if(Object.keys(times).length == 0){
    return;
  }
  times[currentDomain].start_time = new Date().getTime();
  timesIndex = currentDomain;
  var cool = (times[currentDomain].webname + ": " + times[currentDomain].total_time/1000);
  return;
}
