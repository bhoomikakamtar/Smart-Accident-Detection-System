import React, { useState } from 'react';
import { 
  User, 
  Bike, 
  Bell, 
  Shield, 
  Smartphone, 
  Mail, 
  MapPin, 
  Lock,
  ChevronRight,
  Save,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const SettingsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'profile', icon: User, label: 'Personal Information' },
    { id: 'notifications', icon: Bell, label: 'Alert Preferences' },
    { id: 'security', icon: Lock, label: 'Account Security' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Profile & Settings</h1>
        <p className="text-gray-400">Manage your account preferences and safety configurations</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Navigation Tabs */}
        <div className="flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white group"
            >
              <section.icon size={18} className="group-hover:text-accent-blue" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="glass-panel rounded-[2rem] p-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold">Personal Profile</h2>
              <button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-dark-900 transition-all hover:bg-gray-100"
              >
                {loading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                Save Changes
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    defaultValue={user?.user_metadata?.full_name || 'Rider Name'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-accent-blue/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    disabled
                    value={user?.email || 'rider@example.com'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-gray-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    defaultValue={user?.user_metadata?.phone || '+91 0000000000'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-accent-blue/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="mb-6 text-xl font-bold text-white">Emergency Preferences</h2>
            <div className="space-y-4">
              {[
                { label: 'Automated Emergency SMS', desc: 'Send SMS to contacts instantly upon crash detection', enabled: true },
                { label: 'Cloud Data Logging', desc: 'Sync telemetry data to cloud for accident reconstruction', enabled: true },
                { label: 'Live Location Sharing', desc: 'Allow contacts to track your live position during alerts', enabled: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl bg-white/5 p-4 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">{pref.label}</p>
                    <p className="text-xs text-gray-500">{pref.desc}</p>
                  </div>
                  <button className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    pref.enabled ? "bg-accent-blue" : "bg-white/10"
                  )}>
                    <span className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      pref.enabled ? "translate-x-6" : "translate-x-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
