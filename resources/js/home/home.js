require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import HomeDashboard from './HomeDashboard'
const node = document.getElementById('home');
if (node) {
   ReactDOM.render(<HomeDashboard/>,node);
}
