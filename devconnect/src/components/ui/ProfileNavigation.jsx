import React, { useState } from 'react';
import Icon from '../AppIcon';

const ProfileNavigation = ({ 
  activeTab = 'posts', 
  onTabChange = () => {},
  userPermissions = { canEdit: false },
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    {
      id: 'posts',
      label: 'Posts',
      icon: 'FileText',
      count: 24,
      description: 'Published articles and updates'
    },
    {
      id: 'about',
      label: 'About',
      icon: 'User',
      description: 'Profile information and bio'
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: 'Activity',
      count: 156,
      description: 'Recent interactions and engagement'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'Code',
      count: 8,
      description: 'Portfolio and code repositories'
    },
    {
      id: 'connections',
      label: 'Connections',
      icon: 'Users',
      count: 342,
      description: 'Professional network'
    }
  ];

  const handleTabClick = async (tabId) => {
    if (tabId === activeTab || isLoading) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onTabChange(tabId);
    } catch (error) {
      console.error('Error switching tabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Posts</h3>
              {userPermissions?.canEdit && (
                <button className="text-accent hover:text-accent/80 nav-transition text-sm font-medium">
                  Create Post
                </button>
              )}
            </div>
            <div className="space-y-4">
              {[1, 2, 3]?.map((post) => (
                <div key={post} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation nav-transition">
                  <h4 className="font-semibold mb-2">Building Scalable React Applications</h4>
                  <p className="text-text-secondary text-sm mb-3">
                    A comprehensive guide to architecting React apps that can grow with your team...
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>24</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} />
                      <span>8</span>
                    </span>
                    <span>2 days ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">About</h3>
              {userPermissions?.canEdit && (
                <button className="text-accent hover:text-accent/80 nav-transition text-sm font-medium">
                  Edit Profile
                </button>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Bio</h4>
                <p className="text-text-secondary">
                  Full-stack developer passionate about creating scalable web applications. 
                  Experienced in React, Node.js, and cloud technologies. Always learning and sharing knowledge with the community.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']?.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-surface text-text-primary text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Experience</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Senior Frontend Developer</p>
                      <p className="text-sm text-text-secondary">TechCorp Inc. • 2022 - Present</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Full Stack Developer</p>
                      <p className="text-sm text-text-secondary">StartupXYZ • 2020 - 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { type: 'like', content: 'Liked a post about "Modern CSS Techniques"', time: '2 hours ago' },
                { type: 'comment', content: 'Commented on "JavaScript Performance Tips"', time: '1 day ago' },
                { type: 'connection', content: 'Connected with Sarah Chen', time: '3 days ago' },
                { type: 'post', content: 'Published "Building Scalable React Applications"', time: '1 week ago' }
              ]?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-surface rounded-lg">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon 
                      name={activity?.type === 'like' ? 'Heart' : activity?.type === 'comment' ? 'MessageCircle' : activity?.type === 'connection' ? 'UserPlus' : 'FileText'} 
                      size={16} 
                      className="text-accent"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity?.content}</p>
                    <p className="text-xs text-text-secondary mt-1">{activity?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Projects</h3>
              {userPermissions?.canEdit && (
                <button className="text-accent hover:text-accent/80 nav-transition text-sm font-medium">
                  Add Project
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4]?.map((project) => (
                <div key={project} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation nav-transition">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">E-commerce Platform</h4>
                    <Icon name="ExternalLink" size={16} className="text-text-secondary hover:text-accent nav-transition cursor-pointer" />
                  </div>
                  <p className="text-text-secondary text-sm mb-3">
                    Full-stack e-commerce solution built with React and Node.js
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="Star" size={12} />
                      <span>42</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="GitFork" size={12} />
                      <span>12</span>
                    </span>
                    <span>JavaScript</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'connections':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Connections</h3>
              <button className="text-accent hover:text-accent/80 nav-transition text-sm font-medium">
                Find People
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6]?.map((connection) => (
                <div key={connection} className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-elevation nav-transition">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-semibold">SC</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Sarah Chen</h4>
                  <p className="text-xs text-text-secondary mb-3">Frontend Developer at Google</p>
                  <button className="text-xs text-accent hover:text-accent/80 nav-transition">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-0 overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => handleTabClick(tab?.id)}
              disabled={isLoading}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap nav-transition
                border-b-2 min-w-0 flex-shrink-0
                ${activeTab === tab?.id
                  ? 'border-accent text-accent' :'border-transparent text-text-secondary hover:text-primary hover:border-border'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              title={tab?.description}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count && (
                <span className="bg-surface text-text-secondary px-2 py-0.5 rounded-full text-xs">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="min-h-96">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNavigation;