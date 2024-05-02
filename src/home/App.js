import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../app.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Bigboard1 from '../../public/img/bigboard1.webp';
import Bigboard2 from '../../public/img/bigboard2.webp';
import Bigboard3 from '../../public/img/bigboard3.webp';


const App = () => {
  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <Router>
    <Slider {...settings}>
      <div>
        <img src={Bigboard1} alt="description_of_the_image" className='bigboard' />
      </div>
      <div>
        <img src={Bigboard2} alt="description_of_the_image" className='bigboard' />
      </div>
      <div>
        <img src={Bigboard3} alt="description_of_the_image" className='bigboard' />
      </div>
    </Slider>
      <div className='items-home'>
      <Link to="/men" className='item-home'>
    <p>everything for</p>
    <div style={{fontSize: "25px", marginLeft: "25px",display: "flex", alignItems: "center", gap: "10px"}}>
        <h1>MEN</h1>
        <p>&gt;</p>
    </div>
    </Link>
    <Link to="/women" className='item-home'>
    <p>everything for</p>
    <div style={{fontSize: "25px", marginLeft: "25px",display: "flex", alignItems: "center", gap: "10px"}}>
        <h1>WOMEN</h1>
        <p>&gt;</p>
    </div>
    </Link>
    <Link to="/kids" className='item-home'>
    <p>everything for</p>
    <div style={{fontSize: "25px", marginLeft: "25px",display: "flex", alignItems: "center", gap: "10px"}}>
        <h1>KIDS</h1>
        <p>&gt;</p>
    </div>
    </Link>
      </div>
    </Router>
  );
};

export default App;