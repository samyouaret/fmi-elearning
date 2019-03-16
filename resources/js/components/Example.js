import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                            <Login/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
