import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom Marker Icon using Lucide
const createCustomIcon = (color) => {
  const iconMarkup = renderToStaticMarkup(
    <div className={`relative flex items-center justify-center`}>
      <div className={`absolute h-8 w-8 rounded-full ${color} opacity-20 animate-ping`}></div>
      <div className={`relative flex h-10 w-10 items-center justify-center rounded-full ${color} text-white shadow-lg border-2 border-white/20`}>
        <Navigation size={20} className="rotate-45" />
      </div>
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-marker-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Component to handle map center updates
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const LiveMap = ({ telemetry }) => {
  const position = [telemetry.latitude, telemetry.longitude];
  const isAccident = telemetry.is_accident;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mb-8 h-[500px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
    >
      <div className="absolute top-6 left-6 z-[1000] space-y-2">
        <div className="glass-panel inline-flex items-center gap-3 px-4 py-2 rounded-xl">
          <div className="h-2 w-2 rounded-full bg-accent-blue animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-white">Live Tracking</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-[1000]">
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${telemetry.latitude},${telemetry.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-dark-900 shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <MapPin size={14} />
          Route on Google Maps
        </a>
      </div>

      <MapContainer 
        center={position} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <ChangeView center={position} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <Polyline 
          positions={telemetry.path} 
          color="#00e5ff" 
          weight={4} 
          opacity={0.6}
          dashArray="10, 10"
        />

        <Marker 
          position={position} 
          icon={createCustomIcon(isAccident ? 'bg-accent-red' : 'bg-accent-blue')}
        >
          <Popup className="custom-popup">
            <div className="p-1">
              <p className="font-bold">Current Location</p>
              <p className="text-xs text-gray-400">{telemetry.latitude.toFixed(4)}, {telemetry.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
};

export default LiveMap;
