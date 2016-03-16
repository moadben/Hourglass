
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
};

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
      //var start = new Date();
      var statusText = 'You are currently viewing: ' + url;
      document.getElementById('status').textContent = statusText;
  });
});
