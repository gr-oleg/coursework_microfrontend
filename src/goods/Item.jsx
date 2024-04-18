import React, { Component } from 'react'
import './item.css'

export class Item extends Component {
  render() {
    const imgSrc = require("../../public/img/" + this.props.item.img);
    return (
      <div className='item'>
        <img src={imgSrc.default} />
        <h2>{this.props.item.name}</h2>
        <p>{this.props.item.desc}</p>
        <b>{this.props.item.price}$</b>
        <div className='add-to-cart'>+</div>
      </div>
    )
  } 
}

export default Item