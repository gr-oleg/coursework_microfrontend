import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Women from './women.jsx';
import Categories from '../Categories.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      women: []
    }

    this.addToOrder = this.addToOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }

  componentDidMount() {
    fetch('http://16.171.137.58/item/getAll')
      .then(response => response.json())
      .then(data => {
        const womenItems = data.filter(item => item.sex === 'women');
        this.setState({ women: womenItems, currentItems: womenItems });
      })
      .catch(error => console.error('Error:', error));
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