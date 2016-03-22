// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "tab_changed" ) {
      var isIn = 0;
      var firstHref = window.location.hostname;
      for(i = 0; i<request.times.length; i++){
      	if(request.times[i].webname == firstHref){
          times[i].start_time = new Date().getTime()
      		isIn = 1;
      		break;
      	}
      }
      if(isIn == 0){
        var website = {
          webname: firstHref,
          favicon: ("\"http://www.google.com/s2/favicons?domain=" + firstHref + "\""),
          start_time: new Date().getTime(),
          total_time: 0 };
      	request.times.push(website);
      }

      //console.log(firstHref);
      console.log("Hello");
      chrome.runtime.sendMessage({"message": "track_tab", "url": firstHref, "times":request.times});
    }
  }
);