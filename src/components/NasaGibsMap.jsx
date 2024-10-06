// src/NasaGibsMap.js
import React, { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const NASA_GIBS_URL =
  "//gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Aerosol/default/2013-12-02/GoogleMapsCompatible_Level6/";

const libraries = ["places"]; // Load necessary Google Maps libraries

const NasaGibsMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // Store markers with text and position
  const [infoWindows, setInfoWindows] = useState([]); // Store active InfoWindows
  const mapRef = useRef();

  // Load the Google Maps script with API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBXJQ9KUyxq3WAaU8InwzUbWi1GMCiShco", // Replace with your Google Maps API key
    libraries,
  });

  // Initialize the map and NASA GIBS layer once Google Maps API is loaded
  useEffect(() => {
    if (isLoaded && !loadError) {
      const mapOptions = {
        center: { lat: 21, lng: 78 },
        zoom: 5,
        maxZoom: 6,
      };

      // Create the map instance once the script is loaded
      const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(mapInstance);

      // Define the tile layer with GIBS tiles
      const getTileUrl = (tile, zoom) => {
        return `${NASA_GIBS_URL}${zoom}/${tile.y}/${tile.x}.png`;
      };

      const layerOptions = {
        alt: "MODIS_Terra_Aerosol",
        getTileUrl: getTileUrl,
        maxZoom: 6,
        minZoom: 1,
        name: "MODIS_Terra_Aerosol",
        tileSize: new window.google.maps.Size(256, 256),
        opacity: 0.7,
      };

      // Insert the NASA GIBS layer into the map
      const imageMapType = new window.google.maps.ImageMapType(layerOptions);
      mapInstance.overlayMapTypes.insertAt(0, imageMapType);
    }
  }, [isLoaded, loadError]);

  // Handle adding custom text on map click
  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Create a new marker with default text
    const newMarker = { lat, lng, text: "Edit me!" };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

    // Open the new InfoWindow
    openInfoWindow(newMarker);
  };

  // Open InfoWindow for a marker
  const openInfoWindow = (marker) => {
    const infoWindow = new window.google.maps.InfoWindow();
    infoWindow.setPosition({ lat: marker.lat, lng: marker.lng });
    infoWindow.setContent(renderInfoWindowContent(marker));
    infoWindow.open(map);

    // Store the InfoWindow in state
    setInfoWindows((prevInfoWindows) => [...prevInfoWindows, infoWindow]);
  };

  // Render content for InfoWindow with editable input
  const renderInfoWindowContent = (marker) => {
    return `
      <div>
        <input id="customText" type="text" value="${marker.text}" />
        <button id="saveButton">Save</button>
      </div>
      <script>
        document.getElementById('saveButton').onclick = function() {
          const newText = document.getElementById('customText').value;
          window.ReactNativeWebView.postMessage(JSON.stringify({ lat: ${marker.lat}, lng: ${marker.lng}, text: newText }));
        }
      </script>
    `;
  };

  // Handle updates to marker text
  const updateMarkerText = (lat, lng, newText) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.lat === lat && marker.lng === lng ? { ...marker, text: newText } : marker
      )
    );

    // Also update any active InfoWindow
    infoWindows.forEach((infoWindow) => {
      const position = infoWindow.getPosition();
      if (position.lat() === lat && position.lng() === lng) {
        infoWindow.setContent(
          renderInfoWindowContent({
            ...markers.find(
              (marker) => marker.lat === lat && marker.lng === lng
            ),
            text: newText,
          })
        );
      }
    });
  };

  // Add click listener when the map is loaded
  useEffect(() => {
    if (map) {
      map.addListener("click", handleMapClick);
      window.addEventListener("message", (event) => {
        const { lat, lng, text } = JSON.parse(event.data);
        updateMarkerText(lat, lng, text);
      });
    }
  }, [map, markers]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading map</div>;
  }

  return (
    <div>
      <h1>NASA GIBS Map with Google Maps API</h1>
      <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default NasaGibsMap;
