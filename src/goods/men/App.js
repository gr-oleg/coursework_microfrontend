import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Men from './men.jsx';
import Categories from '../Categories.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      men: []
    }

    this.addToOrder = this.addToOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }

  componentDidMount() {
    fetch('http://51.21.3.167/item/getAll')
      .then(response => response.json())
      .then(data => {
        const menItems = data.filter(item => item.sex === 'men');
        this.setState({ men: menItems, currentItems: menItems });
      })
      .catch(error => console.error('Error:', error));
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