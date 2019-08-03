import React from 'react';
import logo from '../../assets/logo.svg';
import '../../App.css';
import './Batman.css';

const Batman: React.FC = () => {
  return (
    <div className="Batman">
        <img src={logo} className="BatmanLogo" alt="logo" />
        <p>
          Na, na, na, na, na, na, na, na, na, na, na, na, na... BATMAN !
        </p>
    </div>
  );
}

export default Batman;