import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Men from './men.jsx';
import Categories from '../Categories.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [     
      ],
      currentItems: [],
      men: [
        {
          id: 1,
          name: "New Balance 520 V8",
          img: 'men_shoes1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '89.99'
        },
        {
          id: 2,
          name: "New Balance 410",
          img: 'men_shoes2.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '95.99'
        },
        {
          id: 3,
          name: "Fresh Foam Garoé",
          img: 'men_shoes3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '110.50'
        },
        {
            id: 4,
            name: "Rebel v4",
            img: 'men_shoes4.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '150.00'
        },
        {
            id: 5,
            name: "New Balance 520 V8",
            img: 'men_shoes5.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '89.99'
        },
        {
            id: 6,
            name: "New Balance 530",
            img: 'men_shoes6.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '119.99'
        },
        {
            id: 7,
            name: "New Balance 530 Black",
            img: 'men_shoes7.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '119.99'
        },
        {
            id: 8,
            name: "New Balance 530 Green",
            img: 'men_shoes8.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '119.99'
        },
        {
            id: 9,
            name: "Fresh Foam Hierro v8",
            img: 'men_shoes9.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '189.99'
        },
        {
            id: 10,
            name: "Fresh Foam 680 v8",
            img: 'men_shoes10.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '112.99'
        },
        {
            id: 11,
            name: "Fresh Foam X More Trail v3",
            img: 'men_shoes11.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '199.99'
        },
        {
            id: 12,
            name: "New Balance Tektrel",
            img: 'men_shoes12.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '112.00'
        },
        {
          id: 13,
          name: "Windproof jacket NB Performance",
          img: 'men_clothes1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '119.00'
        },
        {
          id: 14,
          name: "Windproof jacket Greatest Hits",
          img: 'men_clothes2.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '135.00'
        },
        {
          id: 15,
          name: "Sports jacket Greatest Hits",
          img: 'men_clothes3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '119.00'
        },
        {
          id: 16,
          name: "Sports jacket Stacked Logo",
          img: 'men_clothes4.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '93.00'
        },
        {
          id: 17,
          name: "T-shirt Jacquard",
          img: 'men_clothes5.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '49.99'
        },
        {
          id: 18,
          name: "T-shirt NB Athletics Graphics",
          img: 'men_clothes6.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '29.99'
        },
        {
          id: 19,
          name: "T-shirt Shifted",
          img: 'men_clothes7.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '29.99'
        },
        {
          id: 20,
          name: "Shorts NB Prfm",
          img: 'men_clothes8.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '39.00'
        },
        {
          id: 21,
          name: "Sports pants NB Tech Knit",
          img: 'men_clothes9.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'clothes',
          price: '119.00'
        },
        {
          id: 22,
          name: "Panama Cargo Bucket",
          img: 'men_clothes10.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'accessories',
          price: '45.00'
        },
        {
          id: 23,
          name: "Bag Sling Bag",
          img: 'men_clothes11.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'accessories',
          price: '21.99'
        },
        {
          id: 24,
          name: "Socks Essentials Line",
          img: 'men_clothes12.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'accessories',
          price: '19.99'
        },      
      ],
    }
    this.state.currentItems = this.state.men
    this.addToOrder = this.addToOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Categories chooseCategory={this.chooseCategory} />
          <Men men={this.state.currentItems} onAdd={this.addToOrder} />
        </Router>
      </div>
    );
  }

  chooseCategory(category) {
    if(category === 'all'){
      this.setState({currentItems: this.state.men});
      return
    }
    this.setState({
      currentItems: this.state.men.filter(el => el.category === category)
    })
  }

  addToOrder(item) {
    this.setState({orders: [...this.state.orders, item]}, () => {
      localStorage.setItem('orders', JSON.stringify(this.state.orders));
    })
  }
}

export default App;