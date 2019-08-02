import React from 'react';
import logo from './logo.svg';
import './App.css';

const Batman: React.FC = () => {
  return (
    <div className="Batman">
      <header className="Batman">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Na, na, na, na, na, na, na, na, na, na, na, na, na... BATMAN !
        </p>
      </header>
    </div>
  );
}

export default Batman;