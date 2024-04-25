import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Women from './women.jsx';
import Categories from '../Categories.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [     
      ],
      currentItems: [],
      women: [
        {
          id: 101,
          name: "Fuel Cell Venym",
          img: 'women_shoes1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '129.99'
        },
        {
          id: 102,
          name: "Fresh Foam 680",
          img: 'women_shoes2.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '99.99'
        },
        {
          id: 103,
          name: "Rebel v4",
          img: 'women_shoes3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '150.00'
        },
        {
            id: 104,
            name: "Beaya",
            img: 'women_shoes4.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '85.99'
        },
        {
            id: 105,
            name: "New Balance 9060",
            img: 'women_shoes5.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '189.99'
        },
        {
            id: 106,
            name: "New Balance 530",
            img: 'women_shoes6.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '119.99'
        },
        {
            id: 107,
            name: "New Balance 550",
            img: 'women_shoes7.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '138.99'
        },    
        {
          id: 108,
          name: "New Balance CT302",
          img: 'women_shoes8.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '115.99'
      },
      {
        id: 109,
        name: "New Balance 997",
        img: 'women_shoes9.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'shoes',
        price: '119.50'
      }, 
      { 
        id: 110,
        name: "Jacket Greatest Hits",
        img: 'women_clothes1.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '159.00'
      },   
      { 
        id: 111,
        name: "Jacket Linear Heritage",
        img: 'women_clothes2.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '109.00'
      }, 
      { 
        id: 112,
        name: "Sports jacket Small Logo",
        img: 'women_clothes3.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '79.99'
      },  
      { 
        id: 113,
        name: "Sports jacket NB Greatest Hit",
        img: 'women_clothes4.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '100.00'
      },  
      { 
        id: 114,
        name: "Sweater Small Logo",
        img: 'women_clothes5.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '59.99'
      },  
      { 
        id: 115,
        name: "Sports pants Shifted",
        img: 'women_clothes6.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '69.00'
      },  
      { 
        id: 116,
        name: "Sports pants NB Athletics",
        img: 'women_clothes7.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '100.00'
      },  
      { 
        id: 117,
        name: "Shorts NB Small Logo",
        img: 'women_clothes8.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '50.00'
      },  
      { 
        id: 118,
        name: "Shorts NB Athletics",
        img: 'women_clothes9.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '72.00'
      },  
      { 
        id: 119,
        name: "Bag Classic Canvas",
        img: 'women_clothes10.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'accessories',
        price: '39.99'
      },  
      { 
        id: 120,
        name: "Bag Opp Core Shoulder",
        img: 'women_clothes11.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'accessories',
        price: '21.99'
      },  
      { 
        id: 121,
        name: "Socks Essentials Line",
        img: 'women_clothes12.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'accessories',
        price: '19.99'
      },    
      ],
    }
    this.state.currentItems = this.state.women
    this.addToOrder = this.addToOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Categories chooseCategory={this.chooseCategory} />
          <Women women={this.state.currentItems} onAdd={this.addToOrder} />
        </Router>
      </div>
    );
  }

  chooseCategory(category) {
    if(category === 'all'){
      this.setState({currentItems: this.state.women});
      return
    }
    this.setState({
      currentItems: this.state.women.filter(el => el.category === category)
    })
  }

  addToOrder(item) {
    this.setState({orders: [...this.state.orders, item]}, () => {
      localStorage.setItem('orders', JSON.stringify(this.state.orders));
    })
  }
}

export default App;