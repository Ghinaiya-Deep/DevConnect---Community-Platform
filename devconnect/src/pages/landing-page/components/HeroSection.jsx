import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/user-authentication');
  };

  const handleExplore = () => {
    navigate('/developer-feed-dashboard');
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-surface to-muted min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-secondary rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-primary/5 rounded-lg"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Hero Content */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-6 leading-tight">
            Connect with
            <span className="block text-accent">Developers</span>
            <span className="block">Worldwide</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            Join the premier professional network for developers. Share knowledge, 
            build connections, and grow your career in the world's largest developer community.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="default"
            size="lg"
            onClick={handleGetStarted}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
          >
            Join DevConnect
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleExplore}
            iconName="Eye"
            iconPosition="left"
            className="w-full sm:w-auto px-8 py-4 text-lg"
          >
            Explore Community
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-text-secondary">Active Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-text-secondary">Posts Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-text-secondary">Countries</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-text-secondary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;