import React, { Component } from 'react';
import {variables} from "../Variables";
import Recipe from './Recipe';

export default class Recipes extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes : []
        }
    }

    reFreshList(){
        fetch(variables.API_URL+'recipes')
        .then(response => response.json())
        .then(data => {
                this.setState({recipes : data});
            });
    }

    componentDidMount() {
        this.reFreshList();
    }
    

    render() {
        const {recipes} = this.state;
        console.log(recipes);
        return (
            <div>
                {
                    recipes.map(recipe => {
                        return(
                            <Recipe
                                key = {recipe.RecipeID}
                                ownerId = {recipe.OwnerID}
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
        )
    }
}
