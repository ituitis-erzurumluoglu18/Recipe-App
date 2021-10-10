import React, { Component } from 'react';
import {variables} from "../Variables";
import Ingredient from './Ingredient';
import {
  Link
} from "react-router-dom";

//import AddUser from './AddUser';
//import Button from '@material-ui/core/Button';

class RecipeDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipe : {},
            mapping : [],
            ingredients : [],
            deletedMapping : 0
        }
    }

    reFreshList(recipeUrl){
        fetch(variables.API_URL+recipeUrl)
        .then(response => response.json())
        .then(data => {
                this.setState({recipe : data});
            });
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        const recipeUrl = `recipes/${recipeId}`;
        const mappingUrl = `mapping/${recipeId}`;
        this.reFreshList(recipeUrl);
        this.getMapping(mappingUrl);
    }
    //componentDidMount(){
    //  const recipeId = this.props.match.params.id;
      //`http://localhost:27690/api/recipes/${recipeId}`
    //}

    getMapping(mappingUrl){
        fetch(variables.API_URL+mappingUrl)
        .then(response => response.json())
        .then(data => {
                this.setState({mapping : data});
                let ingredients_arr = [];
                this.state.mapping.map(map => ingredients_arr = [...ingredients_arr, map.IngredientID]);
                this.setState({ingredients : ingredients_arr});
                //this.state.mapping.map(map => this.getIngredient(`ingredients/${map.IngredientID.IngredientID}`));
            });
    }

    /* getIngredient(ingredientsUrl){
        fetch(variables.API_URL+ingredientsUrl)
        .then(response => response.json())
        .then(data => {
                let ingredients_arr = [...this.state.ingredients, data]
                this.setState({ingredients : ingredients_arr});
            });
    } */

    deleteAll(){
        if(window.confirm("Are you sure to delete?")){
            //this.deleteRecipe(this.state.mapping[0].RecipeID.RecipeID);
            let length = this.state.mapping.length;
            this.state.mapping.map(map => this.deleteMapping(map.MappingID, map.IngredientID.IngredientID, map.RecipeID.RecipeID, length));
            console.log("delete");
        }
    }

    deleteMapping(MappingID, IngredientID, RecipeID, length){
        fetch(variables.API_URL+"mapping/"+MappingID,{
            method : 'DELETE',
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
            //this.reFreshList();
            this.setState({deletedMapping : this.state.deletedMapping + 1});
            this.deleteIngredient(IngredientID);
            if (this.state.deletedMapping === length){this.deleteRecipe(RecipeID);}
        },(error) =>{
            alert("Failed");
            this.setState({deletedMapping : this.state.deletedMapping + 1});
            this.deleteIngredient(IngredientID);
            if (this.state.deletedMapping === length){this.deleteRecipe(RecipeID);}
        });
    }

    deleteIngredient(IngredientID){
        fetch(variables.API_URL+"ingredients/"+IngredientID,{
            method : 'DELETE',
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
            //this.reFreshList();
        },(error) =>{
            alert("Failed");
        });
    }

    deleteRecipe(RecipeID){
        fetch(variables.API_URL+"recipes/"+RecipeID,{
            method : 'DELETE',
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
            //this.reFreshList();
            this.props.history.push('/recipes');
        },(error) =>{
            alert("Failed");
        });
    }

    render() {
        const photoPath = variables.PHOTO_URL;
        const {recipe, ingredients} = this.state;
        //const owner = recipe.OwnerID;
        // const name = owner && owner.Name ? owner.Name : "Name";
        // const username = owner && owner.Username ? owner.Username : "Username";
        // const userId = owner && owner.UserID ? owner.UserID : 1;
        // const photoUrl = owner && owner.PhotoUrl ? owner.PhotoUrl : null

        return (
            <div className="container">
              <br/>
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <h1>Recipe Detail</h1>
                  </div>
                </div>
                <div className="level-right">
                  <p className="level-item">
                    <Link className="button" 
                    to={{ pathname : `/recipe/${this.props.match.params.id}/update`, state : {recipeId : this.props.match.params.id}}}>
                      <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                      </span>
                      </Link>
                  </p>
                  <p className="level-item">
                    <button className="button" type="button" onClick={() => this.deleteAll()}>
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
                <div className="card-footer text-muted">
                  <table className="card-text">
                    <tbody>
                      <tr>
                        <td colSpan="2"><h5 className="card-title">Ingredients</h5></td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <th style={{paddingLeft:"30px"}}>Portion</th>
                      </tr>
                      {
                        ingredients.map(ingredient => {
                          return(
                            <Ingredient
                              key={ingredient.IngredientID}
                              name={ingredient.Name}
                              portion={ingredient.Portion}
                            />
                          );
                        })
                      }
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
              <br/>
            </div>
        )
    }
}

export default RecipeDetail;