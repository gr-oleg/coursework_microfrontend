import React, { Component } from 'react'
import './profile.css'
import avatar from '../img/image.png';
import { TbLogout } from "react-icons/tb";
import { FaTrashAlt, FaCheck, FaShoppingCart, FaEye } from "react-icons/fa";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      email: localStorage.getItem('userEmail'),
      id: localStorage.getItem('userId'),
      historyViewed: [],
      historyOrders: [],
      loadingViewed: true,
      loadingOrders: true,
      error: "",
    };
  }

  componentDidMount() {
    this.fetchHistory();
    this.fetchOrdersAndItems();
  }

  fetchHistory = () => {
    fetch(`http://13.51.198.24/history/viewed/${this.state.id}`)
      .then(res => res.json())
      .then(data => this.setState({ historyViewed: data || [], loadingViewed: false }))
      .catch(() => this.setState({ loadingViewed: false }));
  }

  fetchOrdersAndItems = async () => {
    this.setState({ loadingOrders: true });
    try {
      const ordersResp = await fetch("http://56.228.34.106/order/getAll");
      const allOrders = await ordersResp.json();
      const userId = localStorage.getItem('userId');
      const userOrders = allOrders.filter(order => String(order.idUser) === String(userId));
      const itemsResp = await fetch("http://16.171.137.58/item/getAll");
      const allItems = await itemsResp.json();
      const itemsMap = {};
      allItems.forEach(item => { itemsMap[item.id] = item; });
      const ordersWithItems = userOrders.map(order => {
        let idItemsArr = [];
        try {
          idItemsArr = JSON.parse(order.idItems);
        } catch (e) {
          idItemsArr = order.idItems
            .replace(/\[|\]/g, '')
            .split(',')
            .map(id => parseInt(id.trim()))
            .filter(Boolean);
        }
        const items = idItemsArr.map(id => itemsMap[id]).filter(Boolean);
        return {
          ...order,
          items,
        };
      });
      this.setState({
        historyOrders: ordersWithItems,
        loadingOrders: false,
        error: "",
      });
    } catch (error) {
      this.setState({ loadingOrders: false, error: "Не вдалося завантажити історію покупок" });
      console.error(error);
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    const login = { phoneNumber: this.state.phoneNumber };
    if (this.state.phoneNumber.trim() === "") {
      this.setState({ error: "Заповніть номер телефону!" });
      return;
    } else {
      fetch(`http://13.51.198.24/user/${this.state.email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(login),
      })
        .then((response) => {
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then((data) => {{
            if (typeof data === "object") {
                alert("Phone number updated successfully.");
                localStorage.setItem("userPhoneNumber", data.phoneNumber);
            } else {
                alert(data);
            }
            this.setState({ error: "" });
          }
        })
        .catch((error) => {
            this.setState({ error: error.message });
            console.error("Error:", error);
        });
  }};

  deleteClick = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`http://13.51.198.24/user/${this.state.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
      })
        .then((response) => {
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then((data) => {{
            if (typeof data === "object") {
                alert(data.message);
                localStorage.clear();
                window.location.reload();
            } else {
                alert(data);
                localStorage.clear();
                window.location.reload();
            }
          }
        })
        .catch((error) => {
            this.setState({ error: error.message });
            console.error("Error:", error);
        });
  }};

  clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value, error: "" });
  }

  render() {
    const { historyViewed, historyOrders, loadingViewed, loadingOrders, error } = this.state;
    return (
      <div className="profile-card">
        <button className="profile-btn profile-btn-logout" onClick={this.clearLocalStorage} title="Вийти">
          <TbLogout size={24} />
        </button>
        <div className="profile-avatar">
          <img src={avatar} alt="Avatar"/>
        </div>
        <div className="profile-info">
          <h2>{localStorage.getItem('userName') || 'User'}</h2>
          <div className="profile-field">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{localStorage.getItem('userEmail')}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Телефон:</span>
            <input
              className="profile-input"
              type="tel"
              placeholder={(localStorage.getItem('userPhoneNumber') === 'null' || localStorage.getItem('userPhoneNumber') === null) ? "+380" : localStorage.getItem('userPhoneNumber')}
              value={this.state.phoneNumber}
              name="phone"
              required
              onKeyPress={(event) => {
                if (!/[0-9+]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={this.handlePhoneNumberChange}
            />
            <button
              className="profile-btn profile-btn-success"
              title="Зберегти"
              onClick={this.handleClick}>
              <FaCheck />
            </button>
          </div>
          {error && <div className="profile-error">{error}</div>}
          <button className="profile-btn profile-btn-danger" onClick={this.deleteClick}>
            <FaTrashAlt style={{marginRight: 6}} /> Видалити акаунт
          </button>
        </div>

        <section className="profile-history">
          <h3><FaEye style={{marginRight: 5}}/>Історія переглядів</h3>
          {loadingViewed ? (
            <div className="profile-history-loading">Завантаження...</div>
          ) : (
            <ul>
              {historyViewed.length === 0 ? (
                <li className="profile-history-empty">Поки що немає переглядів.</li>
              ) : (
                historyViewed.map((item, idx) =>
                  <li key={item.id || idx} className="profile-history-item">
                    <img src={item.photo} alt="" className="history-thumb"/>
                    <span className="history-title">{item.name}</span>
                    <span className="history-date">{item.dateViewed ? (new Date(item.dateViewed)).toLocaleString() : ""}</span>
                  </li>
                )
              )}
            </ul>
          )}
        </section>

        <section className="profile-history profile-history-orders">
          <h3><FaShoppingCart style={{marginRight: 5}}/>Історія покупок</h3>
          {loadingOrders ? (
            <div className="profile-history-loading">Завантаження...</div>
          ) : (
            <ul className="profile-history-orders-list">
              {historyOrders.length === 0 ? (
                <li className="profile-history-empty">Поки що немає покупок.</li>
              ) : (
                historyOrders.map((order, idx) => (
                  <li key={order.id || idx} className="profile-history-order">
                    <div className="profile-order-header">
                      <span className="profile-order-title">Замовлення №{order.id}</span>
                      <span className="profile-order-total">{order.totalPrice}$</span>
                    </div>
                    <div className="profile-order-address">{order.address}</div>
                    <ul className="profile-order-items-list">
                      {order.items.length === 0 ? (
                        <li>Товарів не знайдено</li>
                      ) : (
                        order.items.map(item => (
                          <li key={item.id} className="profile-order-item">
                            <img src={item.photo} alt="" className="profile-order-thumb"/>
                            <span className="profile-order-name">{item.name}</span>
                            {item.price && <span className="profile-order-price">{item.price}$</span>}
                          </li>
                        ))
                      )}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          )}
        </section>
      </div>
    )
  }
}

export default App