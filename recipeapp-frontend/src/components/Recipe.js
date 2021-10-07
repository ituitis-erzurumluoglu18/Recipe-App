import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import {variables} from "../Variables";

//import AddUser from './AddUser';
//import Button from '@material-ui/core/Button';

class Recipe extends Component {
    render() {
        const photoPath = variables.PHOTO_URL;
        console.log(this.props);
        const {name, type, photoUrl, duration, process, id} = this.props;
        return (
            <div className="container">
              <br/>
              <div className="card">
                <h5 className="card-header"><strong>{name}</strong></h5>
                <div className="card-body">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{paddingRight : "50px"}}>
                        <img width="160px" height="150px" 
                                                src={photoPath+photoUrl}
                                                alt="pic"/>
                        </td>
                        <td>
                          <h5 className="card-title">{type + " - " + duration + " min"}</h5>
                          <p className="card-text">{process}</p>
                          {/* <Button component={AddUser} to={"/recipes/" + id}>Click Me</Button>*/}
                          <Link className="button is-warning" to={"/recipe/" + id }>For More Detail</Link> 
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

export default Recipe;