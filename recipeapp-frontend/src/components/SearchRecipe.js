import React, { Component } from 'react';
import {variables} from "../Variables";
import Recipe from './Recipe';

class SearchRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes : [],
            ingredients : [],
            types : [],
            typeFilter : "All",
            ingredientsFilter : {}
        }
    }

    changeInput = (e) => {
        this.setState({
            typeFilter : e.target.value
        })
    }

    changeIngredientInput = (e) => {
        let a = {...this.state.ingredientsFilter}
        a[e.target.name] = e.target.checked
        this.setState({
            ingredientsFilter : a
        }) 
        /* this.setState({
            [e.target.name]: e.target.checked,
        });
        console.log(e.target.name)
        console.log(e.target.checked) */
        /* e.target.value ? console.log("aaa") : console.log("bbb")
        e.target.value ? e.target.value = false : e.target.value = true
        let a = {...this.state.ingredientsFilter}
        a[e.target.name] = e.target.value
        //e.target.value = true
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({
            ingredientsFilter : a
        }) */
    }

    reFreshIngredients(){
        fetch(variables.API_URL+'ingredients')
        .then(response => response.json())
        .then(data => {
            this.setState({ingredients : data});
            //let a = {}
            //this.state.ingredients.map(ingredient => a[ingredient] = false)
            //this.state.ingredients.map(ingredient => a.assign(ingredient) = false)
            //this.setState({ingredientsFilter : a});
        });
    }

    reFreshRecipes(){
        fetch(variables.API_URL+'recipes')
        .then(response => response.json())
        .then(data => {
            this.setState({recipes : data});
        });
    }

    reFreshTypes(){
        fetch(variables.API_URL+'recipes/types')
        .then(response => response.json())
        .then(data => {
            //console.log(data.Result);
            this.setState({types : data.Result});
        });
    }

    componentDidMount() {
        this.reFreshIngredients();
        this.reFreshRecipes();
        this.reFreshTypes();
    }

    searchRecipe(){
        let a = [this.state.typeFilter];
        //a = [...a, this.state.ingredientsFilter["Domates"]]
        Object.keys(this.state.ingredientsFilter).forEach(key => {
            a = this.state.ingredientsFilter[key] ? [...a, key] : [...a]
        });
        console.log(JSON.stringify(a))
        fetch(variables.API_URL + "recipes/search",{
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(a)
        })
        .then(response => response.json())
        .then(data => {
            console.log("data");
            this.setState({recipes : data});
            
        })
        .then(result => {
            alert("Successed");
        },(error) => {
            alert("Failedr");
        });
    }

    render() {
        const {recipes, ingredients, types} = this.state;
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Filter</h5>
                        <p className="card-text"> 
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <br/>
                            <div className="select is-normal is-link">
                              <select 
                              name="type" 
                              id="type" 
                              onChange={this.changeInput}>
                                <option value="All">All</option>
                                {
                                    types.map( type => {
                                        return(
                                            <option value={type}>{type}</option>
                                        )
                                    })
                                }
                              </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">Ingredients</label>
                            <br/>
                            {
                                ingredients.map(ingredient => {
                                    return(
                                        <label class="checkbox">
                                          <input type="checkbox"
                                          name={ingredient.Name} 
                                          id={ingredient.Name} 
                                          //checked={this.state.check}
                                          //value={false}
                                          /* value="{ingredient.Name}" */
                                          onClick={this.changeIngredientInput}/>
                                          &nbsp; {ingredient.Name} &nbsp; &nbsp;
                                        </label>
                                    )
                                })
                            }
                        </div>
                        <button className="btn btn-danger" type="button" onClick={() => this.searchRecipe()}>Search</button>
                        </p>
                    </div>
                </div>
                <div>
                    {
                        recipes.map(recipe => {
                            return(
                                <Recipe
                                    key = {recipe.RecipeID}
                                    owner = {recipe.OwnerID}
                                    name = {recipe.Name}
                                    type = {recipe.Type}
                                    photoUrl = {recipe.PhotoUrl}
                                    duration = {recipe.Duration}
                                    process = {recipe.Process}
                                    id = {recipe.RecipeID}
                                />
                            )
                        })
                    }
                </div>
                <br/>
            </div>
        )
    }
}

export default SearchRecipe;