import React from 'react';
import { Activity } from 'lucide-react';

const SeverityCard = ({ severity }) => {
  const getBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return 'severity-low';
    }
  };

  return (
    <div className="glass-panel info-card">
      <div>
        <div className="card-header">
          <Activity size={20} color="var(--neon-yellow)" />
          <span>Impact Severity</span>
        </div>
        
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
          <div className={`severity-badge ${getBadgeClass(severity)}`}>
            {severity || 'Low'} Impact
          </div>
        </div>
      </div>
      
      <div className="card-sub-value" style={{ marginTop: '24px', textAlign: 'center' }}>
        Based on G-Force & Impact Sensors
      </div>
    </div>
  );
};

export default SeverityCard;
