import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      company: "Google",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "DevConnect has been instrumental in my career growth. The quality of discussions and the network I've built here is unmatched. I've learned more in 6 months than I did in years elsewhere.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Full Stack Engineer",
      company: "Microsoft",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "The code collaboration features are amazing. I\'ve contributed to several open source projects and found my current job through connections made on DevConnect. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "DevOps Engineer",
      company: "Amazon",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "As someone transitioning into tech, DevConnect provided the mentorship and community support I needed. The knowledge sharing here is incredible and everyone is so helpful.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            See what our community members have to say about their DevConnect experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-elevation-md nav-transition"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className="text-warning fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-text-secondary mb-6 leading-relaxed">
                "{testimonial?.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-primary">
                    {testimonial?.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonial?.role} at {testimonial?.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-sm">Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <span className="text-sm">Industry Trusted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-success" />
              <span className="text-sm">50K+ Members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;