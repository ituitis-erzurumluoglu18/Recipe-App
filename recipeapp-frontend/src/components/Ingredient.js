import React, { Component } from 'react'

class Ingredient extends Component {
    render() {
        const {name} = this.props; //, portion
        return (
            <tr>
                <td>{name}</td>
                {/* <td style={{paddingLeft:"30px"}}>{portion}</td> */}
            </tr>
        )
    }
}

export default Ingredient;