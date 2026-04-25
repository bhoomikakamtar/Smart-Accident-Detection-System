import React from 'react';
import MetricCardsRow from '../components/dashboard/MetricCardsRow';
import LiveMap from '../components/dashboard/LiveMap';
import { ProfileOverviewCard, LiveDataCard, RecentAlertsCard } from '../components/dashboard/BottomCards';
import EmergencyContacts from '../components/EmergencyContacts';
import { useTelemetryData } from '../hooks/useTelemetryData';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, RefreshCcw, ShieldAlert, AlertTriangle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const { telemetry, loading, lastUpdated, locationName } = useTelemetryData(user?.id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-accent-blue" size={48} />
        <p className="text-gray-400 font-medium">Connecting to IoT Safety Module...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Safety Command Center</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <MapPin size={14} className="text-accent-blue" />
            {locationName || 'Monitoring live telemetry...'}
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
          <RefreshCcw className={cn("text-accent-blue", !telemetry.is_accident && "animate-spin-slow")} size={16} />
          <div className="text-xs">
            <p className="text-gray-500 uppercase font-bold tracking-tighter">System Pulse</p>
            <p className="text-white font-medium">{lastUpdated?.toLocaleTimeString() || 'Active'}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {telemetry.is_accident && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-[2rem] border-2 border-accent-red bg-accent-red/10 p-6 shadow-[0_0_50px_rgba(255,51,102,0.2)]"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-red text-white animate-pulse shadow-[0_0_20px_rgba(255,51,102,0.5)]">
                <ShieldAlert size={48} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Emergency Alert: {telemetry.accident_type} Detected!</h2>
                <p className="text-white/80 font-semibold mt-1">Impact at {telemetry.latitude.toFixed(4)}, {telemetry.longitude.toFixed(4)}. Emergency responders notified.</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-accent-red text-white text-[10px] font-bold uppercase tracking-widest">Critical Severity</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">SMS Sent</span>
                </div>
              </div>
              <button className="rounded-xl bg-white px-8 py-3 font-bold text-accent-red transition-all hover:scale-105 active:scale-95 shadow-xl">
                I Am Safe
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Stats Row */}
      <MetricCardsRow telemetry={telemetry} />
      
      {/* Middle Section: Map and Emergency Contacts */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
           <LiveMap telemetry={telemetry} />
        </div>
        <div className="space-y-8">
           <EmergencyContacts />
           <ProfileOverviewCard profile={user?.user_metadata} />
        </div>
      </div>
      
      {/* Bottom Section: More Data */}
      <div className="grid gap-8 md:grid-cols-2">
        <LiveDataCard telemetry={telemetry} />
        <RecentAlertsCard telemetry={telemetry} lastUpdated={lastUpdated} />
      </div>
    </div>
  );
};

export default Dashboard;
