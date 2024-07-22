// src/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import img from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CHURCH_ICON_URL = '/images/church-icon.png';

const ChangeMapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);
  
    return null;
}

const MapComponent = ({ coordinates }) => {
    const [churches, setChurches] = useState([]);
  
    useEffect(() => {
      const fetchChurches = async () => {
        try {
          const response = await axios.get(`https://apiv4.updateparishdata.org/Churchs/?lat=${coordinates.lat}&long=${coordinates.lng}&pg=1`);
          setChurches(response.data);
        } catch (error) {
          console.error("Error fetching church data:", error);
        }
      };
  
      fetchChurches();
    }, [coordinates]);
  
    const churchIcon = new img.Icon({
      iconUrl: CHURCH_ICON_URL,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32], 
    });
  
    return (
      <MapContainer center={coordinates} zoom={12} style={{ height: "100vh", width: "100%" }}>
        <ChangeMapView center={coordinates} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {churches.map((church) => (
          <Marker
            key={church.id}
            position={[church.latitude, church.longitude]}
            icon={churchIcon}
          >
            <Popup>
              <strong>{church.name}</strong><br />
              Address: {church.church_address_street_address}<br />
              Phone: {church.phone_number}<br />
              <strong>{church.url && <a href={church.url}>Visit Website</a>}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
}

export default MapComponent;
