import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/contexts/AuthContext';

export const useAchievements = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (userProfile) {
      // Simular carregamento de conquistas
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [userProfile]);

  const getAchievementStats = () => {
    const mockStats = {
      total: 8,
      earned: 4,
      points: 160,
      percentage: 50
    };
    
    return mockStats;
  };

  return {
    loading,
    achievements,
    getAchievementStats
  };
};