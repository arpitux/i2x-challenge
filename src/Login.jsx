import React from 'react';
import Axios from 'axios';

var instance = Axios.create({
    baseURL: 'https://i2x-challenge.herokuapp.com',
    timeout: 5000
});

export class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: 'challenge@i2x.ai',
            password: 'pass123'
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    login(e) {

        instance.post('/core/login/', {
            email: this.state.email,
            password: this.state.password
        }).then(function(response){

            if(response.data.token){
                localStorage.setItem("i2xToken6", response.data.token);

                window.location.reload();
            }
            else {
                alert("User is not valid");
            }
        }).catch(function (error) {
            alert('error');
        });


    }

    handleEmail(event) {
        this.state.email = event.target.value;
    }

    handlePassword(event) {
        this.state.password = event.target.value;
    }


    render(){
        return (
            <div>
                <h3>Login</h3>
                <div>
                    <label>E-mail</label>
                    <div>
                        <input type="email" defaultValue={this.state.email} onChange={this.handleEmail} placeholder="Enter E-mail" />
                    </div>
                </div>
                <br/>
                <div>
                    <label>Password</label>
                    <div>
                        <input type="password" defaultValue={this.state.password} onChange={this.handlePassword} placeholder="Enter Password" />
                    </div>
                </div>
                <br/>
                <button type="button" onClick={(event) => this.login(event)}>Login</button>
            </div>
        )
    }
}

