import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import Content from './Content';
import Footer from './Footer';

class App extends Component {
  render() {
    return(
      <div>
        <Menu/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}


export default App;