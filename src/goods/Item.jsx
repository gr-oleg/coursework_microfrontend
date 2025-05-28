import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './item.css'

export class Item extends Component {
  handleAdd = (e) => {
    e.preventDefault(); // Щоб не переходити по посиланню, якщо клік по "+"
    this.props.onAdd(this.props.item);
  }

  render() {
    const imgSrc = require("../img/" + this.props.item.img);
    return (
      <div className='items'>
        <Link to={`/product/${this.props.item.id}`} className="item-link" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={imgSrc.default} alt={this.props.item.name} />
          <h2>{this.props.item.name}</h2>
        </Link>
        <b>{this.props.item.price}$</b>
        <div
          className='add-to-cart'
          onClick={this.handleAdd}
          title="Додати до кошика"
        >+</div>
      </div>
    )
  } 
}

export default Item