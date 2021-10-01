import React, { Component } from 'react';
import {variables} from "../Variables";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            username : "",
            email : "",
            password : "",
        }
    }
    
    reFreshList(){
        fetch(variables.API_URL+'register')
        .then(response => response.json())
        .then(data => {
                this.setState({data : data});
            });
    }

    componentDidMount() {
        this.reFreshList();
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    loginUser(){
        fetch(variables.API_URL + "register",{
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : this.state.name,
                username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                photoUrl : this.state.photoUrl,
            })
        })
        .then(response => response.json())
        .then(result => {
            alert(result);
            this.reFreshList();
        },(error) => {
            alert("Failed");
        })
    }

    render() {
        const {username, email, password} = this.state;
        return (
            <div className="container">
                <br/>
                <div className="modal-dialog modal-login modal-content">
                    <div className="card">
                        <div className="card-header">
                            <h4>Recipe App Log In Form</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input type="text" 
                                        name="username" 
                                        id="username" 
                                        placeholder="Enter Username" 
                                        required="required"
                                        className="input"
                                        value={username}
                                        onChange={this.changeInput}/>
                                        <span className="icon is-small is-left">
                                            <i className="far fa-user"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input type="email"  
                                        name="email" 
                                        id="email" 
                                        placeholder="Enter Email" 
                                        required="required"
                                        className="input"
                                        value={email}
                                        onChange={this.changeInput}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="field">
                                  <p className="control has-icons-left">
                                    <input type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter Password" 
                                    required="required"
                                    className="input"
                                    value={password}
                                    onChange={this.changeInput}/>
                                    <span className="icon is-small is-left">
                                      <i className="fas fa-lock"></i>
                                    </span>
                                  </p>
                                </div>
                            </div>
                                            
                            <form action="/recipes" method="post" onSubmit={()=>this.loginUser()} name="register">
                                <button className="btn btn-danger btn-block" type="submit">Log In</button>
                            </form>
                            
                        </div>
                        <div className="card-footer text-muted">
                            <a href="/register">Sign In</a>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default Login;
