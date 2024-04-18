import React, { Component } from 'react'
import Item from '../Item.jsx'

export class Tables extends Component {
  render() {
    return (
      <main>
        {this.props.tables.map(el => (
            <Item item={el} key={el.id} />
        ))}
      </main>
    )
  }
}

export default Tables