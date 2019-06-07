import React from 'react';
import ReactDOM from 'react-dom';
import ProfileViewer from './ProfileViewer'
let node = document.getElementById('profile');
if (node) {
    ReactDOM.render(<ProfileViewer/>, node);
}

export default Profile
