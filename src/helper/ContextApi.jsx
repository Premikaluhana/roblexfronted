import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOnboardingStatus, getUserProfile } from '../utlis/Api';
// import axios from 'axios';

export const ContextApi = createContext();

// Provider component
export const ContextProvider = ({ children }) => {
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [BoardingComplete, setBoardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated === 'true') {
        try {
          const isOnboarding = await getOnboardingStatus();
          console.log('Onboarding status in context:', isOnboarding);
          const userProfile=await getUserProfile();
          setUser(userProfile);
          console.log('User profile in context:', userProfile);
          setBoardingComplete(isOnboarding?.isOnboardingComplete || false);
        } catch (error) {
          console.error('Error loading user:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const Logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setBoardingComplete(false);
    history('/');
  };

  const UserData = (newUserData) => {
    setUser((prev) => ({
      ...prev,
      ...newUserData,
      isNew: newUserData.isNew || false,
      onboardingComplete: newUserData.onboardingComplete || false,
    }));
  };

  const CheckAuthStatus = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      history('/');
    }
  };


  return (
    <ContextApi.Provider
      value={{
        user,
        activeTab,
        setActiveTab,
        CheckAuthStatus,
        Logout,
        UserData,
        BoardingComplete,
        setBoardingComplete,
        isLoading,
        setUser
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

