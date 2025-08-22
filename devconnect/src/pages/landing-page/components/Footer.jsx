import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Home", path: "/landing-page" },
        { label: "Developer Feed", path: "/developer-feed-dashboard" },
        { label: "Join Community", path: "/user-authentication" },
        { label: "User Profiles", path: "/user-profile" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", path: "#" },
        { label: "API Reference", path: "#" },
        { label: "Community Guidelines", path: "#" },
        { label: "Help Center", path: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "#" },
        { label: "Careers", path: "#" },
        { label: "Press Kit", path: "#" },
        { label: "Contact", path: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", path: "#" },
        { label: "Terms of Service", path: "#" },
        { label: "Cookie Policy", path: "#" },
        { label: "GDPR", path: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
    { name: "GitHub", icon: "Github", url: "https://github.com" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com" },
    { name: "Discord", icon: "MessageSquare", url: "https://discord.com" }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M12 2L2 7L12 12L22 7L12 2Z" 
                      stroke="#1a1a1a" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M2 17L12 22L22 17" 
                      stroke="#1a1a1a" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M2 12L12 17L22 12" 
                      stroke="#1a1a1a" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold">DevConnect</span>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                The premier professional network for developers worldwide. 
                Connect, share knowledge, and grow your career with our global community.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 nav-transition"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h3 className="font-semibold mb-4">{section?.title}</h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <button
                        onClick={() => handleNavigation(link?.path)}
                        className="text-white/80 hover:text-white nav-transition text-sm"
                      >
                        {link?.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-white/80 text-sm">
                Get the latest developer news and community updates delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-80">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
              <button className="w-full sm:w-auto px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 nav-transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/80 text-sm text-center md:text-left">
              © {currentYear} DevConnect. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <button className="hover:text-white nav-transition">
                Privacy Policy
              </button>
              <button className="hover:text-white nav-transition">
                Terms of Service
              </button>
              <button className="hover:text-white nav-transition">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;