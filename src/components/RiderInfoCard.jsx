import React from 'react';
import { User, Clock } from 'lucide-react';

const RiderInfoCard = ({ riderName, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="glass-panel info-card">
      <div>
        <div className="card-header">
          <User size={20} color="var(--text-primary)" />
          <span>Rider Information</span>
        </div>
        
        <div className="card-value" style={{ marginTop: '12px' }}>{riderName || 'Unknown Rider'}</div>
        <div className="card-sub-value">Registered User</div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <div className="card-header" style={{ marginBottom: '12px' }}>
          <Clock size={20} color="var(--text-primary)" />
          <span>Timestamp</span>
        </div>
        <div className="card-value" style={{ fontSize: '20px' }}>{formattedTime}</div>
      </div>
    </div>
  );
};

export default RiderInfoCard;
