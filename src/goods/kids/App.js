import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Kids from './kids.jsx';
import Bigboard1 from '../../../public/img/bigboard1.webp';
import Bigboard2 from '../../../public/img/bigboard2.webp';
import Bigboard3 from '../../../public/img/bigboard3.webp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kids: [
        {
          id: 1,
          name: "New Balance 530",
          img: 'kids_shoes1.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '59.99'
        },
        {
          id: 2,
          name: "New Balance 530",
          img: 'kids_shoes2.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '59.99'
        },
        {
          id: 3,
          name: "New Balance 574",
          img: 'kids_shoes3.jpg',
          desc: 'If you are looking for furniture, we recommend that you buy this.',
          category: 'shoes',
          price: '45.99'
        },
        {
            id: 4,
            name: "New Balance 574",
            img: 'kids_shoes4.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '45.99'
        },
        {
            id: 5,
            name: "New Balance 990",
            img: 'kids_shoes5.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '49.99'
        },
        {
            id: 6,
            name: "New Balance SYA809R3",
            img: 'kids_shoes6.jpg',
            desc: 'If you are looking for furniture, we recommend that you buy this.',
            category: 'shoes',
            price: '39.99'
        },
      ],
    };
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
          <img src={Bigboard2} alt="description_of_the_image" className='bigboard' />
          <Kids kids={this.state.kids}/>
        </Router>
      </div>
    );
  }
}

export default App;