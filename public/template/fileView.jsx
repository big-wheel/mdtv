var Base = require('./base.jsx');

var React = require('react');


class FileView extends React.Component {
  render() {
    var cp = this.props.cp;  //current path
    return <Base>
      <table>
        <tr>
          <th>name</th>
          <th>size</th>
          <th>operate</th>
        </tr>
        { this.props.files.map((item,i) => {
          return <tr key={i}>
            <td>
            {item.dir ? (<span className="iconfont">&#xe622;</span>) : (<span className="iconfont">&#xe62b;</span>)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={`${cp}/${item.name}`}>
              {item.name}
            </a></td>
            <td>{item.size}</td>  
            <td>{item.dir ? '-' : (<a href="" className="iconfont">&#xe67b;</a>)}</td>
          </tr>
        })}
      </table>
    </Base>;
  }
}

module.exports = FileView;