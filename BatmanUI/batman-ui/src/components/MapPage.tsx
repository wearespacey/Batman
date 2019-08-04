import React, { MouseEvent, FunctionComponent, useState } from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl, Marker, Popup} from 'react-map-gl';
import logo from '../assets/logo.svg';
import Api from '../services/api';
import BoxLocation from '../models/boxLocation';
import { get } from 'https';

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
      onViewportChange={viewport => onViewportChange(viewport)}
      onLoad={getCurrentBoxes}>
      <GeolocateControl 
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
      />
      <div style={{position: 'absolute', right: 0}}>
        <NavigationControl />
      </div>
      {boxes.map(l => {return <BoxMarker key={String(l.boxId)} {...l}/>})}
    </ReactMapGL>
  );
}

type PopupProps = {
  box: BoxLocation,
  onCloseCallback: (show:boolean) => void
}

function BoxMarker(props:BoxLocation) {
    const[box, setBox] = useState(props);
    const[showPopup, setShowPopup] = useState(false);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowPopup(true);
  }

  const popupProps:PopupProps = {
    box: box,
    onCloseCallback: setShowPopup
  }

  return (
    <div>
      <Marker latitude={Number(box.latitude)} longitude={Number(box.longitude)} offsetLeft={0} offsetTop={0}>
        <img className="boxLocationMarker" src={logo} alt={"box marker"} onClick={handleClick} />
      </Marker>
      {showPopup && <BoxDetails { ...popupProps} />}
    </div>
  );
}

function BoxDetails(props:PopupProps) {
  const[box, setBox] = useState(props.box);
  return <Popup latitude={Number(box.latitude)} longitude={Number(box.longitude)} closeOnClick={true} captureScroll={true} onClose={() => props.onCloseCallback(false)} >
    <div className="PopupContent">Ceci est un popup</div>
  </Popup>
}

export default Map;