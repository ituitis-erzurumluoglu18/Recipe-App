import React, { Component } from 'react'

class AddUser extends Component {
    state = {
        name : "",
        department : ""
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // changeName = (e) => {
    //     this.setState({
    //         name : e.target.value
    //     })
    // }

    // changeDepartment = (e) => {
    //     this.setState({
    //         department : e.target.value
    //     })
    // }

    render() {
        const {name, department} = this.state;
        return (
            <div className="col-md-8 mb-4">
                <div className="card">
                    <div className="card-header">
                        <h4>Add User Form</h4>
                    </div>
                    <div className="card-body">
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" 
                                name="name" 
                                id="id" 
                                placeholder="Enter Name" 
                                className="form-control" 
                                value={name}
                                onChange={this.changeInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <input type="text" 
                                name="department" 
                                id="department" 
                                placeholder="Enter Department" 
                                className="form-control"
                                value={department}
                                onChange={this.changeInput}/>
                            </div>
                            <button className="btn btn-danger btn-block" type="submit">Add User</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUser;