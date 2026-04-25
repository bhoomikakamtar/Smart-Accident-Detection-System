import React from 'react';
import AccidentStatusCard from './AccidentStatusCard';
import LocationCard from './LocationCard';
import SeverityCard from './SeverityCard';
import RiderInfoCard from './RiderInfoCard';

const DashboardGrid = ({ data }) => {
  if (!data) return null;

  return (
    <main className="dashboard-grid">
      <div className="dashboard-main-area">
        <AccidentStatusCard isAccident={data.is_accident} />
      </div>
      
      <div className="dashboard-sub-area">
        <LocationCard latitude={data.latitude} longitude={data.longitude} />
        <SeverityCard severity={data.severity} />
        <RiderInfoCard riderName={data.rider_name} timestamp={data.timestamp} />
      </div>
    </main>
  );
};

export default DashboardGrid;
