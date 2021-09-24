import React, { Component } from 'react';
import PropTypes from 'prop-types'
import UserConsumer from "../context";

class User extends Component {
    state = {
        isVisible : false
    }
    constructor(props){
        super(props);
        // this.state = {
        //     isVisible : false
        // }
        this.onClickEvent = this.onClickEvent.bind(this)
    }
    onClickEvent = (number, e) => {
        // console.log(number);
        this.setState({
            isVisible : !this.state.isVisible
        })
    }

    onDeleteUser = (dispatch, e) => {
        const {id} = this.props;
        dispatch({type : "DELETE_USER", payload : id});
        console.log("geldi")
    }

    render() {
        const {name, department} = this.props;
        const {isVisible} = this.state;
        return(
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline" onClick={this.onClickEvent.bind(this)}>{name}</h4>
                                        <i className="fas fa-trash-alt" style={{cursor : "pointer"}} onClick={this.onDeleteUser.bind(this, dispatch)}></i>
                                    </div>
                                    { isVisible ? 
                                    <div className="card-body">
                                        <p className="card-text">Department : {department}</p>
                                    </div> : null
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
        
    }
}

User.defaultProps = {
    name : "Bilgi yok",
    department : "Bilgi yok",
    id : 0
}

User.propTypes = {
    name : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
    id : PropTypes.number.isRequired
}

export default User;