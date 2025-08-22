import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthenticationHeader = ({ mode }) => {
  const getHeaderContent = () => {
    switch (mode) {
      case 'signup':
        return {
          title: 'Join DevConnect',
          subtitle: 'Connect with developers worldwide and build your professional network',
          icon: 'UserPlus'
        };
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Sign in to your DevConnect account to continue',
          icon: 'LogIn'
        };
    }
  };

  const { title, subtitle, icon } = getHeaderContent();

  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elevation">
        <Icon name={icon} size={28} className="text-white" />
      </div>
      <h1 className="text-2xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-text-secondary text-sm leading-relaxed max-w-sm mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthenticationHeader;