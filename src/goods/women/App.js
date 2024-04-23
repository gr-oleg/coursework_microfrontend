import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Women from './women.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [     
      ],
      women: [
        {
          id: 1,
          name: "Fuel Cell Venym",
          img: 'women_shoes1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '129.99'
        },
        {
          id: 2,
          name: "Fresh Foam 680",
          img: 'women_shoes2.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '99.99'
        },
        {
          id: 3,
          name: "Rebel v4",
          img: 'women_shoes3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '150.00'
        },
        {
            id: 4,
            name: "Beaya",
            img: 'women_shoes4.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '85.99'
        },
        {
            id: 5,
            name: "New Balance 9060",
            img: 'women_shoes5.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '189.99'
        },
        {
            id: 6,
            name: "New Balance 530",
            img: 'women_shoes6.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '119.99'
        },
        {
            id: 7,
            name: "New Balance 550",
            img: 'women_shoes7.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '138.99'
        },    
        {
          id: 8,
          name: "New Balance CT302",
          img: 'women_shoes8.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '115.99'
      },
      {
        id: 9,
        name: "New Balance 997",
        img: 'women_shoes9.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'shoes',
        price: '119.50'
      }, 
      { 
        id: 10,
        name: "Jacket Greatest Hits",
        img: 'women_clothes1.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '159.00'
      },   
      { 
        id: 11,
        name: "Jacket Linear Heritage",
        img: 'women_clothes2.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '109.00'
      }, 
      { 
        id: 12,
        name: "Sports jacket Small Logo",
        img: 'women_clothes3.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '79.99'
      },  
      { 
        id: 13,
        name: "Sports jacket NB Greatest Hit",
        img: 'women_clothes4.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '100.00'
      },  
      { 
        id: 14,
        name: "Sweater Small Logo",
        img: 'women_clothes5.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '59.99'
      },  
      { 
        id: 15,
        name: "Sports pants Shifted",
        img: 'women_clothes6.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '69.00'
      },  
      { 
        id: 16,
        name: "Sports pants NB Athletics",
        img: 'women_clothes7.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '100.00'
      },  
      { 
        id: 17,
        name: "Shorts NB Small Logo",
        img: 'women_clothes8.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '50.00'
      },  
      { 
        id: 18,
        name: "Shorts NB Athletics",
        img: 'women_clothes9.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '72.00'
      },  
      { 
        id: 19,
        name: "Bag Classic Canvas",
        img: 'women_clothes10.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '39.99'
      },  
      { 
        id: 20,
        name: "Bag Opp Core Shoulder",
        img: 'women_clothes11.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '21.99'
      },  
      { 
        id: 21,
        name: "Socks Essentials Line",
        img: 'women_clothes12.jpg',
        desc: 'If you are looking for furniture, we recommend that you buy this.',
        category: 'clothes',
        price: '19.99'
      },    
      ],
    }
    this.addToOrder = this.addToOrder.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Women women={this.state.women} onAdd={this.addToOrder} />
        </Router>
      </div>
    );
  }
  addToOrder(item) {
    this.setState({orders: [...this.state.orders, item]}, () => {
      localStorage.setItem('orders', JSON.stringify(this.state.orders));
    })
  }
}

export default App;