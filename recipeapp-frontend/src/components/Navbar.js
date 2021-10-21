import React from "react";
import PropTypes from "prop-types";
import {NavLink} from 'react-router-dom';
//import AddUser from "./AddUser";


function Navbar(props){
    return(
        <div>
          <header>
            <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
				      <div className="navbar-brand">
                <NavLink className="navbar-item" to="../home">
                  <h2><strong>{props.title}</strong></h2>
                </NavLink>
			  
				        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="/#">
				        	<span aria-hidden="true"></span>
				        	<span aria-hidden="true"></span>
				        	<span aria-hidden="true"></span>
				        </a>
				      </div>
			  
				      <div id="navbarBasicExample" className="navbar-menu">
				        <div className="navbar-start">
                  <NavLink className="navbar-item" to="../home">
                    <strong>Home</strong>
                  </NavLink>
			  
				        	<NavLink className="navbar-item" to="/recipes">
                    <strong>Recipes</strong>
                  </NavLink>

                  <NavLink className="navbar-item" to="/recipes/add">
                    <strong>Add Recipe</strong>
                  </NavLink>

                  <NavLink className="navbar-item" to="/recipes/search">
                    <strong>Search</strong>
                  </NavLink>
				        </div>
				  
				        {/* <div className="navbar-end">
					        <div className="navbar-item">
					          <div className="buttons">
                      <NavLink className="button is-danger" to="/register">
                        <strong>Sign in</strong>
                      </NavLink>
                      <NavLink className="button is-danger is-light is-focused" to="/login">
                        <strong>Log in</strong>
                      </NavLink>
					          </div>
					        </div>
				        </div> */}
				      </div>
			      </nav>
		      </header>
        </div>
    )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title : "Default App"
}

export default Navbar;