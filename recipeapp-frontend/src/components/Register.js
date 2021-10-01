import React, { Component } from 'react';
import {variables} from "../Variables";
//import AddUser from "./AddUser";

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            name : "",
            username : "",
            email : "",
            password : "",
            photoUrl : "profile.png",
            photoPath : variables.PHOTO_URL
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

    createUser(){
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

    imageUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);
        fetch(variables.API_URL+"register/savefile", {
            method : "POST",
            body : formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({photoUrl : data});
        })
    }

    render() {
        const {name, username, email, password, photoUrl, photoPath} = this.state;
        return (
            <div className="container">
                <br/>
                <div className="modal-login modal-content" style={{width:"700px"}}>
                    <div className="card">
                        <div className="card-header">
                            <h4>Recipe App Register Form</h4>
                        </div>
                        <div className="card-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{width:"400px", paddingRight:"25px"}}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <div className="field">
                                                        <p className="control has-icons-left">
                                                            <input type="text" 
                                                            name="name" 
                                                            id="id" 
                                                            placeholder="Enter Name" 
                                                            required="required"
                                                            className="input" 
                                                            value={name}
                                                            onChange={this.changeInput}/>
                                                            <span className="icon is-small is-left">
                                                                <i className="fas fa-user"></i>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
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
                                            </td>
                                            <td>
                                                <br/>
                                                <img width="260px" height="250px" 
                                                src={photoPath+photoUrl}
                                                alt="profile"/>
                                                <input className="m-2" type="file"
                                                onChange={this.imageUpload}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <form action="/login" method="post" onSubmit={()=>this.createUser()} name="register">
                                    <button className="btn btn-danger btn-block" type="submit">Register</button>
                                </form>
                            
                        </div>
                        <div className="card-footer text-muted">
                            <a href="/login">Log In</a>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}
