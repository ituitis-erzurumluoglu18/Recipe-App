import React, { Component } from 'react'

const UserContext = React.createContext();

const reducer = (state, action) => {
    console.log("geldi2")
    switch (action.type) {
        case "DELETE_USER":
            console.log(action.payload)
            
            return{
                ...state,
                users : state.users.filter(user => action.payload !== user.id)
            }
    
        default:
            return state;
    }
}

export class UserProvider extends Component {
    state = {
        users : [
          {
            id : 1,
            name : "Ömür",
            department : "Computer engineering"
          },
          {
            id : 2,
            name : "Codename",
            department : "Game"
          }
        ],
        dispatch : action => {
            this.setState(state => reducer(state, action))
        }
    }
    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;

export default UserConsumer;