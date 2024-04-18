import React, { Component } from 'react'
import "../../public/img/chair1.jpg"

export class Item extends Component {
  render() {
    return (
      <div className='item'>
        <img src={"../../public/img/chair1.jpg"} />
        <h2>{this.props.item.title}</h2>
        <p>{this.props.item.desc}</p>
        <b>{this.props.item.price}$</b>
        <div className='add-to-cart'>+</div>
      </div>
    )
  } 
}

export default Item