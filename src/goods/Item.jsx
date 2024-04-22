import React, { Component } from 'react'
import './item.css'

export class Item extends Component {
  render() {
    const imgSrc = require("../../public/img/" + this.props.item.img);
    return (
      <div className='item'>
        <img src={imgSrc.default} />
        <h2>{this.props.item.name}</h2>
        <b>{this.props.item.price}$</b>
        <div className='add-to-cart' 
        onClick={() => this.props.onAdd(this.props.item)}>+</div>
      </div>
    )
  } 
}

export default Item