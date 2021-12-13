require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CourseContainer from './CourseContainer'

if (document.getElementById('dashboard')) {
   console.log("hello");
    ReactDOM.render(<CourseContainer />, document.getElementById('dashboard'));
}
