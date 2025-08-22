import React from 'react';

const LoadingSkeleton = ({ type = 'post', count = 1 }) => {
  const PostSkeleton = () => (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-surface rounded w-32"></div>
            <div className="h-3 bg-surface rounded w-16"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-surface rounded w-full"></div>
            <div className="h-4 bg-surface rounded w-3/4"></div>
            <div className="h-4 bg-surface rounded w-1/2"></div>
          </div>
          <div className="h-48 bg-surface rounded-lg"></div>
          <div className="flex items-center space-x-6 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-surface rounded"></div>
              <div className="h-3 bg-surface rounded w-8"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-surface rounded"></div>
              <div className="h-3 bg-surface rounded w-8"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-surface rounded"></div>
              <div className="h-3 bg-surface rounded w-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SidebarSkeleton = () => (
    <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-surface rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-surface rounded w-32"></div>
          <div className="h-3 bg-surface rounded w-24"></div>
          <div className="h-3 bg-surface rounded w-20"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        {[1, 2, 3, 4, 5]?.map((item) => (
          <div key={item} className="flex items-center space-x-3 p-3">
            <div className="w-5 h-5 bg-surface rounded"></div>
            <div className="h-4 bg-surface rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const TrendingSkeleton = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-surface rounded w-32"></div>
          <div className="w-5 h-5 bg-surface rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5]?.map((item) => (
            <div key={item} className="flex items-center justify-between p-3">
              <div className="space-y-2">
                <div className="h-4 bg-surface rounded w-20"></div>
                <div className="h-3 bg-surface rounded w-16"></div>
              </div>
              <div className="h-3 bg-surface rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-surface rounded w-36"></div>
          <div className="w-5 h-5 bg-surface rounded"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3]?.map((item) => (
            <div key={item} className="flex items-start space-x-3 p-3">
              <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface rounded w-32"></div>
                <div className="h-3 bg-surface rounded w-full"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-surface rounded w-16"></div>
                  <div className="h-6 bg-surface rounded w-16"></div>
                </div>
                <div className="h-3 bg-surface rounded w-24"></div>
                <div className="h-8 bg-surface rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ComposerSkeleton = () => (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-pulse">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-4">
          <div className="h-12 bg-surface rounded-lg"></div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="h-8 bg-surface rounded w-16"></div>
              <div className="h-8 bg-surface rounded w-16"></div>
              <div className="h-8 bg-surface rounded w-16"></div>
            </div>
            <div className="h-8 bg-surface rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'post':
          skeletons?.push(<PostSkeleton key={i} />);
          break;
        case 'sidebar':
          skeletons?.push(<SidebarSkeleton key={i} />);
          break;
        case 'trending':
          skeletons?.push(<TrendingSkeleton key={i} />);
          break;
        case 'composer':
          skeletons?.push(<ComposerSkeleton key={i} />);
          break;
        default:
          skeletons?.push(<PostSkeleton key={i} />);
      }
    }
    return skeletons;
  };

  return <>{renderSkeletons()}</>;
};

export default LoadingSkeleton;