import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../app.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Bigboard1 from '../img/bigboard1.webp';
import Bigboard2 from '../img/bigboard2.webp';
import Bigboard3 from '../img/bigboard3.webp';
import Recommendations from './Recommendations.jsx';

// Приклади відгуків
const reviews = [
  {
    name: "Олена",
    text: "Дуже зручне взуття, швидка доставка! Рекомендую всім!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Іван",
    text: "Кросівки якісні, обслуговування на висоті.",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg"
  },
  {
    name: "Марія",
    text: "Великий вибір і приємні ціни. Буду замовляти ще!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

// Приклади брендів
const brands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Puma_AG.svg"
  },
  {
    name: "New Balance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/New_Balance_logo.svg"
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

      {/* Відгуки */}
      <div
        style={{
          maxWidth: 420,
          margin: "48px auto 0 auto",
          background: "var(--whiteColor)",
          borderRadius: 16,
          boxShadow: "0 2px 22px rgba(2,15,29,0.09)",
          padding: 20
        }}
      >
        <h3 style={{
          textAlign: "center",
          color: "var(--PrimaryColor)",
          marginBottom: 14
        }}>Відгуки покупців</h3>
        <Slider {...reviewSettings}>
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 140
              }}
            >
              <img
                src={r.avatar}
                alt={r.name}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 8,
                  border: "2.5px solid var(--PrimaryColor)"
                }}
              />
              <div style={{
                fontWeight: 500,
                color: "var(--textColor)"
              }}>{r.name}</div>
              <div style={{
                color: "var(--greyText)",
                marginTop: 7,
                fontSize: 15,
                textAlign: "center",
                maxWidth: 340
              }}>"{r.text}"</div>
            </div>
          ))}
        </Slider>
      </div>

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
                  maxWidth: 110,
                  height: 38,
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