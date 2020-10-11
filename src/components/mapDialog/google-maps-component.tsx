import React from 'react';
import { GoogleMap, Polyline } from '@react-google-maps/api';
// Components
import ScriptLoaded from './script-loaded';
// TYPES
import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';

export interface IPositionsForGoogleMaps {
  lat: number;
  lng: number;
}
export type FourElementArray<T> = [T, T, T, T];

export interface GoogleMapsComponentProps {
  currentlySelectedRoute: IRoutedData;
}

export const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({
  currentlySelectedRoute
}) => {
  let positionsForGoogleMap: FourElementArray<number>[] = JSON.parse(
    currentlySelectedRoute.points
  ) as FourElementArray<number>[];
  let polylinesWithHeatMap: React.ReactElement[] = [];
  const containerStyle = {
    width: '100%',
    height: '400px'
  };
  const polylineOptions = (
    color: string,
    paths: IPositionsForGoogleMaps[]
  ) => ({
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths,
    zIndex: 1
  });

  if (currentlySelectedRoute) {
    polylinesWithHeatMap = positionsForGoogleMap.map(
      (position, index, positionsArray) => {
        const [lng, lat, , knots] = position;
        if (index > 0) {
          const [prevLng, prevLat, ,] = positionsArray[index - 1];
          const newPath = [
            { lat: prevLat, lng: prevLng },
            { lat, lng }
          ];
          return (
            <Polyline
              path={newPath}
              options={polylineOptions(
                knots < 15 ? '#FF0000' : '#008000',
                newPath
              )}
            />
          );
        } else {
          const newPath = [
            { lat, lng },
            { lat, lng }
          ];
          return (
            <Polyline
              path={newPath}
              options={polylineOptions(
                knots < 15 ? '#FF0000' : '#008000',
                newPath
              )}
            />
          );
        }
      }
    );
  }

  const [startingLng, startingLat] = positionsForGoogleMap[0] ?? [0, 90, 0, 0];

  const center = {
    lat: startingLat,
    lng: startingLng
  };

  return (
    <ScriptLoaded>
      <GoogleMap
        id="maker"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
      >
        {polylinesWithHeatMap}
      </GoogleMap>
    </ScriptLoaded>
  );
};

export default React.memo(GoogleMapsComponent);
