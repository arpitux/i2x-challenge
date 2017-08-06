import React from 'react';
import {render} from 'react-dom';
import {Dashboard} from './Dashboard.jsx';
import {Login} from './Login.jsx';

class Index extends React.Component{

    render(){
        const token = localStorage.getItem("i2xToken6");

        if(token) {
            return (
                <div>
                    <Dashboard />
                </div>
            );
        }
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