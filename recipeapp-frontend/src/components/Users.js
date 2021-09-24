import React, { Component } from 'react'
import User from "./User";
import UserConsumer from "../context";

class Users extends Component {
    render() {
        return(
            <UserConsumer>
                {
                    value => {
                        const {users} = value;
                        return (
                            <div>
                                {
                                    users.map(user => {
                                        return(
                                            <User
                                                key = {user.id}
                                                name = {user.name}
                                                department = {user.department}
                                                id = {user.id}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )


        // const {users} = this.props;
        
    }
}

export default Users;