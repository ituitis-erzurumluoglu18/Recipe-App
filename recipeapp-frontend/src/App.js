import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
/*
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCandidates from './components/DCandidates';
*/
import Navbar from "./components/Navbar";
import User from './components/User';
//import Users from './components/Users';
//import Test from './components/Test';

import Recipes from "./components/Recipes";
import RecipeDetail from "./components/RecipeDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import AddRecipe from "./components/AddRecipe";

function App() {
    // const {users} = this.state;
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar title = "Recipe App"/>
        <Switch>
                <Route path='../home' component={App}/>
                <Route path="/recipes/add" component={AddRecipe}/>
                <Route path='/recipes' component={Recipes}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/recipe/:id' component={RecipeDetail}/>
                <Route path='/user/:id' component={User}/>
            </Switch>
      </div>
      </BrowserRouter>
    )
  
}

export default App;
