import React, { Component } from 'react';
import './App.css';
import NavTabs from './components/NavTabs';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'filepond/dist/filepond.min.css'; //  IMPORT TO CSS FILE
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#282c34'
    },
    secondary: {
      main: '#b71c1c'
    }
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavTabs />
      </ThemeProvider>
    );
  }
}

export default App;
