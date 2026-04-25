import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTelemetryData } from '../hooks/useTelemetryData';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Camera, 
  Edit3, 
  MapPin,
  Smartphone,
  Bike,
  Activity,
  ChevronRight,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();
  const { telemetry, locationName } = useTelemetryData(user?.id);
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Minimalist Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 px-4">
        <div className="relative group">
          <div className="h-32 w-32 rounded-[2.5rem] bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-4xl font-bold text-accent-blue shadow-2xl shadow-accent-blue/5">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button className="absolute -bottom-2 -right-2 p-2.5 rounded-2xl bg-accent-blue text-dark-900 shadow-xl hover:scale-110 transition-all border-4 border-dark-900">
            <Camera size={16} />
          </button>
        </div>
        
        <div className="text-center md:text-left flex-1 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-[10px] font-bold text-accent-green uppercase tracking-widest">
            <Shield size={12} />
            Verified Rider
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">{user?.user_metadata?.full_name || 'Rider Profile'}</h1>
          <p className="text-gray-500 font-medium">{user?.email}</p>
        </div>

        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold text-white"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
          <Edit3 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Essential Info */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-panel rounded-[2.5rem] p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                  <User size={12} className="text-accent-blue" />
                  Full Name
                </label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  defaultValue={user?.user_metadata?.full_name}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold text-lg outline-none focus:border-accent-blue transition-all disabled:text-gray-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                  <Phone size={12} className="text-accent-blue" />
                  Contact Number
                </label>
                <input 
                  type="tel" 
                  disabled={!isEditing}
                  placeholder="+91 00000 00000"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold text-lg outline-none focus:border-accent-blue transition-all disabled:text-gray-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                  <Globe size={12} className="text-accent-blue" />
                  Language
                </label>
                <select 
                  disabled={!isEditing}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold text-lg outline-none focus:border-accent-blue transition-all disabled:text-gray-300 appearance-none cursor-pointer"
                >
                  <option value="en">English (US)</option>
                  <option value="hi">Hindi (IN)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                  <Bike size={12} className="text-accent-blue" />
                  Experience Level
                </label>
                <div className="py-2 text-white font-bold text-lg">Pro Rider</div>
              </div>
            </div>

            {isEditing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end pt-4">
                <button className="px-10 py-4 rounded-2xl bg-accent-blue text-dark-900 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent-blue/20">
                  Update Profile Details
                </button>
              </motion.div>
            )}
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-accent-red" />
              Safety Insights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Rides', val: '24', icon: <Bike size={16} /> },
                { label: 'Alerts', val: '0', icon: <Shield size={16} /> },
                { label: 'Avg Speed', val: '42 km/h', icon: <Globe size={16} /> }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center group hover:bg-white/10 transition-all">
                  <div className="mx-auto w-10 h-10 rounded-xl bg-dark-900 flex items-center justify-center mb-3 text-accent-blue group-hover:scale-110 transition-all">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-black text-white">{item.val}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Location & Status */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel rounded-[2.5rem] p-8 border-accent-blue/30 bg-accent-blue/5 overflow-hidden relative group">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-blue/20 blur-3xl group-hover:bg-accent-blue/40 transition-all"></div>
            
            <h3 className="text-sm font-black uppercase tracking-widest text-accent-blue mb-6 flex items-center gap-2">
              <MapPin size={18} />
              Live Location
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="p-5 rounded-2xl bg-dark-900/50 backdrop-blur-md border border-white/5 space-y-4">
                <p className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.2em] mb-1">{locationName}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Latitude</span>
                  <span className="text-sm font-mono font-bold text-white">{telemetry.latitude.toFixed(6)}° N</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Longitude</span>
                  <span className="text-sm font-mono font-bold text-white">{telemetry.longitude.toFixed(6)}° E</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent-blue/20 text-accent-blue border border-accent-blue/20">
                <Globe className="animate-spin-slow" size={20} />
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">System Status</p>
                  <p className="text-xs font-bold">Live Tracking Active</p>
                </div>
              </div>
              
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-4 rounded-2xl bg-white text-dark-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent-blue transition-all shadow-lg"
              >
                View on Map
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Smartphone size={18} />
              Device Status
            </h3>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
              <div className="text-[10px] font-bold text-gray-500 uppercase">Hardware</div>
              <div className="text-xs font-bold text-white">ESP32 v2.0</div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
              <div className="text-[10px] font-bold text-gray-500 uppercase">Battery</div>
              <div className="text-xs font-bold text-accent-green">{Math.round(telemetry.battery)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
