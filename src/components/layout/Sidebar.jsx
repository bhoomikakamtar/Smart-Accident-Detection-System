import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  History, 
  Users, 
  UserCircle, 
  ShieldAlert, 
  Settings,
  LogOut,
  Bike
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ShieldAlert, label: 'Live Alerts', path: '/alerts' },
  { icon: History, label: 'Accident History', path: '/history' },
  { icon: Users, label: 'Emergency Contacts', path: '/contacts' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { signOut } = useAuth();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen w-64 transition-transform lg:translate-x-0",
      !isOpen && "-translate-x-full"
    )}>
      <div className="flex h-full flex-col border-r sidebar-theme backdrop-blur-xl px-4 py-6">
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-red shadow-[0_0_20px_rgba(255,51,102,0.4)]">
            <Bike className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">RideSafe</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-accent-red/10 text-accent-red shadow-[inset_0_0_12px_rgba(255,51,102,0.1)]" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6">
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
