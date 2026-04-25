import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useAccidentData(userId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        if (!isSupabaseConfigured) {
          // Simulate fetching
          const isAccident = Math.random() > 0.8; // 20% chance of accident
          const severity = isAccident ? (Math.random() > 0.5 ? 'High' : 'Medium') : 'Low';
          
          const mockData = {
            id: Date.now(),
            is_accident: isAccident,
            latitude: (19.0760 + (Math.random() - 0.5) * 0.1).toFixed(6),
            longitude: (72.8777 + (Math.random() - 0.5) * 0.1).toFixed(6),
            severity: severity,
            rider_name: "Mock User",
            timestamp: new Date().toISOString()
          };
          
          setData(mockData);
        } else {
          // Supabase Integration
          const { data: result, error } = await supabase
            .from('accident_alerts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1);
            
          if (result && result.length > 0) {
            setData(result[0]);
          }
        }
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error fetching accident data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading, lastUpdated };
}
