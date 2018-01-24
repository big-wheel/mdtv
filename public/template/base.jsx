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
        <div className="tip">
          <a className="btn" href="/fileView">FileView</a>&nbsp;&nbsp; under root directory
        </div>
        {this.props.children}
      </body>
    </html>
  }
}

module.exports = Base;