require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CourseBuilder from './CourseBuilder'

if (document.getElementById('course')) {
   ReactDOM.render(<CourseBuilder/>, document.getElementById('course'));
}
