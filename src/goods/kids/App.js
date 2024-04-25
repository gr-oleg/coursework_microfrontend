import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Kids from './kids.jsx';
import Categories from '../Categories.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [     
      ],
      currentItems: [],
      kids: [
        {
          id: 201,
          name: "New Balance 530",
          img: 'kids_shoes1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '59.99'
        },
        {
          id: 202,
          name: "New Balance 530",
          img: 'kids_shoes2.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '59.99'
        },
        {
          id: 203,
          name: "New Balance 574",
          img: 'kids_shoes3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '45.99'
        },
        {
            id: 204,
            name: "New Balance 574",
            img: 'kids_shoes4.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '45.99'
        },
        {
            id: 205,
            name: "New Balance 990",
            img: 'kids_shoes5.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '49.99'
        },
        {
            id: 206,
            name: "New Balance SYA809R3",
            img: 'kids_shoes6.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '39.99'
        },
      ],
    }
    this.state.currentItems = this.state.kids;
    this.addToOrder = this.addToOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Categories chooseCategory={this.chooseCategory} />
          <Kids kids={this.state.currentItems} onAdd={this.addToOrder} />
        </Router>
      </div>
    );
  }

  chooseCategory(category) {
    if(category === 'all'){
      this.setState({currentItems: this.state.kids});
      return
    }
    this.setState({
      currentItems: this.state.kids.filter(el => el.category === category)
    })
  }

  addToOrder(item) {
    this.setState({orders: [...this.state.orders, item]}, () => {
      localStorage.setItem('orders', JSON.stringify(this.state.orders));
    })
  }
}

export default App;