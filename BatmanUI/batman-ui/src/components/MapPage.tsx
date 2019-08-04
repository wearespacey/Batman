import React, { MouseEvent, FunctionComponent, useState } from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl, Marker, Popup} from 'react-map-gl';
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
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => onViewportChange(viewport)}>
      <GeolocateControl 
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
      />
      <div style={{position: 'absolute', right: 0}}>
        <NavigationControl />
      </div>
      {console.log("A map has been rendered")}
      {boxes.map(l => {return <BoxMarker key={String(l.boxId)} {...l}/>})}
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

  function BoxDetails(props:BoxLocation) {
    const[box, setBox] = useState(props);
    return <Popup latitude={Number(box.latitude)} longitude={Number(box.longitude)} closeOnClick={true} onClose={() => setShowPopup(false)} >
      <div className="PopupContent">Ceci est un popup</div>
      {console.log("A popup has been rendered")}
    </Popup>
  }

  return (
    <div>
      <Marker latitude={Number(box.latitude)} longitude={Number(box.longitude)} offsetLeft={0} offsetTop={0}>
        <img className="boxLocationMarker" src={logo} alt={"box marker"} onClick={handleClick} />
      </Marker>
      {console.log("A marker has been rendered")}
      {showPopup && <BoxDetails { ...box} />}
    </div>
  );
}

export default Map;