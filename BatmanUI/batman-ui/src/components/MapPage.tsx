import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
    state = { 
      viewport: {
          latitude:50.606791,
          longitude:3.511739,
          zoom:8,
      }
    }
  
    onViewportChange = (viewport:any) => {
      this.setState({viewport})
    } 
  
    render () { 
      const { viewport } = this.state
      return ( 
        <ReactMapGL
          className="MapContainer"
          {...viewport}
          width='99%'
          height='80vh'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={viewport => this.onViewportChange(viewport)}
        />
      ) 
    } 
  }

export default Map;