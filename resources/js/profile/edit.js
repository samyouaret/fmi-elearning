import React from 'react';
import ReactDOM from 'react-dom';
import ProfileEditor from './ProfileEditor'

let node = document.getElementById('profile');
if (node) {
    ReactDOM.render(<ProfileEditor/>, node);
}
