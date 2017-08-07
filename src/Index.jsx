import React from 'react';
import {render} from 'react-dom';
import {Dashboard} from './Dashboard.jsx';
import {Login} from './Login.jsx';

class Index extends React.Component{

    render(){

        const token = localStorage.getItem("i2xToken");

        //If token available then go to Dashboard
        if(token) {
            return (
                <div>
                    <Dashboard />
                </div>
            );
        }
        // Else go to Login
        else{
            return (
                <div>
                    <Login />
                </div>
            );
        }
    }
}

render(<Index/>, document.getElementById("app"));