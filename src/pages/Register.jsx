import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Phone, Bike, Loader2, AlertCircle, ChevronRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: regError } = await register(formData.email, formData.password, {
      full_name: formData.fullName,
      phone: formData.phone
    });

    if (regError) {
      setError(regError.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-900 px-4 py-12">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-red/10 blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-red shadow-lg transition-transform hover:scale-110">
            <Bike className="text-white" size={28} />
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Join RideSafe</h2>
          <p className="mt-2 text-gray-400">Start your journey with real-time IoT protection</p>
        </div>

        <div className="glass-panel rounded-[2rem] p-8 shadow-2xl lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition-all focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition-all focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                    placeholder="+91 0000000000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition-all focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition-all focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent-red py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Safety Account'}
              {!loading && <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-accent-blue hover:underline">Sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
