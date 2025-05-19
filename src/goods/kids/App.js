import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Kids from './kids.jsx';
import Categories from '../Categories.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      kids: []
    }

    this.addToOrder = this.addToOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
  }

  componentDidMount() {
    fetch('http://16.171.137.58/item/getAll')
      .then(response => response.json())
      .then(data => {
        const kidsItems = data.filter(item => item.sex === 'kids');
        this.setState({ kids: kidsItems, currentItems: kidsItems });
      })
      .catch(error => console.error('Error:', error));
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