/*global define */ 

var Timer = React.createClass({
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
});

console.log('bitch im done with u');
