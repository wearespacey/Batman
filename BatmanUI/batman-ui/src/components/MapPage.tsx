import React, { Component, MouseEvent } from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl, Marker} from 'react-map-gl';
import logo from '../assets/logo.svg';
import Api from '../services/api';
import BoxLocation from '../models/boxLocation';

type MapState = {
  viewport: {
    latitude:number,
    longitude:number,
    zoom:number,
  },
  locations: BoxLocation[]
}

type MapProps = {

}

class Map extends Component<{}, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      viewport: {
        latitude:50.606791,
        longitude:3.511739,
        zoom:8,
      },
      locations: []
    };
    this.getCurrentLocations();
  }

  onViewportChange = (viewport:any) => {
    this.setState({viewport})
  } 

  async getCurrentLocations() {
    const locations = await Api.getCurrentLocations();
    this.setState({locations:locations});
  }

  render () { 
    const { viewport } = this.state
    return ( 
      <ReactMapGL
        className="MapContainer"
        {...viewport}
        width='99%'
        height='80vh'
        mapStyle='mapbox://styles/xvercruysse/cjyvncqik17as1cp8vz740l9l'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => this.onViewportChange(viewport)}>
          <GeolocateControl 
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
          />
          <div style={{position: 'absolute', right: 0}}>
            <NavigationControl />
          </div>
          {this.state.locations.map(l => {return <BoxMarker latitude={Number(l.latitude)} longitude={Number(l.longitude)}/>})}

      </ReactMapGL>
    ) 
  } 
}

type BoxProps = {
  latitude: number;
  longitude: number;
}

class BoxMarker extends Component<BoxProps> {
  constructor(props: BoxProps) {
    super(props);
  }

  handleClick(event: MouseEvent) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }
  
  render() {
    return (
      <Marker latitude={this.props.latitude} longitude={this.props.longitude} offsetLeft={0} offsetTop={0}>
        <img className="boxLocationMarker" src={logo} onClick={this.handleClick} />
      </Marker>
    );
  }
}

export default Map;