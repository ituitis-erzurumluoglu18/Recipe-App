import React, { Component } from 'react';
import {variables} from "../Variables";

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : {}
        }
    }

    reFreshList(url){
        fetch(variables.API_URL+url)
        .then(response => response.json())
        .then(data => {
                this.setState({user : data});
            });
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        const url = `user/${userId}`;
        this.reFreshList(url);
    }

    render() {
        const photoPath = variables.PHOTO_URL;
        const {user} = this.state;
        return (
            <div className="container">
              <br/>
              <div className="card">
                <h5 className="card-header"><strong>{user.Username}</strong></h5>
                <div className="card-body">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{paddingRight : "50px"}}>
                          <img width="260px" height="250px" 
                                                src={photoPath+user.PhotoUrl}
                                                alt="pic"/>
                        </td>
                        <td>
                          <h5 className="card-title">{"Name : " + user.Name}</h5>
                          <p className="card-text">{"Email : " + user.Email}</p> 
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-footer text-muted">
                  
                </div>
              </div>
            </div>
        )
        
    }
}

export default User;