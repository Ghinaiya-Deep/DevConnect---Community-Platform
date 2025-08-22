import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Smart Feed Algorithm",
      description: "Get personalized content based on your interests, skills, and connections. Never miss important updates from your network.",
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Code Collaboration",
      description: "Share code snippets, get feedback, and collaborate on projects with developers worldwide. Built-in syntax highlighting included.",
      icon: "Code",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Professional Profiles",
      description: "Showcase your skills, projects, and achievements. Create a compelling profile that attracts opportunities and connections.",
      icon: "User",
      image: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.jpg?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Powerful Features for Developers
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Everything you need to connect, share, and grow your developer career in one platform
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-20">
          {features?.map((feature, index) => (
            <div
              key={feature?.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Icon 
                    name={feature?.icon} 
                    size={32} 
                    className="text-accent"
                  />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                  {feature?.title}
                </h3>
                
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  {feature?.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Easy to use</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Mobile optimized</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Real-time updates</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 w-full max-w-lg">
                <div className="relative overflow-hidden rounded-lg shadow-elevation-md">
                  <Image
                    src={feature?.image}
                    alt={feature?.title}
                    className="w-full h-80 object-cover hover:scale-105 nav-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;