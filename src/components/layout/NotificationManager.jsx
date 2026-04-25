import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTelemetryData } from '../../hooks/useTelemetryData';
import { ShieldAlert, X, Bell, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationManager = () => {
  const { user } = useAuth();
  const { telemetry } = useTelemetryData(user?.id);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAccidentState, setLastAccidentState] = useState(false);

  useEffect(() => {
    if (telemetry.is_accident && !lastAccidentState) {
      setShowNotification(true);
      // Auto-hide after 10 seconds unless interacted with
      const timer = setTimeout(() => setShowNotification(false), 10000);
      return () => clearTimeout(timer);
    }
    setLastAccidentState(telemetry.is_accident);
  }, [telemetry.is_accident, lastAccidentState]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-[100] w-full max-w-sm"
        >
          <div className="glass-panel overflow-hidden rounded-[2rem] border-accent-red bg-dark-800 shadow-[0_20px_50px_rgba(255,51,102,0.3)]">
            <div className="bg-accent-red p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ShieldAlert size={20} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Emergency Detected</span>
              </div>
              <button 
                onClick={() => setShowNotification(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-accent-red/10 flex items-center justify-center text-accent-red shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Impact: {telemetry.accident_type}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    An accident has been detected at your current location. Emergency contacts are being notified.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setShowNotification(false)}
                  className="flex-1 rounded-xl bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => {
                    window.location.href = '/alerts';
                    setShowNotification(false);
                  }}
                  className="flex-1 rounded-xl bg-accent-red py-2.5 text-xs font-bold text-white shadow-lg shadow-accent-red/20 hover:scale-105 active:scale-95 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationManager;
