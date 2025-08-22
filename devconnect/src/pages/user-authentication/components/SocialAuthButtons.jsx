import React from 'react';
import Button from '../../../components/ui/Button';

const SocialAuthButtons = ({ onSocialAuth, isLoading = false }) => {
  const socialProviders = [
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      bgColor: 'bg-gray-900',
      hoverColor: 'hover:bg-gray-800'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    }
  ];

  const handleSocialAuth = (provider) => {
    const mockUserData = {
      email: `developer@${provider?.toLowerCase()}.com`,
      name: `${provider} Developer`,
      username: `${provider?.toLowerCase()}dev`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`
    };
    onSocialAuth(mockUserData);
  };

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth(provider)}
          iconName={provider?.icon}
          iconPosition="left"
          disabled={isLoading}
          className="justify-center"
        >
          Continue with {provider?.name}
        </Button>
      ))}
    </div>
  );
};

export default SocialAuthButtons;