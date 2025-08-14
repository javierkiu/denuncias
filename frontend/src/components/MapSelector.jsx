import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

const CountryBounds = [
  [-5.01, -92.01], // Southwest corner
  [2.26, -75.19],  // Northeast corner
]
function LocationMarker({ onLocationSelected }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelected(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapSelector({ onLocationSelected }) {
  return (
    <MapContainer 
        center={[1.83, -78.18]} 
        zoom={2} 
        style={{ 
            height: "600px", 
            width: "60%",
        }}
        maxBounds={CountryBounds}
        maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelected={onLocationSelected} />
    </MapContainer>
  );
}
