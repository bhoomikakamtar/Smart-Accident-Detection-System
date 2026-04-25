import React, { useEffect, useRef } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const AccidentStatusCard = ({ isAccident }) => {
  const audioRef = useRef(null);
  const previousState = useRef(isAccident);

  useEffect(() => {
    // Play sound if state changes to accident
    if (isAccident && !previousState.current) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
      }
    }
    previousState.current = isAccident;
  }, [isAccident]);

  return (
    <div className={`glass-panel status-card ${isAccident ? 'danger pulse-red' : 'safe'}`}>
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />
      
      <div className="status-icon-wrapper">
        {isAccident ? (
          <AlertTriangle color="var(--neon-red)" size={48} className="glow-text-red" />
        ) : (
          <ShieldCheck color="var(--neon-green)" size={48} className="glow-text-green" />
        )}
      </div>
      
      <h2 className={`status-title ${isAccident ? 'glow-text-red' : 'glow-text-green'}`}>
        {isAccident ? 'Accident Detected' : 'No Accident Detected'}
      </h2>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
        {isAccident ? 'Emergency protocols activated. Immediate response required.' : 'System is monitoring normally. All secure.'}
      </p>
    </div>
  );
};

export default AccidentStatusCard;
