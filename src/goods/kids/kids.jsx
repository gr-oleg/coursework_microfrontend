import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Kids extends Component {
  render() {
    return (
      <main>
        {this.props.kids.map(el => (
            <Item item={el} key={el.id} onAdd={this.props.onAdd} />
        ))}
      </main>
    )
  }
}

export default Kids