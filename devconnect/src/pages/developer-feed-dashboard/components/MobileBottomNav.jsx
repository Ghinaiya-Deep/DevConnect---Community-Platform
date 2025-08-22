import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const MobileBottomNav = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'feed',
      label: 'Feed',
      icon: 'Home',
      path: '/developer-feed-dashboard'
    },
    {
      id: 'search',
      label: 'Search',
      icon: 'Search',
      path: '/search'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      path: '/notifications',
      hasNotification: true
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'MessageCircle',
      path: '/messages',
      hasNotification: true
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/user-profile'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 md:hidden ${className}`}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => handleNavigation(item?.path)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg nav-transition relative ${
              isActivePath(item?.path)
                ? 'text-accent' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="relative">
              <Icon name={item?.icon} size={20} />
              {item?.hasNotification && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
              )}
            </div>
            <span className="text-xs font-medium mt-1">{item?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;