// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "tab_changed" ) {
      var isIn = 0;
      var firstHref = window.location.hostname;
      for(i = 0; i<request.times.length; i++){
      	if(request.times[i] == firstHref){
      		isIn = 1;
      		break;
      	}
      }
      if(isIn == 0){
      	request.times.push(firstHref);
      }

      //console.log(firstHref);
      console.log("Hello");
      chrome.runtime.sendMessage({"message": "track_tab", "url": firstHref, "times":request.times});
    }
  }
);