import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostGrid = ({ 
  posts = [], 
  isOwnProfile = false,
  onPostClick = () => {},
  onDeletePost = () => {},
  onEditPost = () => {},
  className = ''
}) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const mockPosts = [
    {
      id: 1,
      content: `Just shipped a new feature that reduces our API response time by 40%! 🚀\n\nKey optimizations:\n• Implemented Redis caching for frequently accessed data\n• Optimized database queries with proper indexing\n• Added connection pooling\n• Compressed response payloads\n\nPerformance matters, especially at scale. What's your go-to optimization technique?`,
      images: ["https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"],
      likes: 89,
      comments: 23,
      shares: 12,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isLiked: true,
      tags: ["performance", "optimization", "backend"]
    },
    {
      id: 2,
      content: `Excited to share my latest open source project - a React component library with 50+ customizable components! 🎨\n\nBuilt with:\n✅ TypeScript for type safety\n✅ Tailwind CSS for styling\n✅ Storybook for documentation\n✅ Jest for testing\n✅ Rollup for bundling\n\nCheck it out and let me know what you think!`,
      images: [],
      likes: 156,
      comments: 34,
      shares: 28,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isLiked: false,
      tags: ["opensource", "react", "typescript"]
    },
    {
      id: 3,
      content: `Had an amazing time speaking at DevConf 2024! 🎤\n\nTalked about "Building Scalable Microservices with Node.js" to 500+ developers. The energy in the room was incredible!\n\nKey takeaways from my talk:\n• Service decomposition strategies\n• Inter-service communication patterns\n• Monitoring and observability\n• Deployment best practices\n\nSlides and code examples are now available on my GitHub. Thanks to everyone who attended!`,
      images: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=600&h=400&fit=crop"
      ],
      likes: 234,
      comments: 67,
      shares: 45,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isLiked: true,
      tags: ["speaking", "conference", "microservices"]
    },
    {
      id: 4,
      content: `Quick tip for React developers: Use React.memo() wisely! 💡\n\nWhile it can prevent unnecessary re-renders, overusing it can actually hurt performance. Here's when to use it:\n\n✅ Components that receive the same props frequently\n✅ Expensive rendering operations\n✅ Components deep in the tree\n\n❌ Components that rarely re-render\n❌ Components with frequently changing props\n❌ Simple components with minimal rendering cost\n\nProfile first, optimize second!`,
      images: [],
      likes: 78,
      comments: 19,
      shares: 8,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLiked: false,
      tags: ["react", "performance", "tips"]
    },
    {
      id: 5,
      content: `Celebrating 5 years at TechCorp! 🎉\n\nWhat an incredible journey it's been. From junior developer to senior full-stack engineer, I've learned so much and worked with amazing people.\n\nHighlights:\n• Led 3 major product launches\n• Mentored 12 junior developers\n• Contributed to 50+ open source projects\n• Spoke at 8 conferences\n\nGrateful for the opportunities and excited for what's next!`,
      images: ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop"],
      likes: 312,
      comments: 89,
      shares: 56,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isLiked: true,
      tags: ["milestone", "career", "gratitude"]
    },
    {
      id: 6,
      content: `Docker best practices that saved me hours of debugging: 🐳\n\n1. Use multi-stage builds to reduce image size\n2. Leverage .dockerignore to exclude unnecessary files\n3. Run containers as non-root users\n4. Use specific tags instead of 'latest'\n5. Implement health checks\n6. Keep images lightweight with Alpine Linux\n\nWhat Docker tips would you add to this list?`,
      images: [],
      likes: 145,
      comments: 42,
      shares: 31,
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      isLiked: false,
      tags: ["docker", "devops", "bestpractices"]
    }
  ];

  const postsToShow = posts?.length > 0 ? posts : mockPosts;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    onPostClick(post);
  };

  const handleDeleteClick = (post, e) => {
    e?.stopPropagation();
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleEditClick = (post, e) => {
    e?.stopPropagation();
    onEditPost(post);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      onDeletePost(postToDelete?.id);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow?.map((post) => (
          <div
            key={post?.id}
            onClick={() => handlePostClick(post)}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-md nav-transition cursor-pointer group"
          >
            {/* Post Images */}
            {post?.images && post?.images?.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post?.images?.[0]}
                  alt="Post image"
                  className="w-full h-full object-cover group-hover:scale-105 nav-transition"
                />
                {post?.images?.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    +{post?.images?.length - 1}
                  </div>
                )}
                {isOwnProfile && (
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 nav-transition">
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => handleEditClick(post, e)}
                        className="bg-black/70 hover:bg-black/80 text-white p-1.5 rounded nav-transition"
                      >
                        <Icon name="Edit" size={14} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(post, e)}
                        className="bg-black/70 hover:bg-error text-white p-1.5 rounded nav-transition"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Post Content */}
            <div className="p-4">
              {/* Content Preview */}
              <div className="mb-3">
                <p className="text-text-primary text-sm leading-relaxed line-clamp-4">
                  {post?.content}
                </p>
              </div>

              {/* Tags */}
              {post?.tags && post?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post?.tags?.length > 3 && (
                    <span className="px-2 py-1 text-text-secondary text-xs">
                      +{post?.tags?.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} className={post?.isLiked ? "text-error" : ""} />
                    <span>{post?.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={12} />
                    <span>{post?.comments}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Share2" size={12} />
                    <span>{post?.shares}</span>
                  </span>
                </div>
                <span>{formatTimeAgo(post?.timestamp)}</span>
              </div>

              {/* Own Profile Actions */}
              {isOwnProfile && !post?.images?.length && (
                <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 nav-transition">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => handleEditClick(post, e)}
                      className="p-1.5 text-text-secondary hover:text-accent nav-transition"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(post, e)}
                      className="p-1.5 text-text-secondary hover:text-error nav-transition"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {postsToShow?.length >= 6 && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Load More Posts
          </Button>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="Trash2" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Delete Post</h3>
                <p className="text-sm text-text-secondary">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this post? This will permanently remove it from your profile and the feed.
            </p>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="flex-1"
              >
                Delete Post
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Empty State */}
      {postsToShow?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No posts yet</h3>
          <p className="text-text-secondary mb-4">
            {isOwnProfile 
              ? "Share your first post to get started!" :"This user hasn't shared any posts yet."
            }
          </p>
          {isOwnProfile && (
            <Button variant="default" iconName="Plus" iconPosition="left">
              Create Your First Post
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostGrid;