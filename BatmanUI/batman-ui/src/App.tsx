import React, { Component } from 'react';
import './App.css';
import NavTabs from './components/NavTabs';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './components/Footer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#282c34',
    },
    secondary: {
      main: '#b71c1c',
    },
  },
});
//TODO use react-router-dom
class App extends Component {
  render() {
    return(
      <ThemeProvider theme={theme}>
        <NavTabs/>
        <Footer/>
      </ThemeProvider>
    )
  }
}


export default App;