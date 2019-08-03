import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

type MapState = {
    lat: number;
    lng: number;
    zoom: number;
}

class LeafletMap extends Component<{}, MapState> {
  constructor(props:any) {
    super(props)
    this.state = {
      lat: 50.606696,
      lng: 3.511778,
      zoom: 13
    }
  }

  render() {
    return (
      <Map id="MapId" center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[this.state.lat, this.state.lng]}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

class MapComponent extends Component {
    render() {
        return(
            <div className="MapPage">
                <LeafletMap/>
            </div>
        );
    }
}

export default MapComponent;