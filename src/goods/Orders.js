import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import App from './men/App.js';
import App from './women/App.js';
import App from './kids/App.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [     
      ],
    }
    this.addToOrder = this.addToOrder.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Men men={this.state.men}/>
        </Router>
      </div>
    );
  }

  addToOrder(men) {
    this.setState({orders: [...this.state.orders, men]})
  }

}

export default App;