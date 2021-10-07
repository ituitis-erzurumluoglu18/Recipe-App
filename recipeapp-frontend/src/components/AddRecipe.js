import React, { Component } from 'react'
import {variables} from "../Variables";
import AddIngredient from './AddIngredient';

class AddRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {},
            name : "",
            type : "Lunch",
            duration : 0,
            process : "",
            photoUrl : "recipe.jpg",
            photoPath : variables.PHOTO_URL,
            ownerId : {"Name":"ömür","Username":"eoğlu","Email":"sdgfdg","Password":"sgdfgfd","PhotoUrl":null,"UserID":1},
            ingredients : [{name: "",
                            portion : "",
                            recipeId : 0,
                            index : 0}]
        }
    }

    reFreshList(){
        fetch(variables.API_URL+'recipes/add')
        .then(response => response.json())
        .then(data => {
                this.setState({data : data});
            });
    }

    componentDidMount() {
        //this.reFreshList();
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    changeIngredientsInputName = (id, e) => {
        let ingredients_arr = [...this.state.ingredients];
        let item = {...ingredients_arr[id]};
        item.name = e.target.value;
        ingredients_arr[id] = item;
        this.setState({
            ingredients : ingredients_arr
            //ingredients : [...ingredients, ]
            //ingredients : ingredients.map(ing => ing.index==id ? ing.set([e.target.name],e.target.value) : ing)
            //ingredients[id].[e.target.name] : e.target.value
        });
    }

    changeIngredientsInputPortion = (id, e) => {
        let ingredients_arr = [...this.state.ingredients];
        let item = {...ingredients_arr[id]};
        item.portion = e.target.value;
        ingredients_arr[id] = item;
        this.setState({
            ingredients : ingredients_arr
        });
    }

    addIngredientComponent = (e) => {
        let length = this.state.ingredients.length;
        this.setState({
            ingredients : [...this.state.ingredients,
                {name: "",
                portion : "",
                recipeId : 0,
                index : length}]
        });
    }

    deleteIngredientComponent = (e) => {
        let length = this.state.ingredients.length;
        length = length - 1;
        this.setState({
            ingredients : this.state.ingredients.filter(ing => length !== ing.index)
        });
    }

    createRecipeAndIngredients(){
        this.createRecipe();
        this.createIngredients();
    }

    createRecipe(){
        fetch(variables.API_URL + "recipes/add",{
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : this.state.name,
                type : this.state.type,
                duration : this.state.duration,
                process : this.state.process,
                photoUrl : this.state.photoUrl,
                ownerId : this.state.ownerId,
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert(result);
            this.setState({data : result});
            //this.reFreshList();
            //console.log(this.state.data);
        },(error) => {
            alert("Failed");
        })
    }

    createIngredients(){

    }

    imageUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);
        fetch(variables.API_URL+"recipes/savefile", {
            method : "POST",
            body : formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({photoUrl : data});
        })
    }

    render() {
        const {ingredients, name, duration, process, photoUrl, photoPath} = this.state;
        return (
            <div className="container">
                <br/>
                <div className="modal-login" style={{width:"700px", height:"1000px"}}>
                    <div className="card">
                        <div className="card-header">
                            <h4>Recipe Add Form</h4>
                        </div>
                        <div className="card-body">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{width:"400px", paddingRight:"25px"}}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <div className="field">
                                                    <p className="control has-icons-left">
                                                        <input type="text" 
                                                        name="name" 
                                                        id="id" 
                                                        placeholder="Enter Name" 
                                                        required="required"
                                                        className="input" 
                                                        value={name}
                                                        onChange={this.changeInput}/>
                                                        <span className="icon is-small is-left">
                                                            <i className="fas fa-utensils"></i>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="duration">Duration</label>
                                                <div className="field">
                                                    <p className="control has-icons-left">
                                                        <input type="number" 
                                                        name="duration" 
                                                        id="duration" 
                                                        placeholder="Enter Duration (min)" 
                                                        required="required"
                                                        className="input"
                                                        value={duration}
                                                        onChange={this.changeInput}/>
                                                        <span className="icon is-small is-left">
                                                            <i className="far fa-clock"></i>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="type">Type</label>
                                                <br/>
                                                <div className="select is-normal is-link">
                                                  <select 
                                                  name="type" 
                                                  id="type" 
                                                  placeholder="Enter Email" 
                                                  required="required"
                                                  onChange={this.changeInput}>
                                                    <option value="Lunch">Lunch</option>
                                                    <option value="Dinner">Dinner</option>
                                                  </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="process">Process</label>
                                                <div className="field">
                                                    <textarea className="textarea" 
                                                    name="process" 
                                                    id="process" 
                                                    placeholder="Enter Process" 
                                                    required="required"
                                                    value={process}
                                                    onChange={this.changeInput}>
                                                    </textarea>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <br/>
                                            <img width="260px" height="250px" 
                                            src={photoPath+photoUrl}
                                            alt="recipe"/>
                                            <input className="m-2" type="file"
                                            onChange={this.imageUpload}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <label className="checkbox">
                              <input type="checkbox" />
                              Remember me
                            </label> */}
                            {/*  recipeId={data & data.RecipeID ? data.RecipeID : null} */}
                            <div className="form-group">
                                <label htmlFor="ingredients">Ingredients</label>
                                <br/>
                                <button class="button is-small" onClick={this.addIngredientComponent}>
                                  <span className="icon">
                                    <i className="fas fa-plus"></i>
                                  </span>
                                </button>
                                <button class="button is-small" onClick={this.deleteIngredientComponent}>
                                  <span className="icon is-small">
                                    <i className="fas fa-minus"></i>
                                  </span>
                                </button>
                                {
                                    ingredients.map(item => {
                                        return(
                                            <div className="field">
                                                <p className="control">
                                                    <input type="text" 
                                                    name={`name${item.index}`}
                                                    id={`name${item.index}`}  
                                                    placeholder="Enter Name" 
                                                    required="required"
                                                    className="input"
                                                    style={{width:"200px"}} 
                                                    value={item.name}
                                                    onChange={this.changeIngredientsInputName.bind(this, item.index)}/>
                                                    {/* `ingredients[${item.index}].portion` */}
                                                    <input type="text" 
                                                    name={`portion${item.index}`}  
                                                    id={`portion${item.index}`} 
                                                    placeholder="Enter Portion" 
                                                    required="required"
                                                    className="input" 
                                                    style={{width:"250px",marginLeft:"20px"}} 
                                                    value={item.portion}
                                                    onChange={this.changeIngredientsInputPortion.bind(this, item.index)}/>
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <form action="/recipes" onSubmit={()=>this.createRecipeAndIngredients()} name="register">
                                <button className="btn btn-danger btn-block" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default AddRecipe;