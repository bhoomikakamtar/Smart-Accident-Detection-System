import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bike, 
  User, 
  Hash, 
  Clock, 
  Terminal, 
  AlertTriangle,
  ChevronRight,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const ProfileOverviewCard = ({ profile }) => (
  <div className="glass-panel rounded-3xl p-6">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-bold">Profile Overview</h3>
      <User className="text-accent-blue" size={20} />
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <User size={16} className="text-gray-500" />
          <span className="text-sm text-gray-400">Rider Name</span>
        </div>
        <span className="text-sm font-semibold">{profile?.full_name || 'Rider'}</span>
      </div>
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <Smartphone size={16} className="text-gray-500" />
          <span className="text-sm text-gray-400">Contact</span>
        </div>
        <span className="text-sm font-semibold text-accent-blue">{profile?.phone || '+91 00000 00000'}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm text-gray-400">System Status</span>
        </div>
        <span className="text-sm font-semibold text-accent-green uppercase tracking-tighter">Active</span>
      </div>
    </div>
    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-bold transition-all hover:bg-white/10">
      View Profile
      <ChevronRight size={14} />
    </button>
  </div>
);

export const LiveDataCard = ({ telemetry }) => (
  <div className="glass-panel rounded-3xl p-6">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-bold">Telemetry Stream</h3>
      <Terminal className="text-accent-green" size={20} />
    </div>
    <div className="space-y-2 font-mono text-[11px]">
      <div className="flex justify-between rounded bg-black/30 p-2">
        <span className="text-gray-500">ACCEL_X:</span>
        <span className="text-accent-green">{(Math.random() * 2).toFixed(4)} g</span>
      </div>
      <div className="flex justify-between rounded bg-black/30 p-2">
        <span className="text-gray-500">ACCEL_Y:</span>
        <span className="text-accent-green">{(Math.random() * 2).toFixed(4)} g</span>
      </div>
      <div className="flex justify-between rounded bg-black/30 p-2">
        <span className="text-gray-500">GYRO_Z:</span>
        <span className="text-accent-blue">{(Math.random() * 10).toFixed(2)} °/s</span>
      </div>
      <div className="flex justify-between rounded bg-black/30 p-2">
        <span className="text-gray-500">GPS_LAT:</span>
        <span className="text-white">{telemetry.latitude.toFixed(6)}</span>
      </div>
      <div className="flex justify-between rounded bg-black/30 p-2">
        <span className="text-gray-500">GPS_LON:</span>
        <span className="text-white">{telemetry.longitude.toFixed(6)}</span>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500">
      <div className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse"></div>
      CONNECTED TO IOT_DEVICE_09
    </div>
  </div>
);

export const RecentAlertsCard = ({ telemetry, lastUpdated }) => (
  <div className="glass-panel rounded-3xl p-6">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-bold">Recent Alerts</h3>
      <AlertTriangle className="text-accent-red" size={20} />
    </div>
    <div className="space-y-4">
      {telemetry.is_accident ? (
        <div className="rounded-2xl border border-accent-red/20 bg-accent-red/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-red">Critical Alert</span>
            <span className="text-[10px] text-gray-500">{lastUpdated.toLocaleTimeString()}</span>
          </div>
          <p className="text-sm font-semibold">Impact Detected: {telemetry.accident_type}</p>
          <p className="mt-1 text-xs text-gray-400">Emergency SMS sent to 3 contacts.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 rounded-full bg-accent-green/10 p-3 text-accent-green">
            <ShieldCheck size={24} />
          </div>
          <p className="text-sm font-medium text-gray-300">All systems clear</p>
          <p className="text-xs text-gray-500">No accidents detected in the last 24h.</p>
        </div>
      )}
    </div>
    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-bold transition-all hover:bg-white/10">
      View All History
    </button>
  </div>
);
