import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  BellRing, 
  Info, 
  Filter, 
  Search,
  CheckCircle2,
  MoreVertical,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useTelemetryData } from '../hooks/useTelemetryData';
import { useAuth } from '../contexts/AuthContext';

const AlertsPage = () => {
  const { user } = useAuth();
  const { telemetry } = useTelemetryData(user?.id);
  const [filter, setFilter] = useState('all');
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'danger', category: 'Accident', message: 'CRITICAL: Bike Fall Detected', location: '19.0760° N, 72.8777° E', time: '10 mins ago', status: 'Active' },
    { id: 2, type: 'warning', category: 'Safety', message: 'WARNING: Dangerous Lean Angle (>45°)', location: 'Bandra-Worli Sea Link', time: '1 hour ago', status: 'Resolved' },
    { id: 3, type: 'info', category: 'System', message: 'System Update: Firmware v2.1.0 installed', location: 'System Cloud', time: 'Yesterday, 10:00 AM', status: 'Archived' },
    { id: 4, type: 'danger', category: 'Accident', message: 'CRITICAL: Collision Detected', location: 'Andheri West', time: '2 days ago', status: 'Resolved' },
    { id: 5, type: 'warning', category: 'Overspeed', message: 'Overspeed Warning (112km/h)', location: 'Mumbai-Pune Expressway', time: '3 days ago', status: 'Archived' },
  ]);

  // Add real-time alert if accident detected
  useEffect(() => {
    if (telemetry.is_accident) {
      const newAlert = {
        id: Date.now(),
        type: 'danger',
        category: 'Live',
        message: `EMERGENCY: ${telemetry.accident_type} DETECTED!`,
        location: `${telemetry.latitude.toFixed(4)}, ${telemetry.longitude.toFixed(4)}`,
        time: 'Just now',
        status: 'Active'
      };
      setAlerts(prev => [newAlert, ...prev.filter(a => a.category !== 'Live')]);
    }
  }, [telemetry.is_accident, telemetry.accident_type, telemetry.latitude, telemetry.longitude]);

  const getIcon = (type) => {
    switch (type) {
      case 'danger': return <AlertTriangle className="text-accent-red" />;
      case 'warning': return <ShieldAlert className="text-yellow-500" />;
      case 'info': return <Info className="text-accent-blue" />;
      default: return <BellRing className="text-gray-400" />;
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Alert Hub</h1>
          <p className="text-gray-400">Manage and respond to safety notifications and incidents</p>
        </div>
        
        <div className="flex items-center gap-2 rounded-2xl bg-white/5 p-1.5 border border-white/5">
          {['all', 'danger', 'warning', 'info'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                filter === f ? "bg-accent-blue text-dark-900 shadow-lg shadow-accent-blue/20" : "text-gray-500 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Alerts List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "glass-panel relative overflow-hidden rounded-[2rem] p-6 border-l-4",
                alert.type === 'danger' ? "border-l-accent-red" : alert.type === 'warning' ? "border-l-yellow-500" : "border-l-accent-blue"
              )}
            >
              {/* Background Glow */}
              <div className={cn(
                "absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[80px] opacity-10",
                alert.type === 'danger' ? "bg-accent-red" : alert.type === 'warning' ? "bg-yellow-500" : "bg-accent-blue"
              )}></div>

              <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl shrink-0",
                  alert.type === 'danger' ? "bg-accent-red/10" : alert.type === 'warning' ? "bg-yellow-500/10" : "bg-accent-blue/10"
                )}>
                  {getIcon(alert.type)}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md",
                      alert.type === 'danger' ? "bg-accent-red text-white" : alert.type === 'warning' ? "bg-yellow-500 text-dark-900" : "bg-accent-blue text-dark-900"
                    )}>
                      {alert.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {alert.time}
                    </span>
                  </div>
                  <h3 className={cn(
                    "text-lg font-bold",
                    alert.type === 'danger' ? "text-white" : "text-gray-200"
                  )}>
                    {alert.message}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-600" />
                    {alert.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold border",
                    alert.status === 'Active' ? "border-accent-red text-accent-red bg-accent-red/5" : "border-white/10 text-gray-500"
                  )}>
                    {alert.status}
                  </div>
                  <button className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-gray-600 mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-xl font-bold text-white">All Clear!</h3>
          <p className="text-gray-500 mt-2">No {filter !== 'all' ? filter : ''} alerts found in your history.</p>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;
