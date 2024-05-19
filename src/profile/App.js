import React, { Component } from 'react'
import './profile.css'
import avatar from '../../public/img/image.png';
import { TbLogout } from "react-icons/tb";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      email: localStorage.getItem('userEmail'),
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    const login = { phoneNumber: this.state.phoneNumber };
    if (this.state.phoneNumber.trim() === "") {
      alert("Please fill in phone number.");
      return;
    } else {
      console.log(login);
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
          }
        })
        .catch((error) => {
            alert(error.message);
            console.error("Error:", error);
        });
  }};

  clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  render() {
    return (
      <div className="profile">
        <div className="avatar">
          <div className="avatar-wrapper">
            <img src={avatar}/>
          </div>
        </div>
        <div className="body">
          <p>Name: {localStorage.getItem('userName')}</p>
          <p>Email: {localStorage.getItem('userEmail')}</p>
          <p>
            Phone Number: &nbsp;
            <input 
              type="tel" 
              placeholder={(localStorage.getItem('userPhoneNumber') === 'null' || localStorage.getItem('userPhoneNumber') === null) ? "380" : localStorage.getItem('userPhoneNumber')}
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
            <button className="submit" onClick={this.handleClick}>&#10003;</button>
          </p>
          <button className='delete'>Delete account</button>
        </div>
        <div className="bodyexit">
          <button className='exit' onClick={this.clearLocalStorage}>Exit<TbLogout /></button>
        </div>
      </div>
    )
  }
}

export default App