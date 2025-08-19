import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

const CountryBounds = [
  [-5.01, -92.01], // Southwest corner
  [2.26, -75.19],  // Northeast corner
]

function LocationMarker({ position }) {
  if (!position) return null;

  return <Marker position={position}/>;
}

const SearchControl= ({setPosition}) => {
  const map = useMap();

  useEffect(()=> {
    const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  }).on('markgeocode', function(e) {
      const {center} = e.geocode;
      map.setView(center, 16);
      setPosition([center.lat, center.lng]);
    }).addTo(map);

    return () => map.removeControl(geocoder);
  }, [map, setPosition]);

  return null;
}

const MapClick = ({setPosition}) => {
  useMapEvents({
    click(e) {
      const {lat, lng} = e.latlng;
      setPosition([lat, lng]);
    }
  });
  return null;
}

export default function MapSelector({ onLocationSelected }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (position) {
      onLocationSelected(position[0], position[1]);
    }
  }, [position, onLocationSelected]);

  return (
    <MapContainer 
        center={[-2.170998, -79.922359]} 
        zoom={12} 
        minZoom={5}
        maxBounds={CountryBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "calc(100vh - 67.59px)", width: "65%", }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl setPosition={setPosition}/>
      <MapClick setPosition={setPosition}/>
      <LocationMarker position={position} />
    </MapContainer>
  );
}
