import React from 'react';
import Button from '../../../components/ui/Button';

const AuthenticationTabs = ({ activeTab, onTabChange, isLoading = false }) => {
  const tabs = [
    { id: 'signin', label: 'Sign In' },
    { id: 'signup', label: 'Sign Up' }
  ];

  return (
    <div className="flex bg-surface rounded-lg p-1 mb-6">
      {tabs?.map((tab) => (
        <Button
          key={tab?.id}
          variant={activeTab === tab?.id ? 'default' : 'ghost'}
          size="sm"
          fullWidth
          onClick={() => onTabChange(tab?.id)}
          disabled={isLoading}
          className="flex-1"
        >
          {tab?.label}
        </Button>
      ))}
    </div>
  );
};

export default AuthenticationTabs;