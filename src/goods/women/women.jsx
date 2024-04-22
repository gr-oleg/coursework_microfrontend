import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Women extends Component {
  render() {
    return (
      <main>
        {this.props.women.map(el => (
            <Item item={el} key={el.id} onAdd={this.props.onAdd} />
        ))}
      </main>
    )
  }
}

export default Women