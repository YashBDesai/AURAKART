import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// 🇮🇳 Default India map center
const indiaCenter = {
  lat: 22.9734,
  lng: 78.6569,
};

function ProductMap() {
  const [apiKey, setApiKey] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // 🔑 Fetch API key from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/google-maps-key")
      .then((res) => res.json())
      .then((data) => setApiKey(data.apiKey))
      .catch((err) => console.error("Failed to fetch API key", err));
  }, []);

  // 📍 Triggered when user clicks "My Location"
  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("You denied location access. Map will stay at India.");
          } else {
            alert("Error getting your location.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return apiKey ? (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || indiaCenter}
          zoom={userLocation ? 13 : 5}
        >
          {/* 📍 Marker only if user location is available */}
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript>

      {/* 🧭 Button to get current location */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleMyLocation}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          📍 My Location
        </button>
      </div>
    </div>
  ) : (
    <p>Loading map...</p>
  );
}

export default ProductMap;
