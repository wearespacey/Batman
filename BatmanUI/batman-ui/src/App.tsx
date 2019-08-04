import React, { Component } from 'react';
import './App.css';
import HomePage from "./components/HomePage";
import MapPage from "./components/MapPage";
import UploadPage from "./components/UploadPage";
import AddLocationPage from "./components/addLocation/AddLocationPage";
import Footer from './components/Footer';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import 'filepond/dist/filepond.min.css'; //  IMPORT TO CSS FILE
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="topnav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/map">Map</Link>
              <Link className="nav-link" to="/add">Add a location</Link>
              <Link className="nav-link" to="/upload">Upload files</Link>
            </nav>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/map" component={MapPage} />
              <Route exact path="/add" component={AddLocationPage} />
              <Route exact path="/upload" component={UploadPage} />
            </Switch>
          </div>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
