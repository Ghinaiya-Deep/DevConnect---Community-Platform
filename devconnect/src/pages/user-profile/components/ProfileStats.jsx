import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ 
  stats = {},
  className = ''
}) => {
  const mockStats = {
    totalPosts: 156,
    totalLikes: 2847,
    totalComments: 892,
    totalShares: 234,
    profileViews: 5632,
    connectionsThisMonth: 47,
    postsThisMonth: 12,
    engagementRate: 8.4,
    topSkillEndorsements: 89,
    repositoriesContributed: 23,
    ...stats
  };

  const statItems = [
    {
      id: 'posts',
      label: 'Total Posts',
      value: mockStats?.totalPosts,
      icon: 'FileText',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'likes',
      label: 'Total Likes',
      value: mockStats?.totalLikes?.toLocaleString(),
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'comments',
      label: 'Comments',
      value: mockStats?.totalComments,
      icon: 'MessageCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'shares',
      label: 'Shares',
      value: mockStats?.totalShares,
      icon: 'Share2',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'views',
      label: 'Profile Views',
      value: mockStats?.profileViews?.toLocaleString(),
      icon: 'Eye',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'connections',
      label: 'New Connections',
      value: mockStats?.connectionsThisMonth,
      icon: 'UserPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      subtitle: 'This month'
    }
  ];

  const achievementItems = [
    {
      id: 'engagement',
      label: 'Engagement Rate',
      value: `${mockStats?.engagementRate}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'endorsements',
      label: 'Skill Endorsements',
      value: mockStats?.topSkillEndorsements,
      icon: 'Award',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'repositories',
      label: 'Repositories',
      value: mockStats?.repositoriesContributed,
      icon: 'GitBranch',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Stats Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Activity Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className="text-xl font-bold text-primary">{stat?.value}</div>
              <div className="text-xs text-text-secondary">{stat?.label}</div>
              {stat?.subtitle && (
                <div className="text-xs text-text-secondary opacity-75">{stat?.subtitle}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievementItems?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
              <div className={`w-10 h-10 ${achievement?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={achievement?.icon} size={18} className={achievement?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-lg font-semibold text-primary">{achievement?.value}</div>
                <div className="text-sm text-text-secondary truncate">{achievement?.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Progress */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">This Month's Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={16} className="text-accent" />
              </div>
              <span className="text-text-primary">Posts Published</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">{mockStats?.postsThisMonth}</div>
              <div className="text-xs text-success">+3 from last month</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="UserPlus" size={16} className="text-success" />
              </div>
              <span className="text-text-primary">New Connections</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">{mockStats?.connectionsThisMonth}</div>
              <div className="text-xs text-success">+12 from last month</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={16} className="text-warning" />
              </div>
              <span className="text-text-primary">Profile Views</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">1,247</div>
              <div className="text-xs text-success">+18% from last month</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="flex flex-col items-center p-3 bg-surface hover:bg-border rounded-lg nav-transition">
            <Icon name="Plus" size={20} className="text-accent mb-2" />
            <span className="text-xs text-text-secondary">New Post</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-surface hover:bg-border rounded-lg nav-transition">
            <Icon name="Users" size={20} className="text-success mb-2" />
            <span className="text-xs text-text-secondary">Find People</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-surface hover:bg-border rounded-lg nav-transition">
            <Icon name="BarChart3" size={20} className="text-warning mb-2" />
            <span className="text-xs text-text-secondary">Analytics</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-surface hover:bg-border rounded-lg nav-transition">
            <Icon name="Settings" size={20} className="text-secondary mb-2" />
            <span className="text-xs text-text-secondary">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;