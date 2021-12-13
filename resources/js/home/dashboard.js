require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoggedDashboard from './LoggedDashboard'
import HomeDashboard from './HomeDashboard'

const node = document.getElementById('dashboard');
if (node) {
   ReactDOM.render(<LoggedDashboard/>,node);
}
const node2 = document.getElementById('home');
if (node2) {
   ReactDOM.render(<HomeDashboard/>,node2);
}
