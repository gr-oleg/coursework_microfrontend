import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Men from './men.jsx';
import Bigboard1 from '../../../public/img/bigboard1.webp';
import Bigboard2 from '../../../public/img/bigboard2.webp';
import Bigboard3 from '../../../public/img/bigboard3.webp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        
      ],
    };
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <img src={Bigboard3} alt="description_of_the_image" className='bigboard' />
          <Men men={this.state.men}/>
        </Router>
      </div>
    );
  }
}

export default App;