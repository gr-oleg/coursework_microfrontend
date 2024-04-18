import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Sofas extends Component {
  render() {
    return (
      <main>
        {this.props.sofas.map(el => (
            <Item item={el} key={el.id} />
        ))}
      </main>
    )
  }
}

export default Sofas