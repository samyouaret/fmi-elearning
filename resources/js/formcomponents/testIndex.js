require('../bootstrap');

import React, {Component} from 'react'
import {render} from 'react-dom'
import Login from './Login'

if (document.getElementById('login')) {
    render(<Login />, document.getElementById('login'));
}
