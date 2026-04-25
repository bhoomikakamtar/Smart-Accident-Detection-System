import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Bike, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-900 px-4 py-12">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 -left-20 h-96 w-96 rounded-full bg-accent-blue/10 blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-red shadow-lg transition-transform hover:scale-110">
            <Bike className="text-white" size={32} />
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Reset Password</h2>
          <p className="mt-2 text-gray-400">We'll send you a link to get back into your account</p>
        </div>

        <div className="glass-panel rounded-[2rem] p-8 shadow-2xl">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none focus:border-accent-blue/50"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-dark-900 transition-all hover:bg-gray-100 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Recovery Link'}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/20 text-accent-green">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Check your email</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                We've sent a password reset link to <span className="font-semibold text-white">{email}</span>. Please check your inbox and spam folder.
              </p>
              <button 
                onClick={() => setSent(false)}
                className="mt-8 text-sm font-semibold text-accent-blue hover:underline"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
