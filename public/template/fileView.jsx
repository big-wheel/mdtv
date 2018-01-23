var React = require('react');

class FileView extends React.Component {
  render() {
    return <div>
      <table>
        <tr>
          <th>name</th>
          <th>size</th>
          <th>operate</th>
        </tr>
      </table>
      { this.props.files.map((item) => {
        return <tr>
          <td>{item.dir && (<span></span>)}item.name</td>
          <td>item.size</td>
          <td><a href="">download</a></td>
        </tr>
      })}
    </div>;
  }
}

module.exports = FileView;