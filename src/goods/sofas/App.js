import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Sofas from './sofas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sofas: [
        {
          id: 31,
          name: "Chair 1",
          img: 'chair3.jpg',
          desc: 'This is a chair',
          price: '49.99'
        },
        {
          id: 32,
          name: "Chair 2",
          img: 'chair3.jpg',
          desc: 'This is a chair',
          price: '32.00'
        },
        {
          id: 33,
          name: "Chair 3",
          img: 'chair3.jpg',
          desc: 'This is a chair',
          price: '69.99'
        },
        {
            id: 34,
            name: "Chair 4",
            img: 'chair3.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 35,
            name: "Chair 5",
            img: 'chair3.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 36,
            name: "Chair 6",
            img: 'chair3.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 37,
            name: "Chair 7",
            img: 'chair3.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 38,
            name: "Chair 8",
            img: 'chair3.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },        
      ],
    };
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Sofas sofas={this.state.sofas}/>
        </Router>
      </div>
    );
  }
}

export default App;