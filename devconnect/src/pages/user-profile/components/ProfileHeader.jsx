import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ 
  user = {}, 
  isOwnProfile = false, 
  onFollow = () => {}, 
  onMessage = () => {},
  onEditProfile = () => {},
  onImageUpload = () => {}
}) => {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadType, setUploadType] = useState(''); // 'banner' or 'avatar'

  const mockUser = {
    id: 1,
    name: "Alex Rodriguez",
    username: "alexdev",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Love mentoring junior developers and contributing to open source projects.",
    followers: 1247,
    following: 892,
    posts: 156,
    joinDate: "March 2019",
    bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
    ...user
  };

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    onFollow(!isFollowing);
  };

  const handleImageUploadClick = (type) => {
    setUploadType(type);
    setShowImageUpload(true);
  };

  const handleImageUploadClose = () => {
    setShowImageUpload(false);
    setUploadType('');
  };

  const handleImageUploadConfirm = (file) => {
    onImageUpload(uploadType, file);
    setShowImageUpload(false);
    setUploadType('');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation">
      {/* Banner Section */}
      <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
        <Image
          src={mockUser?.bannerImage}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
        {isOwnProfile && (
          <button
            onClick={() => handleImageUploadClick('banner')}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg nav-transition"
          >
            <Icon name="Camera" size={20} />
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      {/* Profile Info Section */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 sm:-mt-20 mb-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-background overflow-hidden bg-surface">
              <Image
                src={mockUser?.avatar}
                alt={`${mockUser?.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            {mockUser?.isVerified && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-white" />
              </div>
            )}
            {isOwnProfile && (
              <button
                onClick={() => handleImageUploadClick('avatar')}
                className="absolute bottom-0 right-0 bg-accent hover:bg-accent/80 text-white p-2 rounded-full nav-transition"
              >
                <Icon name="Camera" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* User Info and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">{mockUser?.name}</h1>
              {mockUser?.isVerified && (
                <Icon name="BadgeCheck" size={24} className="text-accent" />
              )}
            </div>
            <p className="text-lg text-text-secondary mb-1">@{mockUser?.username}</p>
            <p className="text-text-primary font-medium mb-1">{mockUser?.title}</p>
            <p className="text-text-secondary mb-2">{mockUser?.company}</p>
            <div className="flex items-center text-text-secondary text-sm mb-4">
              <Icon name="MapPin" size={16} className="mr-1" />
              <span className="mr-4">{mockUser?.location}</span>
              <Icon name="Calendar" size={16} className="mr-1" />
              <span>Joined {mockUser?.joinDate}</span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-primary">{mockUser?.followers?.toLocaleString()}</span>
                <span className="text-text-secondary">Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-primary">{mockUser?.following?.toLocaleString()}</span>
                <span className="text-text-secondary">Following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-primary">{mockUser?.posts}</span>
                <span className="text-text-secondary">Posts</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:flex-col sm:items-stretch lg:flex-row lg:items-center">
            {isOwnProfile ? (
              <>
                <Button
                  variant="outline"
                  onClick={onEditProfile}
                  iconName="Edit"
                  iconPosition="left"
                  className="flex-1 sm:flex-none"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  iconName="Settings"
                  size="icon"
                  className="sm:hidden"
                />
              </>
            ) : (
              <>
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollowClick}
                  iconName={isFollowing ? "UserMinus" : "UserPlus"}
                  iconPosition="left"
                  className="flex-1 sm:flex-none"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button
                  variant="outline"
                  onClick={onMessage}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="flex-1 sm:flex-none"
                >
                  Message
                </Button>
                <Button
                  variant="ghost"
                  iconName="MoreHorizontal"
                  size="icon"
                />
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {mockUser?.bio && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-text-primary leading-relaxed">{mockUser?.bio}</p>
          </div>
        )}

        {/* Skills Preview */}
        {mockUser?.skills && mockUser?.skills?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {mockUser?.skills?.slice(0, 6)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-surface text-text-primary text-sm rounded-full border border-border"
                >
                  {skill}
                </span>
              ))}
              {mockUser?.skills?.length > 6 && (
                <span className="px-3 py-1 text-text-secondary text-sm">
                  +{mockUser?.skills?.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Upload {uploadType === 'banner' ? 'Banner' : 'Profile'} Image
              </h3>
              <button
                onClick={handleImageUploadClose}
                className="text-text-secondary hover:text-primary nav-transition"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
                <p className="text-text-secondary mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-text-secondary">PNG, JPG up to 10MB</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleImageUploadClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleImageUploadConfirm(null)}
                  className="flex-1"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;