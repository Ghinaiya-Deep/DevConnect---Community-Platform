import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const Sidebar = ({ currentUser = null, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'feed',
      label: 'Feed',
      icon: 'Home',
      path: '/developer-feed-dashboard',
      count: null
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/user-profile',
      count: null
    },
    {
      id: 'connections',
      label: 'My Network',
      icon: 'Users',
      path: '/connections',
      count: 12
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'MessageCircle',
      path: '/messages',
      count: 3
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      path: '/notifications',
      count: 8
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: 'Bookmark',
      path: '/bookmarks',
      count: null
    }
  ];

  const quickActions = [
    {
      id: 'create-post',
      label: 'Create Post',
      icon: 'PenTool',
      action: () => console.log('Create post')
    },
    {
      id: 'find-developers',
      label: 'Find Developers',
      icon: 'Search',
      action: () => console.log('Find developers')
    },
    {
      id: 'join-groups',
      label: 'Join Groups',
      icon: 'Users',
      action: () => console.log('Join groups')
    }
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation h-fit sticky top-20 ${className}`}>
      {/* User Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {currentUser?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary truncate">
              {currentUser?.name || 'Developer User'}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {currentUser?.title || 'Full Stack Developer'}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {currentUser?.connections || 342} connections
            </p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-text-primary">24</p>
            <p className="text-xs text-text-secondary">Posts</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-text-primary">1.2k</p>
            <p className="text-xs text-text-secondary">Followers</p>
          </div>
        </div>
      </div>
      {/* Navigation Items */}
      <div className="p-4">
        <nav className="space-y-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg nav-transition ${
                isActivePath(item?.path)
                  ? 'bg-accent/10 text-accent' :'text-text-secondary hover:bg-surface hover:text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </div>
              {item?.count && (
                <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                  {item?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <h4 className="font-semibold text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary nav-transition"
            >
              <Icon name={action?.icon} size={16} />
              <span className="text-sm font-medium">{action?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="p-4 border-t border-border">
        <h4 className="font-semibold text-text-primary mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {[
            {
              type: 'like',
              content: 'You liked a post by Sarah Chen',
              time: '2h ago'
            },
            {
              type: 'connection',
              content: 'New connection with Mike Johnson',
              time: '1d ago'
            },
            {
              type: 'comment',
              content: 'You commented on React best practices',
              time: '3d ago'
            }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={activity?.type === 'like' ? 'Heart' : activity?.type === 'connection' ? 'UserPlus' : 'MessageCircle'} 
                  size={12} 
                  className="text-accent"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-primary">{activity?.content}</p>
                <p className="text-xs text-text-secondary mt-1">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;