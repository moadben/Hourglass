// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     if( request.message === "tab_changed" ) {
      var isIn = 0;
      var firstHref = window.location.hostname;
      var fav = firstHref;
      console.log(firstHref);
      if(firstHref=="www.google.ca"){
        fav="www.google.com";
      }
      var index;
      for(i = 0; i<request.times.length; i++){
        if(request.times[i].webname == firstHref){
          request.times[i].start_time = new Date().getTime();
          isIn = 1;
          index = i;
          // alert("I know I've been gone a long time bot");
        }
      }
      if(isIn == 0){
        var website = {
          webname: firstHref,
          favicon: ("\"http://www.google.com/s2/favicons?domain=" + fav + "\""),
          start_time: new Date().getTime(),
          total_time: 0 };
        request.times.push(website);
        index = request.times.length-1;
      }

      //console.log(firstHref);
      console.log("Hello");
      // alert("I'm back and I want what is mine");
      chrome.runtime.sendMessage({"message": "track_tab", "url": firstHref, "times":request.times, "index": index});
  }
   }
);