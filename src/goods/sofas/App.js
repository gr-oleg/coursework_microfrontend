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
          name: "Sofa 1",
          img: 'sofa1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          price: '49.99'
        },
        {
          id: 32,
          name: "Sofa 2",
          img: 'sofa2.webp',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          price: '32.00'
        },
        {
          id: 33,
          name: "Sofa 3",
          img: 'sofa3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          price: '69.99'
        },
        {
            id: 34,
            name: "Sofa 4",
            img: 'sofa4.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            price: '49.99'
        },
        {
            id: 35,
            name: "Sofa 5",
            img: 'sofa5.webp',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            price: '49.99'
        },
        {
            id: 36,
            name: "Sofa 6",
            img: 'sofa6.png',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            price: '49.99'
        },
        {
            id: 37,
            name: "Sofa 7",
            img: 'sofa7.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
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