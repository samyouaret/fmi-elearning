require('../bootstrap');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CourseContainer from './CourseBuilder'

if (document.getElementById('course')) {
    ReactDOM.render(<CourseContainer />, document.getElementById('course'));
}
