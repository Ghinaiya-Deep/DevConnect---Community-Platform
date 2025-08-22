import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/user-authentication');
  };

  const handleLearnMore = () => {
    navigate('/developer-feed-dashboard');
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary to-secondary px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Start connecting with developers, sharing knowledge, and building your professional network today. 
            It's free to join and takes less than 2 minutes.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="default"
            size="lg"
            onClick={handleJoinNow}
            iconName="UserPlus"
            iconPosition="left"
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-white/90"
          >
            Join DevConnect Free
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleLearnMore}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full sm:w-auto px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary"
          >
            Explore Community
          </Button>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/90">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Check" size={20} className="text-white flex-shrink-0" />
            <span className="text-sm">Free forever</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Check" size={20} className="text-white flex-shrink-0" />
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Check" size={20} className="text-white flex-shrink-0" />
            <span className="text-sm">Join in under 2 minutes</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm mb-4">
            Join developers from these companies and more:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/60">
            <span className="text-lg font-semibold">Google</span>
            <span className="text-lg font-semibold">Microsoft</span>
            <span className="text-lg font-semibold">Amazon</span>
            <span className="text-lg font-semibold">Meta</span>
            <span className="text-lg font-semibold">Netflix</span>
            <span className="text-lg font-semibold">Spotify</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;