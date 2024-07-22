// src/App.js
import React, { useState } from 'react';
import MapComponent from './MapComponent';

const cities = {
  NewYork: { lat: 40.730610, lng: -73.935242 },
  Chicago: { lat: 41.881832, lng: -87.623177 },
  Boston: { lat: 42.361145, lng: -71.057083 },
  Oakland: { lat: 37.804363, lng: -122.271111 },
};

function App() {
  const [selectedCity, setSelectedCity] = useState('NewYork');

  return (
    <div>
      <header>
        <h1>Parish Churches Map</h1>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {Object.keys(cities).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </header>
      <MapComponent coordinates={cities[selectedCity]} city={selectedCity} />
    </div>
  );
}

export default App;
