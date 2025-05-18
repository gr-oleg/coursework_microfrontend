import React, { useEffect, useState } from "react";

// Фіксовані адміністратор та API_URL
const isAdmin = true;
const API_URL = "http://51.21.3.167";

// Можливі опції для статі, категорії
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

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    gender: "",
    category: "",
    photo: "",
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  // Оновлений endpoint для отримання списку товарів
  const fetchItems = () => {
    fetch(`${API_URL}/item/getAll`)
      .then(r => r.json())
      .then(setItems);
  };

  useEffect(() => {
    fetchItems();
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
      description: item.description || "",
      gender: item.gender || "",
      category: item.category || "",
      photo: item.photo || "",
    });
    setPreview(item.photo || "");
    setError("");
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files.length > 0) {
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
      setForm(f => ({ ...f, photo: url }));
      setPreview(url);
      setError("");
    } catch (e) {
      setError("Помилка завантаження фото");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    for (const key of ["name", "price", "description", "gender", "category", "photo"]) {
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
            description: "",
            gender: "",
            category: "",
            photo: "",
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
            description: "",
            gender: "",
            category: "",
            photo: "",
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
            name="description"
            placeholder="Опис"
            value={form.description}
            onChange={handleChange}
            required
            style={{ flex: "2 1 200px", padding: 7, borderRadius: 6, border: "1px solid #d0d7de" }}
          />
          <select
            name="gender"
            value={form.gender}
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
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required={!editingItem}
            style={{ flex: "1 1 160px" }}
          />
          {preview && (
            <div style={{ margin: "10px 0", flexBasis: "100%", textAlign: "center" }}>
              <img src={preview} alt="Фото товару" width={100} style={{ borderRadius: 8, border: "1px solid #eee" }} />
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
                  description: "",
                  gender: "",
                  category: "",
                  photo: "",
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
            {items.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: 8, textAlign: "center" }}>
                  {item.photo && (
                    <img 
                      src={item.photo} 
                      alt="товар" 
                      width={48} 
                      height={48} 
                      style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #e0e0e0" }} 
                    />
                  )}
                </td>
                <td style={{ padding: 8 }}>{item.name}</td>
                <td style={{ padding: 8 }}>{item.price}</td>
                <td style={{ padding: 8 }}>{item.description}</td>
                <td style={{ padding: 8 }}>{item.gender}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;