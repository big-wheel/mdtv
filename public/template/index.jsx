var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}
      <a type="primary">FileView</a>
    </div>;
  }
}

module.exports = HelloMessage;