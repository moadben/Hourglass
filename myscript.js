// When the tab has been changed, myscript is called to log the webpage's time, either by simply
// resetting the start time of a previously visited webpage or appending a new webpage object if
// it is unknown


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // check request message
     if( request.message === "tab_changed" ) {
      var isIn = 0;
      var firstHref = window.location.hostname;
      var fav = firstHref;
      console.log(firstHref);

      // special use cases for google domains so we can grab a favicon
      if(firstHref.includes("www.google")){
        fav="www.google.com";
      }

      // Strip off preceding www. and ending .com's from URL's to make webname prettier
      firstHref = firstHref.replace('www.', '').replace('.com', '');
      firstHref = firstHref.charAt(0).toUpperCase() + firstHref.slice(1);
      

      // Loop through to check if the website we're adding is already in the list, if so
      // just edit the time and dont append the webname to overall time object
      var index;
      for(i = 0; i<request.times.length; i++){
        if(request.times[i].webname == firstHref){
          request.times[i].start_time = new Date().getTime();
          isIn = 1;
          index = i;
          // alert("I know I've been gone a long time bot");
        }
      }
      // check to make sure the object hasn't been seen before
      if(isIn == 0){
        var website = {
          webname: firstHref,
          favicon: ("\"http://www.google.com/s2/favicons?domain=" + fav + "\""),
          start_time: new Date().getTime(),
          total_time: 0,
          prev_total_time: 0 };
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