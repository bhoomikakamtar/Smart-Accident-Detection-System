import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Helper to calculate distance between coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

export function useTelemetryData(userId) {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [locationName, setLocationName] = useState('Detecting...');
  
  const [telemetry, setTelemetry] = useState({
    latitude: 19.0760,
    longitude: 72.8777,
    speed: 0,
    battery: 87,
    distanceTravelled: 12.4,
    altitude: 14.2,
    direction: 45,
    tilt: 0,
    is_accident: false,
    accident_type: 'None',
    severity: 'Safe',
    alertCount: 0,
    path: []
  });

  // Get human readable location
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data.display_name) {
        const parts = data.display_name.split(',');
        setLocationName(`${parts[0]}, ${parts[1] || ''}`);
      }
    } catch (e) {
      setLocationName('Active Tracking');
    }
  };

  useEffect(() => {
    let mockInterval;
    
    // Attempt to get real browser location for the simulation start
    if (!isSupabaseConfigured && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setTelemetry(prev => ({ 
          ...prev, 
          latitude, 
          longitude,
          path: [[latitude, longitude]]
        }));
        reverseGeocode(latitude, longitude);
      });
    }

    const fetchRealData = async () => {
      if (!isSupabaseConfigured) return;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('accident_alerts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (data && data.length > 0) {
          const newLat = data[0].latitude;
          const newLon = data[0].longitude;
          
          setTelemetry(prev => ({
            ...prev,
            latitude: newLat,
            longitude: newLon,
            is_accident: data[0].accident_status === 'Accident Detected',
            severity: data[0].severity,
            path: [...prev.path, [newLat, newLon]].slice(-100)
          }));
          setLastUpdated(new Date());
          reverseGeocode(newLat, newLon);
        }
      } catch (error) {
        console.error("Telemetry fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isSupabaseConfigured) {
      setLoading(false);
      mockInterval = setInterval(() => {
        setTelemetry(prev => {
          // Simulate realistic movement
          const drift = 0.0002;
          const newLat = prev.latitude + (Math.random() - 0.4) * drift;
          const newLon = prev.longitude + (Math.random() - 0.4) * drift;
          
          const distanceMoved = getDistanceFromLatLonInKm(prev.latitude, prev.longitude, newLat, newLon);
          let newSpeed = Math.round((distanceMoved / (3 / 3600)));
          if (newSpeed > 100) newSpeed = 60; // Cap realistic speed
          
          let newTilt = prev.is_accident ? prev.tilt : Math.abs(prev.tilt + (Math.random() - 0.5) * 5);
          if (newTilt > 15 && !prev.is_accident) newTilt = 10;
          
          const isCollisionTrigger = Math.random() > 0.995;
          let newAccidentState = prev.is_accident;
          let newAccidentType = prev.accident_type;
          
          if (!prev.is_accident && isCollisionTrigger) {
            newAccidentState = true;
            newAccidentType = 'Impact';
          } else if (prev.is_accident && Math.random() > 0.9) {
            newAccidentState = false;
            newAccidentType = 'None';
          }

          return {
            ...prev,
            latitude: newLat,
            longitude: newLon,
            speed: newAccidentState ? 0 : (newSpeed || prev.speed),
            battery: Math.max(0, prev.battery - 0.001),
            distanceTravelled: prev.distanceTravelled + distanceMoved,
            altitude: prev.altitude + (Math.random() - 0.5) * 0.2,
            tilt: newTilt,
            is_accident: newAccidentState,
            accident_type: newAccidentType,
            severity: newAccidentState ? 'Critical' : 'Safe',
            path: [...prev.path, [newLat, newLon]].slice(-100)
          };
        });
        setLastUpdated(new Date());
      }, 3000);
    } else {
      fetchRealData();
      mockInterval = setInterval(fetchRealData, 5000);
    }

    return () => clearInterval(mockInterval);
  }, [userId]);

  return { telemetry, loading, lastUpdated, locationName };
}
