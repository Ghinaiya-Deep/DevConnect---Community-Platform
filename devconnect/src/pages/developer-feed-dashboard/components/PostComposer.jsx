import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostComposer = ({ onPost = () => {}, currentUser = null }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);

  const maxCharacters = 500;
  const charactersLeft = maxCharacters - content?.length;

  const handleContentChange = (e) => {
    if (e?.target?.value?.length <= maxCharacters) {
      setContent(e?.target?.value);
    }
  };

  const handleImageSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          file,
          preview: e?.target?.result,
          name: file?.name
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!content?.trim() || isPosting) return;

    setIsPosting(true);
    
    try {
      const newPost = {
        id: Date.now(),
        content: content?.trim(),
        image: selectedImage?.preview || null,
        author: currentUser || {
          name: 'Current User',
          username: 'currentuser',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      onPost(newPost);
      
      setContent('');
      setSelectedImage(null);
      setIsExpanded(false);
      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error posting:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-elevation">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {currentUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={handleContentChange}
              onFocus={handleFocus}
              placeholder="Share your thoughts with the developer community..."
              className={`w-full resize-none border-0 focus:ring-0 focus:outline-none bg-transparent text-text-primary placeholder-text-secondary transition-all duration-200 ${
                isExpanded ? 'min-h-32' : 'min-h-12'
              }`}
              rows={isExpanded ? 4 : 1}
            />
            
            {selectedImage && (
              <div className="mt-4 relative inline-block">
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <Image
                    src={selectedImage?.preview}
                    alt="Selected image"
                    className="max-w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center nav-transition"
                  >
                    <Icon name="X" size={16} className="text-white" />
                  </button>
                </div>
                <p className="text-xs text-text-secondary mt-2">{selectedImage?.name}</p>
              </div>
            )}
            
            {isExpanded && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef?.current?.click()}
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent nav-transition"
                    disabled={isPosting}
                  >
                    <Icon name="Image" size={18} />
                    <span className="text-sm">Photo</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent nav-transition"
                    disabled={isPosting}
                  >
                    <Icon name="Code" size={18} />
                    <span className="text-sm">Code</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent nav-transition"
                    disabled={isPosting}
                  >
                    <Icon name="Link" size={18} />
                    <span className="text-sm">Link</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`text-xs ${charactersLeft < 50 ? 'text-warning' : charactersLeft < 0 ? 'text-error' : 'text-text-secondary'}`}>
                    {charactersLeft}
                  </span>
                  
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    disabled={!content?.trim() || charactersLeft < 0 || isPosting}
                    loading={isPosting}
                  >
                    {isPosting ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostComposer;