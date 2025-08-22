import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = ({ currentUser = null, onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = !!currentUser;
  const isAuthPage = location?.pathname === '/user-authentication';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.dropdown-container')) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowProfileMenu(false);
    navigate('/landing-page');
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer nav-transition hover:opacity-80"
      onClick={() => handleNavigation(isAuthenticated ? '/developer-feed-dashboard' : '/landing-page')}
    >
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 2L2 7L12 12L22 7L12 2Z" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M2 17L12 22L22 17" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M2 12L12 17L22 12" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-xl font-bold text-primary">DevConnect</span>
    </div>
  );

  const UnauthenticatedNav = () => (
    <>
      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => handleNavigation('/landing-page')}
          className={`nav-transition text-sm font-medium ${
            location?.pathname === '/landing-page' ?'text-primary' :'text-text-secondary hover:text-primary'
          }`}
        >
          Home
        </button>
        <button 
          onClick={() => handleNavigation('/developer-feed-dashboard')}
          className="nav-transition text-sm font-medium text-text-secondary hover:text-primary"
        >
          Explore
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {!isAuthPage && (
          <>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/user-authentication')}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleNavigation('/user-authentication')}
            >
              Get Started
            </Button>
          </>
        )}
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-primary nav-transition"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>
    </>
  );

  const AuthenticatedNav = () => (
    <>
      <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              type="search"
              placeholder="Search developers, posts, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10 pr-4 py-2 w-full bg-surface border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </form>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <button 
          onClick={() => handleNavigation('/developer-feed-dashboard')}
          className={`nav-transition text-sm font-medium ${
            location?.pathname === '/developer-feed-dashboard' ?'text-primary' :'text-text-secondary hover:text-primary'
          }`}
        >
          Feed
        </button>
        <button 
          onClick={() => handleNavigation('/user-profile')}
          className={`nav-transition text-sm font-medium ${
            location?.pathname === '/user-profile' ?'text-primary' :'text-text-secondary hover:text-primary'
          }`}
        >
          Profile
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative dropdown-container">
          <button
            onClick={handleNotificationClick}
            className="p-2 text-text-secondary hover:text-primary nav-transition relative"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-elevation-md z-50 animate-slide-in">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 hover:bg-surface nav-transition">
                  <p className="text-sm font-medium">New connection request</p>
                  <p className="text-xs text-text-secondary mt-1">Sarah Chen wants to connect</p>
                  <p className="text-xs text-text-secondary mt-1">2 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-surface nav-transition">
                  <p className="text-sm font-medium">Post liked</p>
                  <p className="text-xs text-text-secondary mt-1">John liked your React tutorial</p>
                  <p className="text-xs text-text-secondary mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative dropdown-container">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-surface nav-transition"
          >
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">
                {currentUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <Icon name="ChevronDown" size={16} className="text-text-secondary" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevation-md z-50 animate-slide-in">
              <div className="p-3 border-b border-border">
                <p className="font-medium text-sm">{currentUser?.name || 'User'}</p>
                <p className="text-xs text-text-secondary">{currentUser?.email || 'user@example.com'}</p>
              </div>
              <div className="py-2">
                <button
                  onClick={() => {
                    handleNavigation('/user-profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface nav-transition flex items-center space-x-2"
                >
                  <Icon name="User" size={16} />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface nav-transition flex items-center space-x-2"
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <hr className="my-2 border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface nav-transition flex items-center space-x-2 text-destructive"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-primary nav-transition"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="flex items-center justify-end flex-1">
            {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-in">
          <div className="px-4 py-4 space-y-4">
            {isAuthenticated && (
              <div className="lg:hidden mb-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                    />
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="pl-10 pr-4 py-2 w-full bg-surface border-border rounded-lg"
                    />
                  </div>
                </form>
              </div>
            )}
            
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => handleNavigation('/developer-feed-dashboard')}
                  className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-primary nav-transition"
                >
                  Feed
                </button>
                <button 
                  onClick={() => handleNavigation('/user-profile')}
                  className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-primary nav-transition"
                >
                  Profile
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavigation('/landing-page')}
                  className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-primary nav-transition"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavigation('/developer-feed-dashboard')}
                  className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-primary nav-transition"
                >
                  Explore
                </button>
                {!isAuthPage && (
                  <div className="pt-4 border-t border-border space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      fullWidth
                      onClick={() => handleNavigation('/user-authentication')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      fullWidth
                      onClick={() => handleNavigation('/user-authentication')}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;