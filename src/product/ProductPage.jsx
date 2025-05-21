import React, { useEffect, useState } from 'react';

const ProductPage = () => {
  const match = window.location.pathname.match(/^\/product\/([^/]+)/);
  const id = match ? match[1] : null;

   const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
  });

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

const handleAdd = (e) => {
    e.preventDefault();

    setOrders(prevOrders => {
      // чи є товар у кошику?
      const found = prevOrders.find(orderItem => orderItem.id === item.id);
      let newOrders;
      if (found) {
        // якщо є — оновлюємо кількість
        newOrders = prevOrders.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: (orderItem.quantity || 1) + 1 }
            : orderItem
        );
      } else {
        // якщо нема — додаємо з quantity: 1
        newOrders = [...prevOrders, { ...item, quantity: 1 }];
      }
      // оновлюємо localStorage
      localStorage.setItem('orders', JSON.stringify(newOrders));
      // можна повідомлення:
      alert('Товар додано в кошик!');
      return newOrders;
    });
  };

  useEffect(() => {
    fetch('http://16.171.137.58/item/getAll')
      .then(res => res.json())
      .then(data => {
        const found = data.find(i => String(i.id) === String(id));
        setItem(found);
        setLoading(false);
      })
      .catch(e => setLoading(false));
  }, [id]);

  if (loading) return <div className="product-loading">Завантаження...</div>;
  if (!item) return <div className="product-not-found">Товар не знайдено</div>;

  let imgSrc;
  try {
    imgSrc = require("../../public/img/" + item.img).default;
  } catch {
    imgSrc = "";
  }

  return (
    <div className="product-page-container">
      <div className="product-card">
        <div className="product-image-block">
          <img className="product-image" src={imgSrc} alt={item.name} />
        </div>
        <div className="product-info-block">
          <h2 className="product-title">{item.name}</h2>
          <div className="product-category">
            <span className="product-category-label">Категорія:</span> {item.category}
          </div>
          <div className="product-id">
            <span className="product-category-label">ID:</span> {item.id}
          </div>
          <div className="product-sex">
            <span className="product-category-label">Для кого:</span> {item.sex === 'men' ? 'Чоловіки' : item.sex === 'women' ? 'Жінки' : 'Діти'}
          </div>
          <div className="product-description">{item.desc}</div>
          <div className="product-price-block">
            <span className="product-price-label">Ціна:</span>
            <span className="product-price">{item.price}$</span>
          </div>
          <button className="product-cart-btn" onClick={handleAdd}>Додати в кошик</button>
        </div>
      </div>
      <style>{`
        .product-page-container {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 80px;
        }
        .product-card {
          display: flex;
          flex-direction: row;
          max-width: 1560px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          border-radius: 22px;
          overflow: hidden;
          width: 100%;
        }
        .product-image-block {
          flex: 1 1 300px;
          background: #f1f1f1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 260px;
          padding: 38px 18px;
        }
        .product-image {
          max-height: 3400px;
          max-width: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.10);
          background: #fff;
        }
        .product-info-block {
          flex: 2 1 340px;
          padding: 38px 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .product-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2px;
        }
        .product-category, .product-id, .product-sex {
          font-size: 1rem;
          color: #444;
        }
        .product-category-label {
          font-weight: 600;
          color: #7a8bad;
          margin-right: 3px;
        }
        .product-description {
          margin: 12px 0 10px 0;
          font-size: 1.12rem;
          color: #222;
        }
        .product-price-block {
          margin: 18px 0 8px 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: #2b7a2b;
        }
        .product-price-label {
          color: #7a8bad;
          font-size: 1rem;
          font-weight: 500;
          margin-right: 6px;
        }
        .product-cart-btn {
          margin-top: 14px;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(90deg, hsl(187, 85%, 43%), hsl(199, 100%, 33%));
          color: #fff;
          font-size: 1.13rem;
          font-weight: bold;
          cursor: pointer;
          opacity: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          transition: background 0.2s;
        }
        .product-loading,
        .product-not-found {
          text-align: center;
          margin: 64px auto;
          font-size: 1.4rem;
          color: #7a8bad;
        }
        @media (max-width: 700px) {
          .product-card {
            flex-direction: column;
            min-width: 0;
            max-width: 100vw;
          }
          .product-info-block {
            padding: 24px 16px;
          }
          .product-image-block {
            padding: 28px 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductPage;