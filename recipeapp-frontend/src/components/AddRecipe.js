import React, { Component } from 'react'
import {variables} from "../Variables";


class AddRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            getData : {},
            getRecipe : {},
            getIngredients : [],
            name : "",
            type : "Zeytinyağlı",
            duration : 0,
            process : "",
            photoUrl : "recipe.jpg",
            photoPath : variables.PHOTO_URL,
            ownerId : {"Name":"ömür","Username":"ömür","Email":"a@a","Password":"a","PhotoUrl":"profile.png","UserID":1},
            ingredients : [{name: "",
                            portion : "",
                            key : 0}]
        }
    }

    reFreshList(){
        fetch(variables.API_URL+'recipes/add')
        .then(response => response.json())
        .then(data => {
                this.setState({getData : data});
            });
    }

    componentDidMount() {
        this.reFreshList();
        // console.log("geldi")
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
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
                key : length}]
        });
    }

    deleteIngredientComponent = (e) => {
        let length = this.state.ingredients.length;
        length = length - 1;
        this.setState({
            ingredients : this.state.ingredients.filter(ing => length !== ing.key)
        });
    }

    //createRecipeAndIngredients(){
        //this.createRecipe();
        //console.log("createRecipeAndIngredients, result")
        //console.log(result);
        //let recipeId = this.state.data.RecipeID;
        /* let ingredients_arr = [...this.state.ingredients];
        ingredients_arr.map(ing => ing.recipeId = recipeId);
        //let item = {...ingredients_arr[id]};
        //item.portion = e.target.value;
        //ingredients_arr[id] = item;
        this.setState({
            ingredients : ingredients_arr
        }); */
        /* this.state.ingredients.map(ing => this.createIngredients({
            name: ing.name,
            portion : ing.portion})); */

        //this.setState({getData : result});
        //console.log("this.state.getData");
        //console.log(this.state.getData);
        
        /* this.state.getIngredients.map(ing => this.createMapping({
            recipeId : this.state.getRecipe,
            ingredientId : ing
        })); */
    //}

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
        .then(data => {
            console.log("datarec");
            //this.setState({getData : data});
            this.setState({getRecipe : data});
            console.log(this.state.getRecipe);
            this.state.ingredients.map(ing => this.createIngredients({
                name: ing.name,
                portion : ing.portion}));
        })
        .then(result => {
            alert("Successed");
            //return result;
            //this.reFreshList();
        },(error) => {
            alert("Failedr");
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
            //console.log(result);
            //alert(result);
            this.props.history.push('/recipes');
        },(error) => {
            alert("Failedm");
            this.props.history.push('/recipes');
        })
    }

    createIngredients(ingredient){
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
                recipeId : this.state.getRecipe,
                ingredientId : data
            })
            /* var ings = [...this.state.getIngredients, data];
            //this.setState({getData : data});
            this.setState({getIngredients : ings});
            console.log(this.state.getIngredients); */

        })
        .then(result => {
            //console.log(result);
            //alert(result);
        },(error) => {
            alert("Failedi");
        })
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
                <div style={{marginRight : "200px", marginLeft : "200px"}}>
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
                                                    value={item.name}
                                                    onChange={this.changeIngredientsInputName.bind(this, item.key)}/>
                                                    {/* `ingredients[${item.index}].portion` */}
                                                    {/* <input type="text" 
                                                    name={`portion${item.key}`}  
                                                    id={`portion${item.key}`} 
                                                    placeholder="Enter Portion" 
                                                    required="required"
                                                    className="input" 
                                                    style={{width:"250px",marginLeft:"20px"}} 
                                                    value={item.portion}
                                                    onChange={this.changeIngredientsInputPortion.bind(this, item.key)}/> */}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* <Link to={"/recipes"}><button className="btn btn-danger btn-block" type="button" onClick={() => this.createRecipeAndIngredients()}>Add Recipe</button></Link> */}
                            <button className="btn btn-danger btn-block" type="button" onClick={() => this.createRecipe()}>Add Recipe</button>
                            {/* <form action="/recipes" onSubmit={() => this.createRecipeAndIngredients()} name="register">
                                <button className="btn btn-danger btn-block" type="submit">Register</button>
                            </form> */}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default AddRecipe;