import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Men extends Component {
  render() {
    return (
      <main>
        {this.props.men.map(el => (
            <Item item={el} key={el.id} onAdd={this.props.onAdd} />
        ))}
      </main>
    )
  }
}

export default Men