import React, { Component, MouseEvent, FunctionComponent, useState } from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl, Marker, Popup} from 'react-map-gl';
import logo from '../assets/logo.svg';
import Api from '../services/api';
import BoxLocation from '../models/boxLocation';
import { BoxAlignProperty } from 'csstype';

type MapState = {
  viewport: {
    latitude:number,
    longitude:number,
    zoom:number,
  },
  locations: BoxLocation[]
}

const Map: FunctionComponent<{initial?: MapState}> = ({
  initial = {
    viewport: {
      latitude:50.606791,
      longitude:3.511739,
      zoom:8,
    },
    locations: []
  }
}) => {
  
  const[viewport, setViewport] = useState(initial.viewport);
  const[boxes, setBoxes] = useState(initial.locations);

  const getCurrentBoxes = async () => {
    const locations = await Api.getCurrentLocations();
    setBoxes(locations);
  };

  getCurrentBoxes();

  const onViewportChange = (viewport:any) => {
    setViewport(viewport);
  } 

  return ( 
    <ReactMapGL
      className="MapContainer"
      {...viewport}
      width='99%'
      height='80vh'
      mapStyle='mapbox://styles/xvercruysse/cjyvncqik17as1cp8vz740l9l'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => onViewportChange(viewport)}>
      <GeolocateControl 
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
      />
      <div style={{position: 'absolute', right: 0}}>
        <NavigationControl />
      </div>
      {boxes.map(l => {return <BoxMarker {...l}/>})}
    </ReactMapGL>
  );
}

function BoxMarker(props:BoxLocation) {
    const[box, setBox] = useState(props);
    const[showPopup, setShowPopup] = useState(false);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowPopup(true);
  }

  return (
    <div>
      <Marker latitude={Number(box.latitude)} longitude={Number(box.longitude)} offsetLeft={0} offsetTop={0}>
        <img className="boxLocationMarker" src={logo} alt={"box marker"} onClick={handleClick} />
      </Marker>
      {showPopup && <BoxDetails { ...box} />}
    </div>
  );
}

//Popup/Canvas as a hook
function BoxDetails(props:BoxLocation) {
  const[box, setBox] = useState(props);
  return <Popup latitude={Number(box.latitude)} longitude={Number(box.longitude)} closeButton={true} >Ceci est un popup</Popup>
}

export default Map;