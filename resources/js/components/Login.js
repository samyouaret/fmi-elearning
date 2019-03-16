import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="form">
                  <label htmlFor="email">email</label>
                  <input type="text" name="email" className="form-control"></input>
                  <label htmlFor="password">password</label>
                  <input type="password" name="password" className="form-control"></input>
                </div>
            </div>
        );
    }
}

export default Login
