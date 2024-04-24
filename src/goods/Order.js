import React, { Component } from 'react'
import { FaTrash } from 'react-icons/fa';

export class Order extends Component {
  render() {
    const imgSrc = require("../../public/img/" + this.props.item.img);
    return (
      <div className='item'>
        <img src={imgSrc.default} />
        <h2>{this.props.item.name}</h2>
        <b>{this.props.item.price}$</b>
        <FaTrash className='delete-icon' onClick={() => this.props.onRemove(this.props.item)} />
      </div>
    )
  }
}

export default Order