import React, { useEffect, useState } from "react";

const isAdmin = true;
const API_URL = "http://16.171.137.58";
const STATS_URL = "http://13.61.35.121:8004/stats";

const GENDERS = [
  { value: "", label: "Стать" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
];
const CATEGORIES = [
  { value: "", label: "Категорія" },
  { value: "clothes", label: "Clothes" },
  { value: "accessories", label: "Accessories" },
  { value: "shoes", label: "Shoes" },
];

// SVG Bar chart та Pie chart для статистики
function StatsCharts({ stats }) {
  if (!stats) return null;
  // Top items bar chart
  const maxCount = Math.max(...stats.top_items.map(i => i.count), 1);
  const barColors = ["#64b5f6", "#81c784", "#ffd54f", "#e57373", "#ba68c8"];
  // Top users pie chart
  const totalOrders = stats.top_users.reduce((sum, u) => sum + u.orders, 0);

  // Збільшуємо ширину стовпця назв товарів
  const leftTextWidth = 220;
  const barChartWidth = 280;
  const rightTextWidth = 60;

  return (
    <div style={{
      display: "flex",
      gap: 40,
      flexWrap: "wrap",
      margin: "32px 0",
      alignItems: "flex-start",
      justifyContent: "center"
    }}>
      {/* Top Items */}
      <div style={{
        flex: "1 1 360px",
        minWidth: 380,
        maxWidth: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: 16 }}>Топ-товари (продажі)</h3>
        <svg width={leftTextWidth + barChartWidth + rightTextWidth} height={40 + stats.top_items.length * 38}>
          {/* Заголовки колонок */}
          <text x={14} y={22} fontSize={15} fill="#666" fontWeight={550}>Назва</text>
          <text x={leftTextWidth + barChartWidth/2 - 18} y={22} fontSize={15} fill="#666" fontWeight={550}>Бари</text>
          <text x={leftTextWidth + barChartWidth + 8} y={22} fontSize={15} fill="#666" fontWeight={550}>К-сть</text>
          {stats.top_items.slice(0, 8).map((item, i) => (
            <g key={item.id}>
              <text
                x={14}
                y={44 + i * 38}
                fontSize={15}
                fill="#222"
                alignmentBaseline="middle"
                style={{ fontFamily: "inherit" }}
              >
                {item.name}
              </text>
              <rect
                x={leftTextWidth}
                y={30 + i * 38}
                width={barChartWidth * (item.count / maxCount)}
                height={28}
                fill={barColors[i % barColors.length]}
                rx={8}
              />
              <text
                x={leftTextWidth + barChartWidth + 12}
                y={44 + i * 38}
                fontSize={15}
                fill="#333"
                alignmentBaseline="middle"
                style={{ fontFamily: "inherit" }}
              >
                {item.count}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {/* Top Users Pie Chart */}
      <div style={{
        flex: "1 1 320px",
        minWidth: 320,
        maxWidth: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: 16 }}>Топ-замовники</h3>
        <svg width={190} height={190} viewBox="0 0 190 190" style={{ display: "block", margin: "0 auto" }}>
          {stats.top_users.reduce((acc, user, i, arr) => {
            const prevAngle = acc.lastAngle;
            const angle = prevAngle + (user.orders / totalOrders) * 2 * Math.PI;
            const x1 = 95 + 80 * Math.cos(prevAngle);
            const y1 = 95 + 80 * Math.sin(prevAngle);
            const x2 = 95 + 80 * Math.cos(angle);
            const y2 = 95 + 80 * Math.sin(angle);
            const largeArc = user.orders / totalOrders > 0.5 ? 1 : 0;
            acc.paths.push(
              <path
                key={user.userId}
                d={`M95,95 L${x1},${y1} A80,80 0 ${largeArc},1 ${x2},${y2} Z`}
                fill={barColors[i % barColors.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            );
            // Виносимо підпис трішки назовні сектора
            const labelAngle = prevAngle + (angle - prevAngle) / 2;
            acc.labels.push(
              <text
                key={user.userId + "_label"}
                x={95 + 70 * Math.cos(labelAngle)}
                y={95 + 70 * Math.sin(labelAngle) + 5}
                fontSize={14}
                textAnchor="middle"
                fill="#222"
                style={{ fontFamily: "inherit", fontWeight: 600 }}
              >
                {user.orders}
              </text>
            );
            acc.lastAngle = angle;
            return acc;
          }, { paths: [], labels: [], lastAngle: 0 }).paths}
          {stats.top_users.reduce((acc, user, i, arr) => {
            const prevAngle = acc.lastAngle;
            const angle = prevAngle + (user.orders / totalOrders) * 2 * Math.PI;
            const labelAngle = prevAngle + (angle - prevAngle) / 2;
            acc.lastAngle = angle;
            acc.labels.push(
              <text
                key={user.userId + "_label"}
                x={95 + 70 * Math.cos(labelAngle)}
                y={95 + 70 * Math.sin(labelAngle) + 5}
                fontSize={14}
                textAnchor="middle"
                fill="#222"
                style={{ fontFamily: "inherit", fontWeight: 600 }}
              >
                {user.orders}
              </text>
            );
            return acc;
          }, { labels: [], lastAngle: 0 }).labels}
          <circle cx={95} cy={95} r={32} fill="#fff" />
          <text x={95} y={102} fontSize={18} textAnchor="middle" fill="#222" fontWeight={600}>Замовлень</text>
        </svg>
        <div style={{marginTop: 8, textAlign:"center", fontSize:15}}>
          {stats.top_users.slice(0, 5).map((user, i) => (
            <div key={user.userId} style={{margin: "2px 0"}}>
              <span style={{
                display: "inline-block", width: 12, height: 12,
                background: barColors[i % barColors.length], borderRadius: 4, marginRight: 8
              }} />
              <b>ID {user.userId}</b> — {user.orders} замовлень
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    desc: "",
    sex: "",
    category: "",
    img: "",
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [stats, setStats] = useState(null);

  // Завантажити товари
  const fetchItems = () => {
    fetch(`${API_URL}/item/getAll`)
      .then(r => r.json())
      .then(setItems);
  };

  // Завантажити статистику
  const fetchStats = () => {
    fetch(STATS_URL)
      .then(r => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  };

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

  const handleDelete = id => {
    fetch(`${API_URL}/item/${id}`, { method: "DELETE" })
      .then(() => fetchItems());
  };

  const handleEdit = item => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      price: item.price || "",
      desc: item.desc || "",
      sex: item.sex || "",
      category: item.category || "",
      img: item.img || "",
    });
    setPreview(item.img || "");
    setError("");
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "img" && files && files.length > 0) {
      uploadPhoto(files[0]);
    } else {
      setForm({ ...form, [name]: value });
      setError("");
    }
  };

  // Завантаження фото на бекенд та отримання URL з S3
  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Не вдалося завантажити фото");
      const { url } = await res.json();
      setForm(f => ({ ...f, img: url }));
      setPreview(url);
      setError("");
    } catch (e) {
      setError("Помилка завантаження фото");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    for (const key of ["name", "price", "desc", "sex", "category", "img"]) {
      if (!form[key]) {
        setError("Всі поля мають бути заповнені!");
        return;
      }
    }
    setError("");
    const payload = {
      ...form,
      price: Number(form.price),
    };
    if (editingItem) {
      fetch(`${API_URL}/item/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(() => {
          setEditingItem(null);
          setForm({
            name: "",
            price: "",
            desc: "",
            sex: "",
            category: "",
            img: "",
          });
          setPreview("");
          fetchItems();
        });
    } else {
      fetch(`${API_URL}/item/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(() => {
          setForm({
            name: "",
            price: "",
            desc: "",
            sex: "",
            category: "",
            img: "",
          });
          setPreview("");
          fetchItems();
        });
    }
  };

  if (!isAdmin) {
    return <div>Доступ заборонено</div>;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f8fa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
    }}>
      {/* --- СТАТИСТИКА --- */}
      {stats && (
        <div style={{
          width: "100%",
          maxWidth: 1200,
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          borderRadius: 12,
          padding: 32,
          marginBottom: 40,
        }}>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Статистика продажів та замовників</h2>
          <StatsCharts stats={stats} />
          <div style={{
            display: "flex", gap: 40, flexWrap: "wrap", marginTop: 32, alignItems: "flex-start",
          }}>
            <div style={{ flex: "1 1 340px", minWidth: 320 }}>
              <h4 style={{ margin: "12px 0 10px 0" }}>Топ-10 товарів</h4>
              <table style={{ width: "100%", fontSize: 15, borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ textAlign: "left", padding: 6 }}>Назва</th>
                    <th style={{ textAlign: "left", padding: 6 }}>Кількість</th>
                    <th style={{ textAlign: "left", padding: 6 }}>Ціна</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.top_items.slice(0, 10).map(item => (
                    <tr key={item.id}>
                      <td style={{ padding: 6 }}>{item.name}</td>
                      <td style={{ padding: 6 }}>{item.count}</td>
                      <td style={{ padding: 6 }}>{item.price}$</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ flex: "1 1 340px", minWidth: 320 }}>
              <h4 style={{ margin: "12px 0 10px 0" }}>Топ-5 користувачів</h4>
              <table style={{ width: "100%", fontSize: 15, borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ textAlign: "left", padding: 6 }}>ID</th>
                    <th style={{ textAlign: "left", padding: 6 }}>Кількість замовлень</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.top_users.slice(0, 5).map(user => (
                    <tr key={user.userId}>
                      <td style={{ padding: 6 }}>ID {user.userId}</td>
                      <td style={{ padding: 6 }}>{user.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- АДМІН-ПАНЕЛЬ --- */}
      <div style={{
        width: "100%",
        maxWidth: 800,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        borderRadius: 12,
        padding: 32,
        marginBottom: 40,
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Адмін-панель: Товари</h2>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <input
            name="name"
            placeholder="Назва"
            value={form.name}
            onChange={handleChange}
            required
            style={{ flex: "1 1 120px", padding: 7, borderRadius: 6, border: "1px solid #d0d7de" }}
          />
          <input
            name="price"
            placeholder="Ціна"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            style={{ flex: "1 1 80px", padding: 7, borderRadius: 6, border: "1px solid #d0d7de" }}
          />
          <input
            name="desc"
            placeholder="Опис"
            value={form.desc}
            onChange={handleChange}
            required
            style={{ flex: "2 1 200px", padding: 7, borderRadius: 6, border: "1px solid #d0d7de" }}
          />
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            required
            style={{ flex: "1 1 100px", padding: 7, borderRadius: 6, border: "1px solid #d0d7de" }}
          >
            {GENDERS.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={{ flex: "1 1 100px", padding: 7, borderRadius: 6, border: "1px solid #d0d7de" }}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            name="img"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required={!editingItem}
            style={{ flex: "1 1 160px" }}
          />
          {preview && (
            <div style={{ margin: "10px 0", flexBasis: "100%", textAlign: "center" }}>
              <img
                src={
                  preview.startsWith("http")
                    ? preview
                    : (() => {
                        try {
                          return require(`../img/${preview}`).default;
                        } catch {
                          return `/img/${preview}`;
                        }
                      })()
                }
                alt="Фото товару"
                width={100}
                style={{ borderRadius: 8, border: "1px solid #eee" }}
              />
            </div>
          )}
          <button
            type="submit"
            style={{
              background: "#0969da",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 20px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {editingItem ? "Зберегти" : "Додати"}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                setForm({
                  name: "",
                  price: "",
                  desc: "",
                  sex: "",
                  category: "",
                  img: "",
                });
                setPreview("");
                setError("");
              }}
              style={{
                marginLeft: 8,
                background: "#d0d7de",
                color: "#444",
                border: "none",
                borderRadius: 6,
                padding: "8px 20px",
                cursor: "pointer"
              }}
            >
              Скасувати
            </button>
          )}
          {error && <div style={{ color: "red", flexBasis: "100%", textAlign: "center" }}>{error}</div>}
        </form>
      </div>

      <div style={{
        width: "100%",
        maxWidth: 1000,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        borderRadius: 12,
        padding: 24,
        overflowX: "auto"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 16,
        }}>
          <thead>
            <tr style={{ background: "#f6f8fa" }}>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Фото</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Назва</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Ціна</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Опис</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Стать</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Категорія</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ececec" }}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              let imgSrc = "";
              if (item.img) {
                if (item.img.startsWith("http") || item.img.startsWith("/")) {
                  imgSrc = item.img;
                } else {
                  try {
                    imgSrc = require("../img/" + item.img).default;
                  } catch {
                    imgSrc = "";
                  }
                }
              }
              return (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: 8, textAlign: "center" }}>
                    {imgSrc && (
                      <img 
                        src={imgSrc} 
                        alt="товар" 
                        width={48} 
                        height={48} 
                        style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #e0e0e0" }} 
                      />
                    )}
                  </td>
                  <td style={{ padding: 8 }}>{item.name}</td>
                  <td style={{ padding: 8 }}>{item.price}</td>
                  <td style={{ padding: 8 }}>{item.desc}</td>
                  <td style={{ padding: 8 }}>{item.sex}</td>
                  <td style={{ padding: 8 }}>{item.category}</td>
                  <td style={{ padding: 8 }}>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        background: "#fff",
                        border: "1px solid #d0d7de",
                        color: "#0969da",
                        borderRadius: 6,
                        padding: "4px 12px",
                        marginRight: 6,
                        cursor: "pointer",
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        background: "#fff",
                        border: "1px solid #f44336",
                        color: "#f44336",
                        borderRadius: 6,
                        padding: "4px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;