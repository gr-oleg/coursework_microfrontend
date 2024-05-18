import React, { Component } from 'react'
import '../app.css'

export class App extends Component {
  clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();

  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <button className='btn' onClick={this.clearLocalStorage}>Exit</button>
      </div>
    )
  }
}

export default App