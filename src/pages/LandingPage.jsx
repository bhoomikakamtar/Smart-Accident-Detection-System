import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  MapPin, 
  BellRing, 
  Zap, 
  ChevronRight, 
  Bike,
  Activity,
  Heart
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-accent-blue/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark-900/50 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-red">
              <Bike className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">RideSafe</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="rounded-full bg-accent-red px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm font-medium text-accent-blue">
                <Zap size={14} />
                <span>Next-Gen IoT Safety</span>
              </div>
              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">
                Ride Safe, <br />
                <span className="text-accent-red">Live Safe.</span>
              </h1>
              <p className="mb-10 text-lg text-gray-400 lg:text-xl max-w-xl leading-relaxed">
                Experience peace of mind with the world's most advanced IoT-based real-time accident detection and emergency response system for two-wheelers.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/register" className="group flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-dark-900 transition-all hover:bg-gray-100 active:scale-95">
                  Start Riding Safer
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="#how-it-works" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                  See How it Works
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-16 lg:mt-0 lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent-blue/20 to-accent-red/20 blur-2xl opacity-50 animate-pulse"></div>
              <img 
                src="/Users/prathampatange/.gemini/antigravity/brain/f3eda9ad-dc02-416f-8bed-a5b567135982/hero_bike_tracking_1777109175024.png" 
                alt="RideSafe IoT Hero" 
                className="relative z-10 w-full rounded-3xl border border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-dark-800/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-5xl">Engineered for Survival</h2>
            <p className="mx-auto max-w-2xl text-gray-400">Our multi-layered detection system ensures that when milliseconds count, help is already on the way.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                icon: Activity, 
                title: "Live Crash Detection", 
                desc: "Advanced MPU6050 accelerometer & gyroscope integration for 99.9% detection accuracy.",
                color: "text-accent-red",
                bg: "bg-accent-red/10"
              },
              { 
                icon: MapPin, 
                title: "Real-time GPS Tracking", 
                desc: "Precise latitude and longitude capture for instant responder navigation.",
                color: "text-accent-blue",
                bg: "bg-accent-blue/10"
              },
              { 
                icon: BellRing, 
                title: "Instant GSM Alerts", 
                desc: "Automated SMS notification sent to emergency contacts within seconds of impact.",
                color: "text-accent-green",
                bg: "bg-accent-green/10"
              },
              { 
                icon: ShieldCheck, 
                title: "Severity Analysis", 
                desc: "Intelligent classification of impact level to prioritize emergency response.",
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              { 
                icon: Heart, 
                title: "SDG Contribution", 
                desc: "Proudly supporting UN Sustainable Development Goals for health and road safety.",
                color: "text-orange-400",
                bg: "bg-orange-400/10"
              },
              { 
                icon: Bike, 
                title: "Vehicle Analytics", 
                desc: "Complete history of your riding safety profile and incident reports.",
                color: "text-gray-300",
                bg: "bg-white/5"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-panel group relative overflow-hidden rounded-3xl p-8 transition-all hover:bg-white/10"
              >
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-red">
              <Bike className="text-white" size={16} />
            </div>
            <span className="text-lg font-bold tracking-tight">RideSafe</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 RideSafe IoT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
