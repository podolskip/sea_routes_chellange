import React from 'react';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import ScriptLoaded from './script-loaded';

export interface IPositionsForGoogleMaps {
  lat: number;
  lng: number;
}

export interface GoogleMapsComponentProps {
  positionsForGoogleMap: IPositionsForGoogleMaps[];
}

export const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({
  positionsForGoogleMap
}) => {
  const [firstPosition] = positionsForGoogleMap;

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  // check how it works
  const center = {
    lat: firstPosition.lat,
    lng: firstPosition.lng
  };

  const path = [...positionsForGoogleMap];

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [...positionsForGoogleMap],
    zIndex: 1
  };

  return (
    <ScriptLoaded>
      <GoogleMap
        id="maker"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
      >
        <Polyline path={path} options={options} />
      </GoogleMap>
    </ScriptLoaded>
  );
};

export default React.memo(GoogleMapsComponent);
