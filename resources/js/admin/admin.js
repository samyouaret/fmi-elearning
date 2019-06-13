require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import AdminDashboard from './AdminDashboard'
const node = document.getElementById('admin');
if (node) {
   ReactDOM.render(<AdminDashboard/>,node);
}
