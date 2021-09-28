import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import App from "../App";
import AddUser from "./AddUser";
import Recipes from "./Recipes";

function Navbar(props){
    return(
        <BrowserRouter>
        <div>
            <header>
            <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
                  <NavLink className="navbar-item" to="../api/home">
                    <h2>{props.title}</h2>
                  </NavLink>
			  
				  <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="/#">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				  </a>
				</div>
			  
				<div id="navbarBasicExample" className="navbar-menu">
				  <div className="navbar-start">
                    <NavLink className="navbar-item" to="../api/home">
                        Home
                    </NavLink>
			  
					<NavLink className="navbar-item" to="/recipes">
                        Recipes
                    </NavLink>
			  
				</div>
				  
				  <div className="navbar-end">
					<div className="navbar-item">
					  <div className="buttons">
                        <NavLink className="button is-danger" to="/register">
                          <strong>Sign up</strong>
                        </NavLink>
						<a className="button is-danger is-light is-focused" href="/#">
						  Log in
						</a>
					  </div>
					</div>
				  </div>
				</div>
			</nav>
            <Switch>
                <Route path='../api/home' component={App}/>
                <Route path='/recipes' component={Recipes}/>
                <Route path='/register' component={AddUser}/>
            </Switch>
		    </header>
        </div>
        </BrowserRouter>
    )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title : "Default App"
}

export default Navbar;