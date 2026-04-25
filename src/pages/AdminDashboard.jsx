import React from 'react';
import { 
  Users, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  Map as MapIcon, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const AdminDashboard = () => {
  const stats = [
    { label: 'Active Riders', value: '1,284', icon: Users, color: 'bg-accent-blue', trend: '+12% this month' },
    { label: 'Active Incidents', value: '3', icon: ShieldAlert, color: 'bg-accent-red', trend: 'Live Monitoring' },
    { label: 'Alerts Sent (24h)', value: '42', icon: Activity, color: 'bg-accent-green', trend: 'Normal Volume' },
    { label: 'Success Rate', value: '99.9%', icon: CheckCircle2, color: 'bg-purple-500', trend: 'Stable' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Platform Command Center</h1>
          <p className="text-gray-400">Regional fleet monitoring and emergency response tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search user or vehicle..."
              className="rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-xs text-white focus:border-accent-blue/50"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-accent-blue px-4 py-2 text-xs font-bold text-white shadow-lg">
            <MapIcon size={16} />
            Live Fleet View
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={cn("rounded-2xl p-3 text-white shadow-lg", stat.color)}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.trend}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Active Incidents Table */}
        <div className="glass-panel rounded-[2rem] overflow-hidden">
          <div className="border-b border-white/10 p-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">Active Emergencies</h2>
            <div className="flex h-2 w-2 rounded-full bg-accent-red animate-ping"></div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { rider: 'Amit Sharma', vehicle: 'MH 12 CR 9901', severity: 'Critical', time: '2m ago', location: 'Western Express Highway' },
              { rider: 'Priya Patel', vehicle: 'GJ 01 AB 1234', severity: 'Medium', time: '14m ago', location: 'Navi Mumbai' },
            ].map((incident, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-white/5 p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent-red/20 flex items-center justify-center text-accent-red">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{incident.rider}</p>
                    <p className="text-xs text-gray-500">{incident.vehicle} • {incident.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-accent-red uppercase tracking-widest">{incident.severity}</span>
                  <span className="text-[10px] text-gray-500">{incident.time}</span>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors">
              View All Active Incidents
            </button>
          </div>
        </div>

        {/* Analytics Placeholder */}
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold">Accident Trends</h2>
            <BarChart3 className="text-gray-500" size={20} />
          </div>
          <div className="flex h-64 items-center justify-center rounded-2xl bg-black/30 border border-white/5 relative overflow-hidden">
             {/* Simple SVG Chart visualization */}
             <svg className="w-full h-full p-4" viewBox="0 0 400 200">
               <path d="M0 150 Q 50 120, 100 140 T 200 80 T 300 110 T 400 60" fill="none" stroke="#00e5ff" strokeWidth="4" />
               <path d="M0 180 Q 50 160, 100 170 T 200 130 T 300 150 T 400 120" fill="none" stroke="#ff3366" strokeWidth="4" opacity="0.5" />
             </svg>
             <div className="absolute bottom-4 left-0 right-0 flex justify-around text-[9px] text-gray-500 uppercase tracking-widest font-bold">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Response Time</p>
              <p className="text-xl font-bold text-white">4.2m</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Lives Saved</p>
              <p className="text-xl font-bold text-accent-green">142</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
