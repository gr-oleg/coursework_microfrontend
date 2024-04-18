import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../app.css'
import Chairs from './chairs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [
        {
          id: 1,
          name: "Chair 1",
          img: 'chair1.jpg',
          desc: 'This is a chair',
          price: '49.99'
        },
        {
          id: 2,
          name: "Chair 2",
          img: 'chair2.jpg',
          desc: 'This is a chair',
          price: '32.00'
        },
        {
          id: 3,
          name: "Chair 3",
          img: 'chair3.jpg',
          desc: 'This is a chair',
          price: '69.99'
        },
        {
            id: 4,
            name: "Chair 4",
            img: 'chair4.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 5,
            name: "Chair 5",
            img: 'chair5.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 6,
            name: "Chair 6",
            img: 'chair6.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 7,
            name: "Chair 7",
            img: 'chair7.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 8,
            name: "Chair 8",
            img: 'chair8.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 9,
            name: "Chair 9",
            img: 'chair9.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 10,
            name: "Chair 10",
            img: 'chair10.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 11,
            name: "Chair 11",
            img: 'chair11.jpg',
            desc: 'This is a chair',
            price: '49.99'
        },
        {
            id: 12,
            name: "Chair 12",
            img: 'chair12.jpg',
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
          <Chairs chairs={this.state.chairs}/>
        </Router>
      </div>
    );
  }
}

export default App;