import React, { useEffect, useState } from "react";

const Recommendations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://13.61.35.121:8001/train", {
      method: "POST",
      headers: { accept: "application/json" },
    })
      .then(() =>
        fetch("http://13.61.35.121:8001/recommend/popular?n=15", {
          headers: { accept: "application/json" },
        })
      )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.popular_items || []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, []);

  // Використання require для картинок з src/img/
  const getImgSrc = (item) => {
    try {
      // Якщо img відразу http або абсолютний — повертаємо як є
      if (item.img && (item.img.startsWith("http") || item.img.startsWith("/"))) {
        return item.img;
      }
      // Динамічний require для src/img/
      return require(`../img/${item.img}`);
    } catch {
      // Якщо файл не знайдено — fallback на заглушку
      try {
        return require(`../img/no-image.png`);
      } catch {
        return "";
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 1250,
        margin: "48px auto 0 auto",
        background: "var(--whiteColor)",
        borderRadius: 16,
        boxShadow: "0 2px 22px rgba(2,15,29,0.09)",
        padding: 24,
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "var(--PrimaryColor)",
          marginBottom: 18,
          fontSize: 23,
        }}
      >
        Рекомендовано для вас
      </h3>
      {loading ? (
        <div style={{ textAlign: "center", color: "var(--greyText)" }}>
          Завантаження рекомендацій...
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--greyText)" }}>
          Немає рекомендацій
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {items.map((item) => {
            let imgSrc = "";
            try {
              const req = getImgSrc(item);
              imgSrc = req && req.default ? req.default : req;
            } catch {
              imgSrc = "";
            }
            return (
              <div
                key={item.id}
                style={{
                  width: 180,
                  border: "1px solid #e9e9e9",
                  borderRadius: 12,
                  background: "#f7f8fa",
                  boxShadow: "0 1px 8px rgba(2,15,29,0.07)",
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <img
                  src={imgSrc}
                  alt={item.name}
                  style={{
                    width: 110,
                    height: 100,
                    objectFit: "contain",
                    borderRadius: 10,
                    marginBottom: 10,
                    background: "#fff",
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--PrimaryColor)",
                    marginBottom: 6,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#666",
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
         
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--greyText)",
                    marginBottom: 4,
                  }}
                >
                  Категорія:{" "}
                  {item.category === "shoes"
                    ? "Взуття"
                    : item.category === "clothes"
                    ? "Одяг"
                    : "Аксесуари"}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#2a2b2f",
                  }}
                >
                  {item.price}$
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recommendations;