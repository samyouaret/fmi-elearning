import React from 'react';
import ReactDOM from 'react-dom';

class Profile extends React.Component {
  render(){
    return (
      <button className="btn btn-lg btn-primary">
      renderd</button>
    );
  }
}
if (document.getElementById('test')) {
    ReactDOM.render(<Profile />, document.getElementById('test'));
}

export default Profile
