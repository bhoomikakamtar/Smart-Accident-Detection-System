import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  User, 
  Phone, 
  Heart, 
  Trash2, 
  Edit2,
  ShieldCheck,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const ContactsPage = () => {
  const { user, isMock } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Family'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [user]);

  const fetchContacts = async () => {
    if (!user) return;
    setLoading(true);

    if (isMock || !isSupabaseConfigured) {
      const saved = localStorage.getItem(`mock_contacts_${user.id}`);
      if (saved) {
        setContacts(JSON.parse(saved));
      } else {
        setContacts([
          { id: '1', contact_name: 'Jane Doe', relationship: 'Spouse', phone_number: '+91 98765 43210', isVerified: true },
          { id: '2', contact_name: 'Robert Smith', relationship: 'Father', phone_number: '+91 98234 56789', isVerified: true },
        ]);
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id);
      
      if (data) setContacts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newContact = {
      user_id: user.id,
      contact_name: formData.name,
      phone_number: formData.phone,
      relationship: formData.relationship
    };

    if (isMock || !isSupabaseConfigured) {
      setTimeout(() => {
        const addedContact = { ...newContact, id: crypto.randomUUID(), isVerified: false };
        setContacts(prev => {
          const updated = [...prev, addedContact];
          localStorage.setItem(`mock_contacts_${user.id}`, JSON.stringify(updated));
          return updated;
        });
        setIsAdding(false);
        setFormData({ name: '', phone: '', relationship: 'Family' });
        setSubmitting(false);
      }, 600);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .insert([newContact])
        .select();

      if (data) {
        setContacts(prev => [...prev, data[0]]);
        setIsAdding(false);
        setFormData({ name: '', phone: '', relationship: 'Family' });
      } else {
        console.error("Supabase error:", error);
      }
    } catch (err) {
      console.error("Add error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (isMock || !isSupabaseConfigured) {
      setContacts(prev => {
        const updated = prev.filter(c => c.id !== id);
        localStorage.setItem(`mock_contacts_${user.id}`, JSON.stringify(updated));
        return updated;
      });
      return;
    }

    await supabase.from('emergency_contacts').delete().eq('id', id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Emergency Contacts</h1>
          <p className="text-gray-400">People who will be notified instantly in case of an accident</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-accent-red px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={18} />
          Add New Contact
        </button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="animate-spin text-accent-blue" size={32} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel group relative overflow-hidden rounded-[2rem] p-6"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent-blue">
                    <User size={28} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(contact.id)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{contact.contact_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Heart size={14} className="text-accent-red" />
                      {contact.relationship}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-black/30 p-4">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-white">{contact.phone_number}</span>
                    </div>
                    {contact.isVerified ? (
                      <ShieldCheck size={18} className="text-accent-green" />
                    ) : (
                      <AlertCircle size={18} className="text-yellow-500" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button 
            onClick={() => setIsAdding(true)}
            className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-white/10 bg-white/[0.02] transition-all hover:border-accent-blue/30 hover:bg-white/[0.05] group"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-gray-500 group-hover:text-accent-blue group-hover:bg-accent-blue/10 transition-colors">
              <Plus size={24} />
            </div>
            <p className="text-sm font-semibold text-gray-500 group-hover:text-white">Add Emergency Contact</p>
          </button>
        </div>
      )}

      {/* Add Contact Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel relative w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute right-6 top-6 rounded-full p-2 text-gray-500 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <h2 className="mb-6 text-2xl font-bold text-white">Add Contact</h2>
              
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Full Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent-blue/50"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Phone Number</label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent-blue/50"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Relationship</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent-blue/50"
                  >
                    <option value="Family">Family</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Friend">Friend</option>
                    <option value="Medical">Medical</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-blue py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                  Add to Emergency List
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactsPage;
