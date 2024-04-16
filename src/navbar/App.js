import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import './app.css'


const App = () => {
  return (
    <Router>
      <Navbar />
      <h1>Welcome to the App!</h1>
    </Router>
  );
};

export default App;