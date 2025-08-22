import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import AuthenticationTabs from './components/AuthenticationTabs';
import AuthenticationHeader from './components/AuthenticationHeader';
import SocialAuthButtons from './components/SocialAuthButtons';
import AuthenticationDivider from './components/AuthenticationDivider';
import AuthenticationForm from './components/AuthenticationForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('devconnect_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setCurrentUser(userData);
      navigate('/developer-feed-dashboard');
    }
  }, [navigate]);

  const handleAuthentication = async (formData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: Date.now(),
        email: formData?.email,
        name: formData?.fullName || formData?.email?.split('@')?.[0],
        username: formData?.username || formData?.email?.split('@')?.[0]?.replace(/[^a-zA-Z0-9]/g, ''),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.email}`,
        joinedDate: new Date()?.toISOString(),
        isVerified: true,
        bio: activeTab === 'signup' ? 'New developer on DevConnect' : 'Experienced developer',
        location: 'Global',
        website: '',
        skills: activeTab === 'signup' ? ['JavaScript', 'React'] : ['JavaScript', 'React', 'Node.js', 'Python'],
        followers: activeTab === 'signup' ? 0 : Math.floor(Math.random() * 500) + 100,
        following: activeTab === 'signup' ? 0 : Math.floor(Math.random() * 200) + 50,
        posts: activeTab === 'signup' ? 0 : Math.floor(Math.random() * 50) + 10
      };

      localStorage.setItem('devconnect_user', JSON.stringify(userData));
      setCurrentUser(userData);
      
      navigate('/developer-feed-dashboard');
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (userData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhancedUserData = {
        ...userData,
        id: Date.now(),
        joinedDate: new Date()?.toISOString(),
        isVerified: true,
        bio: 'Developer passionate about building amazing applications',
        location: 'Global',
        website: '',
        skills: ['JavaScript', 'React', 'Node.js'],
        followers: Math.floor(Math.random() * 300) + 50,
        following: Math.floor(Math.random() * 150) + 25,
        posts: Math.floor(Math.random() * 30) + 5
      };

      localStorage.setItem('devconnect_user', JSON.stringify(enhancedUserData));
      setCurrentUser(enhancedUserData);
      
      navigate('/developer-feed-dashboard');
    } catch (error) {
      console.error('Social authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (email) => {
    console.log('Password reset requested for:', email);
    setTimeout(() => {
      setShowForgotPassword(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('devconnect_user');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader currentUser={currentUser} onLogout={handleLogout} />
      
      <main className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-elevation-lg p-8">
            <AuthenticationHeader mode={activeTab} />
            
            <AuthenticationTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isLoading={isLoading}
            />

            <SocialAuthButtons 
              onSocialAuth={handleSocialAuth}
              isLoading={isLoading}
            />

            <AuthenticationDivider />

            <AuthenticationForm
              mode={activeTab}
              onSubmit={handleAuthentication}
              onForgotPassword={() => setShowForgotPassword(true)}
              isLoading={isLoading}
            />

            <div className="mt-6 text-center">
              <p className="text-xs text-text-secondary">
                By continuing, you agree to our{' '}
                <button className="text-accent hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button className="text-accent hover:underline">Privacy Policy</button>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Need help?{' '}
              <button className="text-accent hover:underline">Contact Support</button>
            </p>
          </div>
        </div>
      </main>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
};

export default UserAuthentication;