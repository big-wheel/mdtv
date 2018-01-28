var Base = require('./base.jsx');

var React = require('react');


class MdRender extends React.Component {
  render() {
    return <Base>
    <div>
      { this.props.content }
    </div>
    </Base>;
  }
}

module.exports = MdRender;