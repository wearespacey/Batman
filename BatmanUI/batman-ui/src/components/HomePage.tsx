import React from 'react';
import logo from '../assets/logobig.png';
import '../App.css';


const Batman: React.FC = () => {
  return (
    <div className="HomePage">
        <img src={logo} className="HomePageLogo" alt="logo" />
        <p>
          S'informer, observer, protéger...
        </p>
    </div>
  );
}

export default Batman;