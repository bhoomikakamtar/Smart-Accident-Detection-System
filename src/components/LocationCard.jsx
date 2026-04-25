import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const LocationCard = ({ latitude, longitude }) => {
  const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

  return (
    <div className="glass-panel info-card">
      <div>
        <div className="card-header">
          <MapPin size={20} color="var(--neon-blue)" />
          <span>Incident Location</span>
        </div>
        
        <div className="card-value">{latitude}° N</div>
        <div className="card-value">{longitude}° E</div>
        <div className="card-sub-value">GPS Coordinates</div>
      </div>
      
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
        <Navigation size={16} />
        Open in Google Maps
      </a>
    </div>
  );
};

export default LocationCard;
