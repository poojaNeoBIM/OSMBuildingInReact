import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

declare global {
  interface Window { OSMBuildings: any; }
}

const MapComponent: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null); // Store the map instance
  
    useEffect(() => {
      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstance.current);
  
        if (window.OSMBuildings) {
          new window.OSMBuildings(mapInstance.current).load();
        }
      }
  
      // Cleanup function to prevent memory leaks
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }, []);
  
    return <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
  };
  
  export default MapComponent;