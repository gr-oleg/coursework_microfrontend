import React, { Component } from 'react'
import './profile.css'
import avatar from '../../public/img/image.png';
import { TbLogout } from "react-icons/tb";

export class App extends Component {
  clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();

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
           placeholder="+380989898989" 
           id="phone" 
           name="phone"
           required 
           onKeyPress={(event) => {
                if (!/[0-9+]/.test(event.key)) {
                    event.preventDefault();
                }
            }}
          />
          <button className="submit">&#10003;</button>
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