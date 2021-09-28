import React, { Component } from 'react'

const UserContext = React.createContext();

const reducer = (state, action) => {
    console.log("geldi2")
    switch (action.type) {
        case "DELETE_USER":
            return{
                ...state,
                users : state.users.filter(user => action.payload !== user.id)
            }
        case "ADD_USER":
            return{
                ...state,
                users : [...state.users, action.payload]
            }
        default:
            return state;
    }
}

export class UserProvider extends Component {
    state = {
        users : [
          {
            id : "uniq1",
            name : "Ömür",
            department : "Computer engineering"
          },
          {
            id : "uniq2",
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