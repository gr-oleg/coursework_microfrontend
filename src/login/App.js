import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login.jsx';
import '../app.css'


const App = () => {
  return (
    <Router>
      <Login />
    </Router>
  );
};

export default App;