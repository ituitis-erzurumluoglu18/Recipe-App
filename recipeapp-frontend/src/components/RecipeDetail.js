import React, { Component } from 'react';
import {variables} from "../Variables";

// import {
//   Link
// } from "react-router-dom";
//import AddUser from './AddUser';
//import Button from '@material-ui/core/Button';

class RecipeDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipe : {}
        }
    }

    reFreshList(url){
        fetch(variables.API_URL+url)
        .then(response => response.json())
        .then(data => {
                this.setState({recipe : data});
            });
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        const url = `recipes/${recipeId}`;
        this.reFreshList(url);
    }
    //componentDidMount(){
    //  const recipeId = this.props.match.params.id;
      //`http://localhost:27690/api/recipes/${recipeId}`
    //}
    render() {
        const photoPath = variables.PHOTO_URL;
        const {recipe} = this.state;
        //const owner = recipe.OwnerID;
        // const name = owner && owner.Name ? owner.Name : "Name";
        // const username = owner && owner.Username ? owner.Username : "Username";
        // const userId = owner && owner.UserID ? owner.UserID : 1;
        // const photoUrl = owner && owner.PhotoUrl ? owner.PhotoUrl : null
        console.log(this.state);
        return (
            <div className="container">
              <br/>
              <div className="level">
                <div className="level-left">
                  <div class="level-item">
                    <h1>Recipe Detail</h1>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item">
                    <button class="button">
                      <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                      </span>
                    </button>
                  </p>
                  <p class="level-item">
                    <button class="button">
                      <span className="icon is-small">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </div>
              <div className="card">
                <h5 className="card-header"><strong>{recipe.Name}</strong></h5>
                <div className="card-body">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{paddingRight : "50px"}}>
                        <img width="260px" height="250px" 
                        src={photoPath+recipe.PhotoUrl}
                        alt="pic"/>
                        </td>
                        <td>
                          <h5 className="card-title">{recipe.Type + " - " + recipe.Duration + " min"}</h5>
                          <p className="card-text">{recipe.Process}</p> 
                        </td>
                      </tr>
                      {/* <tr>
                        <td colspan="2">

                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                {/* <div class="card-footer text-muted">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{paddingRight : "50px"}}>
                        <img width="160px" height="150px" 
                                                src={photoPath+photoUrl}
                                                alt="pic"/>
                        </td>
                        <td>
                          <p className="card-title">
                            <Link to={"/user/" + userId }>{name + " - " + username}</Link>
                          </p>
                          <p className="card-text">{owner && owner.Email ? owner.Email : "Email"}</p> 
                        </td>
                      </tr>
                       <tr>
                        <td colspan="2">
                        </td>
                      </tr> 
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
        )
    }
}

export default RecipeDetail;