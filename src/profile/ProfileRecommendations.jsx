import React, { useEffect, useState, useRef } from "react";

// Динамічний require для картинок з src/img/
const getImgSrc = (item) => {
  try {
    if (item.img && (item.img.startsWith("http") || item.img.startsWith("/"))) {
      return item.img;
    }
    const req = require(`../img/${item.img}`);
    return req && req.default ? req.default : req;
  } catch {
    try {
      const req = require(`../img/no-image.png`);
      return req && req.default ? req.default : req;
    } catch {
      return "";
    }
  }
};

const ProfileRecommendations = ({ userId, n = 15 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`http://13.61.35.121:8001/recommend/content/${userId}?n=${n}`, {
      headers: { accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.content_based_items || []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, [userId, n]);

  // Функція для переходу на сторінку товару
  const goToProduct = (id) => {
    window.history.pushState({}, "", `/product/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // Функція для скролу вправо
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  // Функція для скролу вліво
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  // Визначаємо чи показувати стрілку вліво/вправо
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };
    el.addEventListener("scroll", check);
    check();
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [items.length, loading]);

  if (!userId) return null;

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "32px auto 0 auto",
        background: "var(--whiteColor)",
        borderRadius: 16,
        boxShadow: "0 2px 22px rgba(2,15,29,0.09)",
        padding: 24,
        position: "relative",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "var(--PrimaryColor)",
          marginBottom: 18,
          fontSize: 21,
        }}
      >
        Персональні рекомендації
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
        <div style={{ position: "relative" }}>
          {/* Стрілка вліво */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                zIndex: 2,
                background: "rgba(255,255,255,0.93)",
                border: "none",
                borderRadius: "50%",
                width: 38,
                height: 38,
                boxShadow: "0 2px 6px rgba(0,0,0,0.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 22,
                transition: "background .2s",
                outline: "none"
              }}
              aria-label="Скролити вліво"
            >
              &#8592;
            </button>
          )}
          {/* Контейнер зі скролом */}
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              overflowY: "hidden",
              gap: 24,
              whiteSpace: "nowrap",
              paddingBottom: 8,
              scrollBehavior: "smooth",
              scrollbarColor: "#ccc #f7f8fa",
              scrollbarWidth: "thin",
              margin: "0 44px",
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
                    flex: "0 0 180px",
                    border: "1px solid #e9e9e9",
                    borderRadius: 12,
                    background: "#f7f8fa",
                    boxShadow: "0 1px 8px rgba(2,15,29,0.07)",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 12,
                    whiteSpace: "normal",
                    cursor: "pointer"
                  }}
                  onClick={() => goToProduct(item.id)}
                  tabIndex={0}
                  role="button"
                  title={`Перейти на сторінку товару "${item.name}"`}
                  onKeyPress={e => { if (e.key === 'Enter') goToProduct(item.id); }}
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
          {/* Стрілка вправо */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                zIndex: 2,
                background: "rgba(255,255,255,0.93)",
                border: "none",
                borderRadius: "50%",
                width: 38,
                height: 38,
                boxShadow: "0 2px 6px rgba(0,0,0,0.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 22,
                transition: "background .2s",
                outline: "none"
              }}
              aria-label="Скролити вправо"
            >
              &#8594;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileRecommendations;