import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
/*
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCandidates from './components/DCandidates';
*/
import Navbar from "./components/Navbar";
// import User from './components/User';
import Users from './components/Users';
import AddUser from "./components/AddUser";

class App extends Component {
  render(){
    // const {users} = this.state;
    return (
      <div className="App">
        <Navbar title = "Navbar"/>
        <hr/>
        <AddUser/>
        <Users/>
      </div>
    )
  }
}

export default App;
