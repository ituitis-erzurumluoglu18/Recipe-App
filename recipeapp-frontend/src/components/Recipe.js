import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
//import AddUser from './AddUser';
//import Button from '@material-ui/core/Button';

class Recipe extends Component {
    render() {
        console.log(this.props);
        const {ownerId, name, type, photoUrl, duration, process, id} = this.props;
        return (
          <Router>
            <div className="container">
              <br/>
              <div className="card">
                <h5 className="card-header"><strong>{name}</strong></h5>
                <div className="card-body">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{paddingRight : "50px"}}>
                          {photoUrl} Resim gelcek
                        </td>
                        <td>
                          <h5 className="card-title">{type + " - " + duration + " min"}</h5>
                          <p className="card-text">{process}</p>
                          {/* <Button component={AddUser} to={"/recipes/" + id}>Click Me</Button>
                          <Link className="button is-warning" to={"/recipes/" + id}>For More Detail</Link> */}
                          <a className="button is-warning" href={"/recipes/" + id}>For More Detail</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Switch>
                {/*  component={AddUser} */}
                <Route path={"/recipes/" + id}/>
              </Switch>
            </div>
          </Router>
        )
    }
}

export default Recipe;