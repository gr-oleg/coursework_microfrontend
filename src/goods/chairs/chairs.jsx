import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Chairs extends Component {
  render() {
    return (
      <main>
        {this.props.chairs.map(el => (
            <Item item={el} key={el.id} />
        ))}
      </main>
    )
  }
}

export default Chairs