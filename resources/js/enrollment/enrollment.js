require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import EnrollmentDashboard from './EnrollmentDashboard'
const node = document.getElementById('enrollment');
if (node) {
   ReactDOM.render(<EnrollmentDashboard/>,node);
}
