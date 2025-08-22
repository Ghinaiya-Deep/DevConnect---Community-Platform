import React, { useState, useEffect, useCallback } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PostComposer from './components/PostComposer';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import TrendingPanel from './components/TrendingPanel';
import MobileBottomNav from './components/MobileBottomNav';
import LoadingSkeleton from './components/LoadingSkeleton';
import Icon from '../../components/AppIcon';

const DeveloperFeedDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Mock current user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: 'Deep Ghinaiya',
      username: 'deepghinaiya',
      email: 'deepghinaiya@gmail.com',
      title: 'Senior Full Stack Developer',
      avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQFppDzOUQcxjA/profile-displayphoto-shrink_400_400/B4DZVcBTgSHAAo-/0/1741005605152?e=1758758400&v=beta&t=XBblxwrEhf0q_1GRCCFlmCwbL9elmKBJaWn5wG_vuBw',
      connections: 9433,
      followers: 10000,
      posts: 550
    };
    setCurrentUser(mockUser);
  }, []);

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      content: `Just finished implementing a real-time chat feature using WebSockets and React! 🚀\n\nThe key was optimizing the connection handling and implementing proper error recovery. Here are some lessons learned:\n\n• Always handle connection drops gracefully\n• Implement exponential backoff for reconnections\n• Use message queuing for offline scenarios\n\nWhat's your experience with WebSocket implementations?`,image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      author: {
        id: 2,
        name: 'Sarah Chen',username: 'sarahchen',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',title: 'Frontend Developer at Google'
      },
      timestamp: new Date(Date.now() - 3600000),
      likes: 42,
      comments: 8,
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      content: `Hot take: TypeScript isn't just about type safety - it's about developer experience! 💭\n\nAfter migrating our entire codebase from JavaScript to TypeScript, here's what we gained:\n\n✅ Better IDE support and autocomplete\n✅ Easier refactoring with confidence\n✅ Self-documenting code\n✅ Fewer runtime errors\n✅ Better team collaboration\n\nThe initial learning curve was worth it. What's holding you back from adopting TypeScript?`,
      image: null,
      author: {
        id: 3,
        name: 'Alex Rodriguez',username: 'alexrodriguez',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',title: 'Full Stack Engineer at Microsoft'
      },
      timestamp: new Date(Date.now() - 7200000),
      likes: 156,
      comments: 23,
      shares: 12,
      isLiked: true
    },
    {
      id: 3,
      content: `Building my first Chrome extension and it's been a wild ride! 🎢\n\nStarted with a simple idea: automatically format code snippets on any webpage. Ended up learning about:\n\n• Manifest V3 changes\n• Content scripts vs background scripts\n• Cross-origin requests\n• Storage APIs\n\nThe documentation could be better, but the Chrome DevTools make debugging much easier than I expected.`,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
      author: {
        id: 4,
        name: 'Emily Johnson',
        username: 'emilyjohnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'DevOps Engineer at Amazon'
      },
      timestamp: new Date(Date.now() - 10800000),
      likes: 89,
      comments: 15,
      shares: 7,
      isLiked: false
    },
    {
      id: 4,
      content: `Kubernetes can be overwhelming at first, but here's my simplified mental model that helped me get started:\n\n🏗️ Think of it as a smart building manager:\n• Pods = Apartments (where your apps live)\n• Services = Reception desk (how visitors find apartments)\n• Deployments = Building maintenance (keeps everything running)\n• ConfigMaps = Building rules and settings\n\nOnce you understand these core concepts, everything else starts to make sense!`,
      image: null,
      author: {
        id: 5,
        name: 'David Kim',username: 'davidkim',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',title: 'Mobile Developer at Spotify'
      },
      timestamp: new Date(Date.now() - 14400000),
      likes: 234,
      comments: 31,
      shares: 18,
      isLiked: true
    },
    {
      id: 5,
      content: `Just deployed my side project to production! 🎉\n\nIt's a developer tool that automatically generates API documentation from your code comments. Built with:\n\n• Next.js for the frontend\n• Node.js + Express for the API\n• PostgreSQL for data storage\n• Docker for containerization\n• AWS for hosting\n\nTook me 3 months of weekend coding, but seeing it live is incredibly rewarding. Link in comments!`,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      author: {
        id: 6,
        name: 'Lisa Wang',
        username: 'lisawang',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        title: 'Backend Developer at Stripe'
      },
      timestamp: new Date(Date.now() - 18000000),
      likes: 178,
      comments: 42,
      shares: 25,
      isLiked: false
    }
  ];

  // Load initial posts
  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  // Handle infinite scroll
  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || !hasMorePosts) return;

    setIsLoadingMore(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const morePosts = mockPosts?.map(post => ({
        ...post,
        id: post?.id + posts?.length,
        timestamp: new Date(post.timestamp.getTime() - (posts.length * 3600000))
      }));

      setPosts(prev => [...prev, ...morePosts]);
      
      if (posts?.length >= 15) {
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [posts?.length, isLoadingMore, hasMorePosts]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement?.scrollTop !== document.documentElement?.offsetHeight) {
        return;
      }
      loadMorePosts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  // Handle pull to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setHasMorePosts(true);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle post interactions
  const handleLike = (postId) => {
    setPosts(prev => prev?.map(post => {
      if (post?.id === postId) {
        return {
          ...post,
          isLiked: !post?.isLiked,
          likes: post?.isLiked ? post?.likes - 1 : post?.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, comment) => {
    setPosts(prev => prev?.map(post => {
      if (post?.id === postId) {
        return {
          ...post,
          comments: post?.comments + 1
        };
      }
      return post;
    }));
    console.log('New comment on post', postId, ':', comment);
  };

  const handleShare = (postId) => {
    setPosts(prev => prev?.map(post => {
      if (post?.id === postId) {
        return {
          ...post,
          shares: post?.shares + 1
        };
      }
      return post;
    }));
    console.log('Shared post:', postId);
  };

  const handleNewPost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        currentUser={currentUser} 
        onLogout={handleLogout}
      />
      <div className="pt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {/* Left Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <Sidebar currentUser={currentUser} />
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              {/* Pull to Refresh Indicator */}
              {refreshing && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
                  <span className="ml-2 text-sm text-text-secondary">Refreshing...</span>
                </div>
              )}

              {/* Post Composer */}
              {currentUser && !isLoading && (
                <PostComposer 
                  onPost={handleNewPost}
                  currentUser={currentUser}
                />
              )}

              {/* Loading State */}
              {isLoading && (
                <>
                  <LoadingSkeleton type="composer" count={1} />
                  <LoadingSkeleton type="post" count={3} />
                </>
              )}

              {/* Posts Feed */}
              {!isLoading && (
                <div className="space-y-0">
                  {posts?.map((post) => (
                    <PostCard
                      key={post?.id}
                      post={post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              )}

              {/* Load More Indicator */}
              {isLoadingMore && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                  <span className="ml-3 text-text-secondary">Loading more posts...</span>
                </div>
              )}

              {/* End of Feed */}
              {!hasMorePosts && posts?.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-text-secondary">You've reached the end of your feed</p>
                  <button
                    onClick={handleRefresh}
                    className="mt-2 text-accent hover:text-accent/80 nav-transition text-sm font-medium"
                  >
                    Refresh to see new posts
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && posts?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Welcome to DevConnect!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Start following developers to see their posts in your feed.
                  </p>
                  <button className="text-accent hover:text-accent/80 nav-transition font-medium">
                    Find developers to follow
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar - Desktop */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              {isLoading ? (
                <LoadingSkeleton type="trending" count={1} />
              ) : (
                <TrendingPanel />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSidebar(false)}
          ></div>
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-background">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-text-primary">Menu</h2>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2 text-text-secondary hover:text-text-primary nav-transition"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto">
              <Sidebar currentUser={currentUser} />
            </div>
          </div>
        </div>
      )}
      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => document.querySelector('textarea')?.focus()}
        className="fixed bottom-20 right-4 w-14 h-14 bg-accent text-white rounded-full shadow-elevation-lg flex items-center justify-center md:hidden hover:bg-accent/90 nav-transition z-20"
      >
        <Icon name="Plus" size={24} />
      </button>
    </div>
  );
};

export default DeveloperFeedDashboard;