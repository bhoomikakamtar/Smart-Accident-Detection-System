import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Menu, 
  Sun, 
  Moon,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const TopNavbar = ({ onMenuClick }) => {
  const { user, signOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b navbar-theme px-6 backdrop-blur-xl transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search telemetry, alerts..." 
            className="h-10 w-64 rounded-xl bg-white/5 pl-10 pr-4 text-sm outline-none border border-white/5 focus:border-accent-blue/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-accent-blue transition-all"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-red"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 rounded-xl bg-white/5 p-1.5 pr-3 hover:bg-white/10 transition-all border border-white/5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-blue text-dark-900 font-bold text-xs uppercase">
              {user?.email?.charAt(0) || 'U'}
            </div>
            <span className="hidden text-xs font-bold text-gray-300 md:block">
              {user?.user_metadata?.full_name || 'Rider'}
            </span>
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 rounded-2xl border sidebar-theme p-2 shadow-2xl backdrop-blur-xl"
              >
                <div className="p-3 mb-2 border-b border-white/5">
                  <p className="text-sm font-bold text-white truncate">{user?.user_metadata?.full_name || 'Rider'}</p>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{user?.email}</p>
                </div>
                
                <Link 
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <User size={18} />
                  My Profile
                </Link>
                <button className="flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                  <Settings size={18} />
                  Settings
                </button>
                
                <div className="my-2 border-t border-white/5"></div>
                
                <button 
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-accent-red hover:bg-accent-red/10 transition-all"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
