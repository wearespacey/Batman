import React, { Component } from 'react';
import './App.css';
import NavTabs from './components/NavTabs';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

class App extends Component {
  render() {
    return(
      <ThemeProvider theme={theme}>
        <NavTabs/>
      </ThemeProvider>
    )
  }
}


export default App;