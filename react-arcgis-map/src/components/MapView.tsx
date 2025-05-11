// src/components/MapView.tsx

// These imports provide the core functionality:
// - useRef, useEffect: React hooks for DOM references and lifecycle management
// - useAuth: Our custom hook for accessing authentication information
// - ArcGIS modules: Essential components for creating and configuring the map
import { useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

// Import the CSS for the ArcGIS API - this is essential for the map to display correctly
import '@arcgis/core/assets/esri/themes/light/main.css';
import './MapView.css'; // We'll create this file for additional styling

export const MapViewComponent = () => {
  // Get authentication information
  const { user, logout } = useAuth();
  
  // Create a reference to the map container div
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Store the MapView instance for cleanup
  const viewRef = useRef<MapView | null>(null);
  
  useEffect(() => {
    // Initialize the map only when the component mounts and mapRef is available
    if (mapRef.current) {
      // Create a new Map instance with a basemap
      const map = new Map({
        basemap: 'topo-vector' // Other options: 'satellite', 'hybrid', 'streets', etc.
      });
      
      // Create a new MapView instance
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-100, 40], // Longitude, latitude
        zoom: 4 // Initial zoom level
      });
      
      // Add a point of interest as an example
      const point = new Point({
        longitude: -100,
        latitude: 40
      });
      
      const markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40], // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 2
        },
        size: 12
      });
      
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: new PopupTemplate({
          title: "Example Location",
          content: "This is a sample point of interest. In a real application, this could show data from your API."
        })
      });

      // Create a feature layer with public data
      const featureLayer = new FeatureLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Earthquake_Data/FeatureServer/0',
        outFields: ['*'],
        popupTemplate: {
          title: 'Magnitude {mag} Earthquake',
          content: 'Location: {place}<br>Date: {time:DateString}<br>Depth: {depth} km'
        }
      });
      // Add the layer to the map
      map.add(featureLayer);
      
      // Add the graphic to the map view
      view.graphics.add(pointGraphic);
      
      // Store the view reference for cleanup
      viewRef.current = view;
      
      // Optional: Add user location if they grant permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          
          // Create a point for user's location
          const userLocationPoint = new Point({
            longitude,
            latitude
          });
          
          // Create a symbol for user's location
          const userLocationSymbol = new SimpleMarkerSymbol({
            color: [0, 122, 194], // Blue
            outline: {
              color: [255, 255, 255], // White
              width: 2
            },
            size: 12
          });
          
          // Create a graphic for user's location
          const userLocationGraphic = new Graphic({
            geometry: userLocationPoint,
            symbol: userLocationSymbol,
            popupTemplate: new PopupTemplate({
              title: "Your Location",
              content: "You are here!"
            })
          });
          
          // Add the graphic to the map view
          view.graphics.add(userLocationGraphic);
          
          // Center the map on user's location
          view.goTo({
            target: userLocationPoint,
            zoom: 8
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Continue without user location if permission is denied
        }
      );
    }
    
    // Cleanup function to destroy the map when component unmounts
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount
  
  return (
    <div className="map-container">
      <div className="user-bar">
        <p>Welcome, {user?.username}!</p>
        <button onClick={logout} className="logout-button">Log Out</button>
      </div>
      
      <div ref={mapRef} className="map-view"></div>
    </div>
  );
};