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
        return (
            <div>
                {
                    recipes.map(recipe => {
                        return(
                            <Recipe
                                key = {recipe.id}
                                ownerId = {recipe.ownerId}
                                name = {recipe.name}
                                type = {recipe.type}
                                photoUrl = {recipe.photoUrl}
                                duration = {recipe.duration}
                                process = {recipe.process}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
