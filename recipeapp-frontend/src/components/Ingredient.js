import React, { Component } from 'react'

class Ingredient extends Component {
    render() {
        const {name, portion} = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td style={{paddingLeft:"30px"}}>{portion}</td>
            </tr>
        )
    }
}

export default Ingredient;