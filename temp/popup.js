'use strict';

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
};

/*var Timer = React.createClass({
  displayName: 'Timer',

  getInitialState: function getInitialState() {
    return { secondsElapsed: 0 };
  },
  tick: function tick() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount: function componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      ' Seconds Elapsed: ',
      this.state.secondsElapsed,
      ' '
    );
  }
}); */

document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabUrl(function (url) {
    //var start = new Date();
    var statusText = 'You are currently viewing: ' + url;
    document.getElementById('status').textContent = statusText;
    //ReactDOM.render(React.createElement(Timer, null), document.getElementById('curr'));
  });
});