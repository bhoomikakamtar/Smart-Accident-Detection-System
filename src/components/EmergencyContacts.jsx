import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Users, Phone, Trash2, Plus, Loader2, AlertCircle, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const EmergencyContacts = () => {
  const { user, isMock } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [user]);

  const fetchContacts = async () => {
    if (!user) return;
    
    if (isMock || !isSupabaseConfigured) {
      const saved = localStorage.getItem(`mock_contacts_${user.id}`);
      if (saved) {
        setContacts(JSON.parse(saved));
      } else {
        setContacts([
          { id: '1', contact_name: 'Jane Doe', relationship: 'Spouse', phone_number: '+91 98765 43210' },
          { id: '2', contact_name: 'Robert Smith', relationship: 'Father', phone_number: '+91 98234 56789' },
        ]);
      }
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
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

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    setAdding(true);
    setSuccess(false);

    const newContact = { 
      user_id: user.id, 
      contact_name: newName, 
      relationship: 'Emergency', 
      phone_number: newPhone 
    };
    
    if (isMock || !isSupabaseConfigured) {
      setTimeout(() => {
        const addedContact = { ...newContact, id: crypto.randomUUID() };
        setContacts(prev => {
          const updated = [...prev, addedContact];
          localStorage.setItem(`mock_contacts_${user.id}`, JSON.stringify(updated));
          return updated;
        });
        setNewName('');
        setNewPhone('');
        setAdding(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }, 600);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .insert([newContact])
        .select();

      if (!error && data) {
        setContacts(prev => [...prev, data[0]]);
        setNewName('');
        setNewPhone('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        console.error("Supabase Error:", error);
      }
    } catch (err) {
      console.error("Add failed:", err);
    } finally {
      setAdding(false);
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
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-accent-blue/10 text-accent-blue">
          <Heart size={20} />
        </div>
        <h3 className="text-lg font-bold">Emergency Contacts</h3>
      </div>

      <form onSubmit={handleAddContact} className="flex flex-col gap-3 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm outline-none focus:border-accent-blue/50"
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              required 
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm outline-none focus:border-accent-blue/50"
              value={newPhone} 
              onChange={(e) => setNewPhone(e.target.value)} 
              required 
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={adding} 
          className={cn(
            "flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50",
            success ? "bg-accent-green text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-accent-blue text-white hover:bg-accent-blue/80"
          )}
        >
          {adding ? (
            <Loader2 className="animate-spin" size={16} />
          ) : success ? (
            <>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <ShieldCheck size={16} />
              </motion.div>
              Added Successfully!
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Contact
            </>
          )}
        </button>
      </form>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin text-accent-blue" size={24} />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-6">
            <AlertCircle className="mx-auto text-gray-500 mb-2" size={24} />
            <p className="text-sm text-gray-500">No emergency contacts added.</p>
          </div>
        ) : (
          <AnimatePresence>
            {contacts.map(contact => (
              <motion.div 
                key={contact.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold">{contact.contact_name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Phone size={10} />
                    {contact.phone_number}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(contact.id)} 
                  className="p-2 text-gray-500 hover:text-accent-red hover:bg-accent-red/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
