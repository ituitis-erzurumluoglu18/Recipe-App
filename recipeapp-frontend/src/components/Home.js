import React, { Component } from 'react';
import {variables} from "../Variables";
import Recipe from './Recipe';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes : {}
        }
    }

    reFreshList(){
        fetch(variables.API_URL+'home')
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
                <Recipe
                    key = {recipes.RecipeID}
                    owner = {recipes.OwnerID}
                    name = {recipes.Name}
                    type = {recipes.Type}
                    photoUrl = {recipes.PhotoUrl}
                    duration = {recipes.Duration}
                    process = {recipes.Process}
                    id = {recipes.RecipeID}
                />
            </div>
        )
    }
}

export default Home;