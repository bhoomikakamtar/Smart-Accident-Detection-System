import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  MapPin, 
  Activity, 
  Battery, 
  Navigation,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MetricCard = ({ icon: Icon, label, value, unit, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-panel rounded-2xl p-5"
  >
    <div className="flex items-center gap-4">
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-opacity-10", color)}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
        <h3 className="text-xl font-bold text-white">
          {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
        </h3>
      </div>
    </div>
  </motion.div>
);

const MetricCardsRow = ({ telemetry }) => {
  const isSafe = !telemetry.is_accident;

  return (
    <div className="mb-8 space-y-6">
      {/* Real-time Status Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex items-center justify-between rounded-2xl p-6 border-2 backdrop-blur-xl",
          isSafe 
            ? "border-accent-green/20 bg-accent-green/5" 
            : "border-accent-red/50 bg-accent-red/10 animate-pulse"
        )}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg",
            isSafe ? "bg-accent-green text-white" : "bg-accent-red text-white"
          )}>
            {isSafe ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Status: {isSafe ? 'Safe' : 'Accident Detected!'}
            </h2>
            <p className={cn(
              "text-sm font-medium",
              isSafe ? "text-accent-green" : "text-accent-red"
            )}>
              {isSafe ? 'Monitoring active and connection stable.' : `Severity: ${telemetry.severity} - Emergency contacts notified.`}
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <div className="h-2 w-2 rounded-full bg-accent-green animate-ping"></div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Live Link</span>
        </div>
      </motion.div>

      {/* Grid of Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          icon={Zap} 
          label="Current Speed" 
          value={telemetry.speed} 
          unit="km/h" 
          color="bg-accent-blue text-accent-blue"
          delay={0.1}
        />
        <MetricCard 
          icon={Battery} 
          label="Device Battery" 
          value={Math.round(telemetry.battery)} 
          unit="%" 
          color="bg-accent-green text-accent-green"
          delay={0.2}
        />
        <MetricCard 
          icon={Navigation} 
          label="Altitude" 
          value={telemetry.altitude.toFixed(1)} 
          unit="m" 
          color="bg-purple-500 text-purple-500"
          delay={0.3}
        />
        <MetricCard 
          icon={Activity} 
          label="Device Tilt" 
          value={telemetry.tilt.toFixed(0)} 
          unit="°" 
          color="bg-orange-500 text-orange-500"
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default MetricCardsRow;
