// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     if( request.message === "tab_changed" ) {
      var isIn = 0;
      var firstHref = window.location.hostname;
      for(i = 0; i<request.times.length; i++){
      	if(request.times[i].webname == firstHref){
          request.times[i].start_time = new Date().getTime();
          isIn = 1;
          // alert("I know I've been got a long time bot");
      	}
      }
      if(isIn == 0){
        var website = {
          webname: firstHref,
          favicon: ("\"http://www.google.com/s2/favicons?domain=" + firstHref + "\""),
          start_time: new Date().getTime(),
          total_time: 0 };
      	request.times.push(website);
         if(request.topten.length < 10){
            request.topten.push(request.times[i]);
          }
          else if(request.topten[9].total_time<request.times[i].total_time){
            request.topten[9] = request.times[i];
          }
      }

      //console.log(firstHref);
      console.log("Hello");
      // alert("I'm back and I want what is mine");
      chrome.runtime.sendMessage({"message": "track_tab", "url": firstHref, "times":request.times, "topten":request.topten});
  }
   }
);