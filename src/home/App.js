import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../app.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Bigboard1 from '../img/bigboard1.webp';
import Bigboard2 from '../img/bigboard2.webp';
import Bigboard3 from '../img/bigboard3.webp';
import puma from '../img/puma.png';
import adidas from '../img/adidas.png';
import nike from '../img/nike.png'; 
import new_balance from '../img/new_balance.png';
import Recommendations from './Recommendations.jsx';


// Приклади брендів
const brands = [
  {
    logo: nike
  },
  {
    logo: adidas
  },
  {
    logo: puma
  },
  {
    logo: new_balance
  }
];


const App = () => {
  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const reviewSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
    dots: true
  };

  return (
    <Router>
      {/* Слайдер банерів */}
      <Slider {...settings}>
        <div>
          <img src={Bigboard1} alt="banner 1" className='bigboard' />
        </div>
        <div>
          <img src={Bigboard2} alt="banner 2" className='bigboard' />
        </div>
        <div>
          <img src={Bigboard3} alt="banner 3" className='bigboard' />
        </div>
      </Slider>

      {/* Категорії */}
      <div className='items-home'>
        <Link to="/men" className='item-home'>
          <p>everything for</p>
          <div style={{
            fontSize: "25px",
            marginLeft: "25px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <h1>MEN</h1>
            <p>&gt;</p>
          </div>
        </Link>
        <Link to="/women" className='item-home'>
          <p>everything for</p>
          <div style={{
            fontSize: "25px",
            marginLeft: "25px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <h1>WOMEN</h1>
            <p>&gt;</p>
          </div>
        </Link>
        <Link to="/kids" className='item-home'>
          <p>everything for</p>
          <div style={{
            fontSize: "25px",
            marginLeft: "25px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <h1>KIDS</h1>
            <p>&gt;</p>
          </div>
        </Link>
      </div>

      {/* Рекомендовані товари */}
      <Recommendations />

      
      {/* Блок брендів */}
      <div style={{margin: "40px auto 60px auto", textAlign: "center"}}>
        <h4 style={{
          marginBottom: 20,
          color: "var(--SecondaryColor)",
          letterSpacing: "1px"
        }}>Наші бренди</h4>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 35,
          flexWrap: "wrap"
        }}>
          {brands.map((b, i) => (
            <div key={i} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <img
                src={b.logo}
                alt={b.name}
                style={{
                  maxWidth: 200,
                  height: 70,
                  objectFit: "contain",
                  opacity: 0.88,
                  filter: "grayscale(0.5)",
                  transition: "filter 0.2s, opacity 0.2s, transform 0.13s"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.filter = "grayscale(0)";
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1.09)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.filter = "grayscale(0.5)";
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <span style={{
                fontSize: 14,
                color: "var(--greyText)",
                marginTop: 6,
                fontWeight: 500
              }}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;