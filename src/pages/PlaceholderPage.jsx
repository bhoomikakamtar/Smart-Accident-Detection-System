import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const PlaceholderPage = ({ title, icon: Icon }) => {
  return (
    <DashboardLayout>
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)' }}>
          {Icon && <Icon size={64} color="var(--neon-blue)" />}
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>{title}</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', textAlign: 'center', lineHeight: '1.6' }}>
          This module is currently under development. Detailed analytics, reports, and controls will be available in the upcoming release.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
