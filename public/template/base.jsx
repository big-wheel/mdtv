var React = require('react');
var path = require('path');

class Base extends React.Component {
  render() {
    var cp = this.props.cp;  //current path
    return <html>
      <head>
        <link rel="stylesheet" href="/css/index.css" />
      </head>
      <body>
        {this.props.children}
      </body>
    </html>
  }
}

module.exports = Base;