// src/NasaGibsMap.js
import React, { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import './NasaGibsMap.css'; // Import the external CSS for styling

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
        styles: [/* Optional: Custom Google Maps styles for a clean look */],
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
      <div class="info-window">
        <input id="customText" class="info-input" type="text" value="${marker.text}" />
        <button id="saveButton" class="info-btn">Save</button>
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
    <div className="container">
      <h1 className="main-title">NASA GIBS Map with Aerosol Optical Depth</h1>
      <div ref={mapRef} className="map-container"></div>

      {/* Image Gallery Section */}
      <div className="gallery-container">
        <h2>Image Gallery</h2>
        <div className="image-gallery">
          <div className="image-item">
            <img src="img/amazon.jpeg" alt="Image 1 Description" />
            <p><strong>Image 1:</strong> Incident: In 2019, the Amazon rainforest experienced a record number of wildfires, partly due to deforestation and land-clearing practices, exacerbated by a changing climate. These fires emitted large amounts of CO into the atmosphere.
Consequences: CO emissions from the fires reached as far as neighboring countries like Brazil and Peru. Health problems related to smoke inhalation and CO exposure were reported, particularly in rural areas with limited healthcare infrastructure. The fires also released vast quantities of CO₂ and contributed to global climate change.
Cause: The combination of climate change-induced dry conditions and human activities led to increased fire activity and higher CO emissions in the Amazon.</p>
          </div>
          <div className="image-item">
            <img src="img/lake.jpg" alt="Image 2 Description" />
            <p><strong>Image 2:</strong> Incident: One of the most well-known cases of CO2 contamination occurred at Lake Nyos, a volcanic crater lake in Cameroon. On August 21, 1986, a limnic eruption released a massive amount of CO2, estimated at over 1.6 million tons, from the lake into the atmosphere.
Consequences: The CO2 cloud, being denser than air, displaced oxygen in the surrounding valleys and suffocated approximately 1,700 people and thousands of livestock within a 25 km radius. The cloud traveled silently, killing people and animals in their sleep.
Cause: CO2 accumulated in the bottom of the lake from volcanic activity and was suddenly released, probably due to a landslide or seismic activity.</p>
          </div>
          <div className="image-item">
            <img src="img/methane.jpg" alt="Image 3 Description" />
            <p><strong>Image 3:</strong> Methane Leaks from Natural Gas Infrastructure:

Various incidents have been reported worldwide, where aging pipelines and infrastructure have leaked methane into the atmosphere. For example, the 2015 Aliso Canyon gas leak in California released around 97,000 metric tons of methane over several months, significantly impacting air quality and contributing to climate change.</p>
          </div>
          <div className="image-item">
            <img src="/img/farming.jpeg" alt="Image 4 Description" />
            <p><strong>Image 4:</strong> N₂O from Industrial Processes:

Certain industrial processes, such as the production of nitric acid and nylon, emit significant amounts of nitrous oxide. For example, emissions from the production of nitric acid have contributed to global N₂O levels, leading to regulatory measures in various countries to mitigate these emissions.
N₂O from Industrial Processes:

Certain industrial processes, such as the production of nitric acid and nylon, emit significant amounts of nitrous oxide. For example, emissions from the production of nitric acid have contributed to global N₂O levels, leading to regulatory measures in various countries to mitigate these emissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NasaGibsMap;
