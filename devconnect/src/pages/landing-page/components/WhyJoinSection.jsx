import React from 'react';
import Icon from '../../../components/AppIcon';

const WhyJoinSection = () => {
  const benefits = [
    {
      id: 1,
      icon: "Users",
      title: "Professional Network",
      description: "Connect with developers from top companies worldwide. Build meaningful professional relationships that advance your career."
    },
    {
      id: 2,
      icon: "BookOpen",
      title: "Knowledge Sharing",
      description: "Share your expertise and learn from others. Access tutorials, code snippets, and industry insights from experienced developers."
    },
    {
      id: 3,
      icon: "Briefcase",
      title: "Career Opportunities",
      description: "Discover job openings, freelance projects, and collaboration opportunities. Get noticed by recruiters and hiring managers."
    },
    {
      id: 4,
      icon: "TrendingUp",
      title: "Skill Development",
      description: "Stay updated with latest technologies and trends. Participate in discussions about cutting-edge development practices."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Why Join DevConnect?
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Discover the benefits of being part of the world's most active developer community
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits?.map((benefit) => (
            <div
              key={benefit?.id}
              className="group bg-card border border-border rounded-lg p-8 text-center hover:shadow-elevation-md nav-transition hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 nav-transition">
                <Icon 
                  name={benefit?.icon} 
                  size={32} 
                  className="text-accent group-hover:scale-110 nav-transition"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-primary mb-4">
                {benefit?.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <div className="bg-surface border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-text-secondary mb-6">
              Join thousands of developers who are already building their professional network
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-success" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-success" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;