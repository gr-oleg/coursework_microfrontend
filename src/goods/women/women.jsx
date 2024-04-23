import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Women extends Component {
  onAdd = (item) => {
    const event = new CustomEvent('addToCart', { detail: item });
    window.dispatchEvent(event);
  }

  render() {
    return (
      <main>
        {this.props.women.map(el => (
            <Item item={el} key={el.id} onAdd={this.onAdd} />
        ))}
      </main>
    )
  }
}

export default Women