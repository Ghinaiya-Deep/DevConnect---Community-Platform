import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostCard = ({ post, onLike = () => {}, onComment = () => {}, onShare = () => {} }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiking, setIsLiking] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onLike(post?.id);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e?.preventDefault();
    if (!commentText?.trim()) return;
    
    onComment(post?.id, commentText?.trim());
    setCommentText('');
  };

  const handleShare = () => {
    onShare(post?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation hover:shadow-elevation-md nav-transition mb-6">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={post?.author?.avatar}
              alt={`${post?.author?.name}'s avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-text-primary truncate">
                {post?.author?.name}
              </h3>
              <span className="text-text-secondary">•</span>
              <span className="text-sm text-text-secondary">
                {formatTimeAgo(post?.timestamp)}
              </span>
            </div>
            
            <p className="text-text-primary mb-4 whitespace-pre-wrap">
              {post?.content}
            </p>
            
            {post?.image && (
              <div className="mb-4 rounded-lg overflow-hidden border border-border">
                <Image
                  src={post?.image}
                  alt="Post attachment"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center space-x-2 nav-transition ${
                    post?.isLiked 
                      ? 'text-red-500 hover:text-red-600' :'text-text-secondary hover:text-red-500'
                  }`}
                >
                  <Icon 
                    name={post?.isLiked ? "Heart" : "Heart"} 
                    size={18}
                    className={isLiking ? 'animate-pulse' : ''}
                  />
                  <span className="text-sm font-medium">{post?.likes}</span>
                </button>
                
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent nav-transition"
                >
                  <Icon name="MessageCircle" size={18} />
                  <span className="text-sm font-medium">{post?.comments}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent nav-transition"
                >
                  <Icon name="Share" size={18} />
                  <span className="text-sm font-medium">{post?.shares}</span>
                </button>
              </div>
              
              <button className="text-text-secondary hover:text-accent nav-transition">
                <Icon name="Bookmark" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <div className="border-t border-border bg-surface/50">
          <div className="p-6">
            <form onSubmit={handleCommentSubmit} className="flex space-x-4 mb-4">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-xs">U</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e?.target?.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 bg-background border border-border rounded-full focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
              </div>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                disabled={!commentText?.trim()}
                iconName="Send"
                iconSize={16}
              >
                Post
              </Button>
            </form>
            
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  author: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
                  content: 'Great insights! This really helped me understand the concept better.',
                  timestamp: new Date(Date.now() - 300000)
                },
                {
                  id: 2,
                  author: { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                  content: 'Thanks for sharing this. Do you have any resources for further reading?',
                  timestamp: new Date(Date.now() - 600000)
                }
              ]?.map((comment) => (
                <div key={comment?.id} className="flex space-x-3">
                  <Image
                    src={comment?.author?.avatar}
                    alt={`${comment?.author?.name}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-background rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{comment?.author?.name}</span>
                        <span className="text-xs text-text-secondary">
                          {formatTimeAgo(comment?.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-text-primary">{comment?.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 ml-4">
                      <button className="text-xs text-text-secondary hover:text-accent nav-transition">
                        Like
                      </button>
                      <button className="text-xs text-text-secondary hover:text-accent nav-transition">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;