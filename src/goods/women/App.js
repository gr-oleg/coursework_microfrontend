import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Women from './women.jsx';
import Bigboard1 from '../../../public/img/bigboard1.webp';
import Bigboard2 from '../../../public/img/bigboard2.webp';
import Bigboard3 from '../../../public/img/bigboard3.webp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ],
    };
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <img src={Bigboard1} alt="description_of_the_image" className='bigboard' />
          <Women women={this.state.women}/>
        </Router>
      </div>
    );
  }
}

export default App;