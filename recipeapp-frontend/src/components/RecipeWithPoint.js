import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import {variables} from "../Variables";

//import AddUser from './AddUser';
//import Button from '@material-ui/core/Button';

class RecipeWithPoint extends Component {
    render() {
        const photoPath = variables.PHOTO_URL;
        console.log(this.props);
        const {name, type, photoUrl, duration, process, id, point} = this.props;
        return (
            <div className="container">
              <br/>
              <div className="card">
                <h5 className="card-header"><strong>{name}</strong></h5>
                <div className="card-body">
                  <table>
                    <tbody>
                      <tr style={{width : "%100"}}>
                        <td style={{width:"20%", paddingRight:"50px"}}>
                        <img width="160px" height="150px" 
                                                src={photoPath+photoUrl}
                                                alt="pic"/>
                        </td>
                        <td style={{width:"65%"}}>
                          <h5 className="card-title">{type + " - " + duration + " min"}</h5>
                          <p className="card-text">{process.substring(0, 150)}...</p>
                          {/* <Button component={AddUser} to={"/recipes/" + id}>Click Me</Button>*/}
                          <Link className="button is-warning" to={"/recipe/" + id }>For More Detail</Link> 
                        </td>
                        <td style={{width:"15%", paddingTop:"20px", textAlign:"right", fontSize:"40px"}}>
                            {point}%
                            {/* ,justifyContent:"center", alignContent:"center" paddingLeft:"200px"*/}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        )
    }
}

export default RecipeWithPoint;