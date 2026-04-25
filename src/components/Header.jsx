import React from 'react';
import { Activity, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header flex-between glass-panel">
      <div>
        <h1 className="text-gradient">Smart Accident Detection System</h1>
        <p className="subtitle">Real-Time Emergency Monitoring Dashboard</p>
      </div>
      
      <div className="flex-center" style={{ gap: '24px' }}>
        {profile && (
          <div className="user-info" style={{ textAlign: 'right', display: 'none' /* hidden on mobile typically, but let's make it flex */ }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{profile.full_name}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{profile.vehicle_number}</div>
          </div>
        )}

        <div className="live-indicator flex-center">
          <Activity className="blink-live" color="var(--neon-red)" size={24} />
          <span className="live-text blink-live">LIVE</span>
        </div>

        <button onClick={handleLogout} className="btn-delete" title="Logout" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)' }}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
