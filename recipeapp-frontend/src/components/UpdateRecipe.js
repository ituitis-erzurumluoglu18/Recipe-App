import React, { Component } from 'react';
import {variables} from "../Variables";

class UpdateRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipe : {},
            mapping : [],
            ingredients : [],
            old_ingredients : []
        }
    }

    /* componentDidMount() {
        let ingredients_arr = [...this.props.location.state.ingredients];
        let key = 0;
        ingredients_arr.map(ingredient => ingredient.key = key++);
        this.setState({
            recipe : this.props.location.state.recipe,
            mapping : this.props.location.state.mapping,
            ingredients : ingredients_arr,
            old_ingredients : ingredients_arr
        })
    } */

    reFreshList(recipeUrl){
        fetch(variables.API_URL+recipeUrl)
        .then(response => response.json())
        .then(data => {
                this.setState({recipe : data});
            });
    }

    componentDidMount() {
        this.getAllValues();
    }

    getAllValues(){
        const recipeId = this.props.location.state.recipeId;
        console.log(this.props.location.state);
        const recipeUrl = `recipes/${recipeId}`;
        const mappingUrl = `mapping/${recipeId}`;
        this.reFreshList(recipeUrl);
        this.getMapping(mappingUrl);
    }

    getMapping(mappingUrl){
        fetch(variables.API_URL+mappingUrl)
        .then(response => response.json())
        .then(data => {
                this.setState({mapping : data});
                let ingredients_arr = [];
                this.state.mapping.map(map => ingredients_arr = [...ingredients_arr, map.IngredientID]);
                let key = 0;
                ingredients_arr.map(ingredient => ingredient.key = key++);
                this.setState({
                    ingredients : ingredients_arr,
                    old_ingredients : ingredients_arr
                });
            });
    }

    changeInput = (e) => {
        let recipe = {...this.state.recipe};
        recipe[e.target.name]  = e.target.value
        this.setState({
            recipe : recipe
        })
    }

    changeIngredientsInputName = (id, e) => {
        let ingredients_arr = [...this.state.ingredients];
        let item = {...ingredients_arr[id]};
        item.Name = e.target.value;
        ingredients_arr[id] = item;
        this.setState({
            ingredients : ingredients_arr,
            old_ingredients : ingredients_arr
        });
        let ingredientsold_arr = [...this.state.old_ingredients];
        let itemold = {...ingredientsold_arr[id]};
        itemold.Name = e.target.value;
        ingredientsold_arr[id] = itemold;
        this.setState({
            old_ingredients : ingredientsold_arr
        });
    }

    changeIngredientsInputPortion = (id, e) => {
        let ingredients_arr = [...this.state.ingredients];
        let item = {...ingredients_arr[id]};
        item.Portion = e.target.value;
        ingredients_arr[id] = item;
        this.setState({
            ingredients : ingredients_arr,
        });
        let ingredientsold_arr = [...this.state.old_ingredients];
        let itemold = {...ingredientsold_arr[id]};
        itemold.Portion = e.target.value;
        ingredientsold_arr[id] = itemold;
        this.setState({
            old_ingredients : ingredientsold_arr
        });
    }

    addIngredientComponent = (e) => {
        let length = this.state.ingredients.length;
        let old_length = this.state.old_ingredients.length;
        if(old_length > length){
            let ingredients_arr = [...this.state.ingredients, this.state.old_ingredients[length]];
            this.setState({ingredients : ingredients_arr});
        }
        else{
            this.setState({
                ingredients : [...this.state.ingredients,
                    {Name: "",
                    key : length}],
                old_ingredients : [...this.state.old_ingredients,
                    {Name: "",
                    key : length}]
            });
        }
    }

    deleteIngredientComponent = (e) => {
        let length = this.state.ingredients.length;
        length = length - 1;
        this.setState({
            ingredients : this.state.ingredients.filter(ing => length !== ing.key)
        });
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
            let recipe = {...this.state.recipe};
            recipe.PhotoUrl = data;
            this.setState({
                recipe : recipe
            })
        })
    }

    updateAllRecipe(){
        this.updateRecipe();
        this.state.ingredients.forEach(ingredient => {
            ingredient.IngredientID === undefined ?
            this.createIngredient(ingredient) :
            this.updateIngredient(ingredient)
        });
    }

    updateRecipe(){
        fetch(variables.API_URL + "recipes",{
            method : "PUT",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(this.state.recipe)
        })
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            alert("Successed1");
        },(error) => {
            alert("Successed2");
        })
    }

    createIngredient(ingredient){
        fetch(variables.API_URL + "ingredients",{
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(ingredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log("dataing");
            console.log(data)
            this.createMapping({
                recipeId : this.state.recipe,
                ingredientId : data
            })
        })
        .then(result => {
            alert(result);
        },(error) => {
            alert("Failed");
        })
    }

    updateIngredient(ingredient){
        var mappingID = 0;
        this.state.mapping.forEach(map => {
            if (map.IngredientID.IngredientID === ingredient.IngredientID) {
                mappingID = map.MappingID;
            }
        })
        fetch(variables.API_URL + "ingredients",{
            method : "PUT",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(ingredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log("update ingre");
            console.log(data);
            this.updateMapping({
                MappingID : mappingID,
                recipeId : this.state.recipe,
                ingredientId : data
            });
        })
        .then(result => {
            //console.log(result);
            //alert(result);
            if(this.state.ingredients.key === (this.state.ingredients.length - 1)){
                this.getAllValues();
            }
            this.props.history.push(`/recipe/${this.state.recipe.RecipeID}`);
        },(error) => {
            //alert("Failed");
            this.props.history.push(`/recipe/${this.state.recipe.RecipeID}`);
        })
    }

    deleteIngredient(IngredientID){
        console.log("ingredientsid " + IngredientID);
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
            this.setState({
                ingredients : this.state.ingredients.filter(ing => IngredientID !== ing.IngredientID),
                old_ingredients : this.state.old_ingredients.filter(ing => IngredientID !== ing.IngredientID)
            });
        },(error) =>{
            alert("Failed");
        });
    }

    createMapping(mapping){
        console.log("mapping")
        fetch(variables.API_URL + "mapping",{
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(mapping)
        })
        .then(response => response.json())
        .then(data => {
            console.log("datamapping");
            console.log(data);
        })
        .then(result => {
            //alert(result);
            this.props.history.push(`/recipe/${this.state.recipe.RecipeID}`);
        },(error) => {
            //alert("Failed");
            this.props.history.push(`/recipe/${this.state.recipe.RecipeID}`);
        })
    }

    updateMapping(mapping){
        fetch(variables.API_URL + "mapping",{
            method : "PUT",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(mapping)
        })
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            //alert(result);
            /* if(this.state.ingredients.key === (this.state.ingredients.length - 1)){
                this.getAllValues();
            } */
            //this.props.history.push(`/recipe/${this.state.recipe.RecipeID}`);
        },(error) => {
            //alert("Failed");
            //this.props.history.push(`/recipe/${this.state.recipe.RecipeID}`);
        })
    }

    deleteMapping(IngredientID){
        var mappingID = 0;
        this.state.mapping.forEach(map => {
            if (map.IngredientID.IngredientID === IngredientID) {
                mappingID = map.MappingID;
            }
        })
        console.log("delete ing " + IngredientID);
        /* for (const map in this.state.mapping) {
            var val = map & map.IngredientID ? map.IngredientID : null;
            console.log(this.state.mapping);
            if (val.IngredientID === IngredientID) {
                var mappingID = map.MappingID;
            }
        } */
        //console.log(mappingID);
        //console.log("deleteMapping start");
        fetch(variables.API_URL+"mapping/"+mappingID,{
            method : 'DELETE',
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
            this.deleteIngredient(IngredientID);
        },(error) =>{
            alert("Failed");
            this.deleteIngredient(IngredientID);
        });
    }

    render() {
        const {recipe, ingredients} = this.state;
        const photoPath = variables.PHOTO_URL;
        return (
            <div className="container">
                <br/>
                <div style={{marginRight : "200px", marginLeft : "200px"}}>
                    <div className="card">
                        <div className="card-header">
                            <h4>Recipe Update Form</h4>
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
                                                        name="Name" 
                                                        id="id" 
                                                        placeholder="Enter Name" 
                                                        required="required"
                                                        className="input" 
                                                        value={recipe.Name}
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
                                                        name="Duration" 
                                                        id="duration" 
                                                        placeholder="Enter Duration (min)" 
                                                        required="required"
                                                        className="input"
                                                        value={recipe.Duration}
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
                                                  name="Type" 
                                                  id="type" 
                                                  placeholder="Enter Email" 
                                                  required="required"
                                                  onChange={this.changeInput}>
                                                    <option value="Zeytinyağlı">Zeytinyağlı</option>
                                                    <option value="Çorba">Çorba</option>
                                                    <option value="Tatlı">Tatlı</option>
                                                    <option value="Et yemeği">Et yemeği</option>
                                                    <option value="Sulu yemek">Sulu yemek</option>
                                                    <option value="Salata">Salata</option>
                                                    <option value="Sebze yemeği">Sebze yemeği</option>
                                                  </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="process">Process</label>
                                                <div className="field">
                                                    <textarea className="textarea" 
                                                    name="Process" 
                                                    id="process" 
                                                    placeholder="Enter Process" 
                                                    required="required"
                                                    value={recipe.Process}
                                                    onChange={this.changeInput}>
                                                    </textarea>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <br/>
                                            <img width="260px" height="250px" 
                                            src={photoPath+recipe.PhotoUrl}
                                            alt="recipe"/>
                                            <input className="m-2" type="file"
                                            onChange={this.imageUpload}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-group">
                                <label htmlFor="ingredients">Ingredients</label>
                                <br/>
                                <button className="button is-small" onClick={this.addIngredientComponent}>
                                  <span className="icon">
                                    <i className="fas fa-plus"></i>
                                  </span>
                                </button>
                                <button className="button is-small" onClick={this.deleteIngredientComponent}>
                                  <span className="icon is-small">
                                    <i className="fas fa-minus"></i>
                                  </span>
                                </button>
                                {
                                    ingredients.map(item => {
                                        return(
                                            <div className="field" key={item.key}>
                                                <p className="control">
                                                    <input type="text" 
                                                    name={`name${item.key}`}
                                                    id={`name${item.key}`}  
                                                    placeholder="Enter Name" 
                                                    required="required"
                                                    className="input"
                                                    style={{width:"200px"}} 
                                                    value={item.Name}
                                                    onChange={this.changeIngredientsInputName.bind(this, item.key)}/>
                                                    {/* `ingredients[${item.index}].portion` */}
                                                    {/* <input type="text" 
                                                    name={`portion${item.key}`}  
                                                    id={`portion${item.key}`} 
                                                    placeholder="Enter Portion" 
                                                    required="required"
                                                    className="input" 
                                                    style={{width:"250px",marginLeft:"20px"}} 
                                                    value={item.Portion}
                                                    onChange={this.changeIngredientsInputPortion.bind(this, item.key)}/> */}
                                                    <button className="button" type="button" onClick={this.deleteMapping.bind(this, item.IngredientID)}>
                                                      <span className="icon is-small">
                                                        <i className="fas fa-trash-alt"></i>
                                                      </span>
                                                    </button>
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div><button className="btn btn-danger btn-block" type="button" onClick={() => this.updateAllRecipe()}>Update Recipe</button>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default UpdateRecipe;