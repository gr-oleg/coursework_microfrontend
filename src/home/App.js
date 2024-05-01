import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../app.css'
import Bigboard1 from '../../public/img/bigboard2.webp';


const App = () => {
  return (
    <Router>
      <img src={Bigboard1} alt="description_of_the_image" className='bigboard' />
      <div className='items-home'>
      <div className='item-home'>
    <p>everything for</p>
    <div style={{fontSize: "25px", marginLeft: "25px",display: "flex", alignItems: "center", gap: "10px"}}>
        <h1>MEN</h1>
        <p>&gt;</p>
    </div>
</div>
       <div className='item-home'>
    <p>everything for</p>
    <div style={{fontSize: "25px", marginLeft: "25px",display: "flex", alignItems: "center", gap: "10px"}}>
        <h1>WOMEN</h1>
        <p>&gt;</p>
    </div>
</div>
       <div className='item-home'>
    <p>everything for</p>
    <div style={{fontSize: "25px", marginLeft: "25px",display: "flex", alignItems: "center", gap: "10px"}}>
        <h1>KIDS</h1>
        <p>&gt;</p>
    </div>
</div>
      </div>
    </Router>
  );
};

export default App;