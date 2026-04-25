import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      let activeUser = null;
      let mockFlag = false;

      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            activeUser = session.user;
            mockFlag = false;
          }
        } catch (e) {
          console.warn("Supabase auth error", e);
        }
      }

      if (!activeUser) {
        const mockUser = localStorage.getItem('mock_user');
        if (mockUser) {
          activeUser = JSON.parse(mockUser);
          mockFlag = true;
        }
      }

      setUser(activeUser);
      setIsMock(mockFlag);
      setLoading(false);
    };

    getSession();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setUser(session.user);
          setIsMock(false);
        } else {
          const mockUser = localStorage.getItem('mock_user');
          if (mockUser) {
            setUser(JSON.parse(mockUser));
            setIsMock(true);
          } else {
            setUser(null);
            setIsMock(false);
          }
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error) {
        setIsMock(false);
        return { data, error: null };
      }
    }
    
    // Mock Success Path (Bypass)
    const mockId = crypto.randomUUID();
    const mockUser = { 
      id: mockId, 
      email, 
      user_metadata: { full_name: email.split('@')[0] } 
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsMock(true);
    return { data: { user: mockUser }, error: null };
  };

  const register = async (email, password, metadata) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (!error) {
        setIsMock(false);
        return { data, error: null };
      }
    }

    // Mock Registration
    const mockId = crypto.randomUUID();
    const mockUser = { 
      id: mockId, 
      email, 
      user_metadata: metadata 
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsMock(true);
    return { data: { user: mockUser }, error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('mock_user');
    setUser(null);
    setIsMock(false);
    return { error: null };
  };

  const value = {
    user,
    isMock,
    login,
    register,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
