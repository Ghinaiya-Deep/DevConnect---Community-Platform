import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingPanel = ({ className = '' }) => {
  const [followingUsers, setFollowingUsers] = useState(new Set());

  const trendingTopics = [
    {
      id: 1,
      tag: '#ReactJS',
      posts: 1234,
      growth: '+12%'
    },
    {
      id: 2,
      tag: '#JavaScript',
      posts: 2456,
      growth: '+8%'
    },
    {
      id: 3,
      tag: '#TypeScript',
      posts: 987,
      growth: '+15%'
    },
    {
      id: 4,
      tag: '#NodeJS',
      posts: 1567,
      growth: '+6%'
    },
    {
      id: 5,
      tag: '#Python',
      posts: 2134,
      growth: '+10%'
    },
    {
      id: 6,
      tag: '#WebDevelopment',
      posts: 3421,
      growth: '+5%'
    }
  ];

  const suggestedDevelopers = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior Frontend Developer at Google',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 12,
      skills: ['React', 'TypeScript', 'GraphQL']
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      title: 'Full Stack Engineer at Microsoft',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 8,
      skills: ['Node.js', 'Azure', 'Docker']
    },
    {
      id: 3,
      name: 'Emily Johnson',
      title: 'DevOps Engineer at Amazon',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 15,
      skills: ['AWS', 'Kubernetes', 'Python']
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Mobile Developer at Spotify',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 6,
      skills: ['React Native', 'Swift', 'Kotlin']
    }
  ];

  const handleFollowUser = (userId) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(userId)) {
        newSet?.delete(userId);
      } else {
        newSet?.add(userId);
      }
      return newSet;
    });
  };

  const handleTopicClick = (tag) => {
    console.log('Searching for topic:', tag);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Trending Topics */}
      <div className="bg-card border border-border rounded-lg shadow-elevation">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">Trending Topics</h3>
            <Icon name="TrendingUp" size={18} className="text-accent" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {trendingTopics?.map((topic) => (
              <button
                key={topic?.id}
                onClick={() => handleTopicClick(topic?.tag)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface nav-transition text-left"
              >
                <div className="flex-1">
                  <p className="font-medium text-accent">{topic?.tag}</p>
                  <p className="text-xs text-text-secondary">
                    {topic?.posts?.toLocaleString()} posts
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-success font-medium">
                    {topic?.growth}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <button className="w-full mt-4 text-center text-sm text-accent hover:text-accent/80 nav-transition">
            Show more topics
          </button>
        </div>
      </div>
      {/* Suggested Developers */}
      <div className="bg-card border border-border rounded-lg shadow-elevation">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">Suggested for You</h3>
            <Icon name="UserPlus" size={18} className="text-accent" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            {suggestedDevelopers?.map((developer) => (
              <div key={developer?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface nav-transition">
                <Image
                  src={developer?.avatar}
                  alt={`${developer?.name}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-sm truncate">
                    {developer?.name}
                  </h4>
                  <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                    {developer?.title}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {developer?.skills?.slice(0, 2)?.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-surface text-text-secondary text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {developer?.skills?.length > 2 && (
                      <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded">
                        +{developer?.skills?.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-3">
                    {developer?.mutualConnections} mutual connections
                  </p>
                  
                  <Button
                    variant={followingUsers?.has(developer?.id) ? "outline" : "default"}
                    size="xs"
                    onClick={() => handleFollowUser(developer?.id)}
                    iconName={followingUsers?.has(developer?.id) ? "UserCheck" : "UserPlus"}
                    iconPosition="left"
                    iconSize={14}
                  >
                    {followingUsers?.has(developer?.id) ? 'Following' : 'Follow'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-center text-sm text-accent hover:text-accent/80 nav-transition">
            View all suggestions
          </button>
        </div>
      </div>
      {/* Developer Events */}
      <div className="bg-card border border-border rounded-lg shadow-elevation">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">Upcoming Events</h3>
            <Icon name="Calendar" size={18} className="text-accent" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: 'React Conference 2025',
                date: 'Jan 15, 2025',
                time: '10:00 AM PST',
                attendees: 1234,
                type: 'Virtual'
              },
              {
                id: 2,
                title: 'JavaScript Meetup',
                date: 'Jan 20, 2025',
                time: '6:00 PM EST',
                attendees: 89,
                type: 'In-person'
              },
              {
                id: 3,
                title: 'Web Dev Workshop',
                date: 'Jan 25, 2025',
                time: '2:00 PM GMT',
                attendees: 456,
                type: 'Hybrid'
              }
            ]?.map((event) => (
              <div key={event?.id} className="p-3 rounded-lg border border-border hover:bg-surface nav-transition">
                <h4 className="font-medium text-text-primary text-sm mb-1">
                  {event?.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                  <Icon name="Calendar" size={12} />
                  <span>{event?.date}</span>
                  <span>•</span>
                  <span>{event?.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Users" size={12} />
                    <span>{event?.attendees} attending</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    event?.type === 'Virtual' ? 'bg-blue-100 text-blue-800' :
                    event?.type === 'In-person'? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {event?.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-center text-sm text-accent hover:text-accent/80 nav-transition">
            View all events
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingPanel;