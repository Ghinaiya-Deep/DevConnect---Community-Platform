import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProfileNavigation from '../../components/ui/ProfileNavigation';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import PostGrid from './components/PostGrid';


const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock current user data
  const mockCurrentUser = {
    id: 1,
    name: "Deep Ghinaiya",
    email: "deepghinaiya@gmail.com",
    username: "deepghinaiya"
  };

  // Mock profile data
  const mockProfileData = {
    id: 1,
    name: "Deep Ghinaiya",
    username: "deepghinaiya",
    title: "Senior Full Stack Developer",
    company: "DeepLogic Labs",
    location: "Nashik, Maharashtra, India",
    bio: "Passionate full-stack developer with 3+ years of experience building scalable web applications. Love mentoring junior developers and contributing to open source projects.",
    followers: 9432,
    following: 10000,
    posts: 550,
    joinDate: "March 2023",
    bannerImage: "https://media.licdn.com/dms/image/v2/D4D16AQEWlNITxlTugg/profile-displaybackgroundimage-shrink_350_1400/B4DZiJhg49GkAY-/0/1754653934116?e=1758758400&v=beta&t=D27QTTi44b-6CMg5xkkZYi3ly0gbTOw-a-we8pauYsw",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFppDzOUQcxjA/profile-displayphoto-shrink_400_400/B4DZVcBTgSHAAo-/0/1741005605152?e=1758758400&v=beta&t=XBblxwrEhf0q_1GRCCFlmCwbL9elmKBJaWn5wG_vuBw",
    isVerified: true,
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "GraphQL", "MongoDB", "PostgreSQL", "Kubernetes"],
    isFollowing: false
  };

  useEffect(() => {
    // Simulate loading profile data
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentUser(mockCurrentUser);
        setProfileData(mockProfileData);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // Check if this is the current user's own profile
  const isOwnProfile = currentUser?.id === profileData?.id;

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/landing-page');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFollow = (isFollowing) => {
    setProfileData(prev => ({
      ...prev,
      isFollowing,
      followers: prev?.followers + (isFollowing ? 1 : -1)
    }));
  };

  const handleMessage = () => {
    console.log('Opening message dialog...');
  };

  const handleEditProfile = () => {
    console.log('Opening profile editor...');
  };

  const handleImageUpload = (type, file) => {
    console.log(`Uploading ${type} image:`, file);
  };

  const handlePostClick = (post) => {
    console.log('Opening post:', post);
  };

  const handleDeletePost = (postId) => {
    console.log('Deleting post:', postId);
  };

  const handleEditPost = (post) => {
    console.log('Editing post:', post);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader currentUser={currentUser} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              {/* Header Skeleton */}
              <div className="bg-surface rounded-lg h-80"></div>
              
              {/* Navigation Skeleton */}
              <div className="flex space-x-4">
                {[1, 2, 3, 4]?.map((i) => (
                  <div key={i} className="bg-surface h-10 w-20 rounded"></div>
                ))}
              </div>
              
              {/* Content Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {[1, 2, 3]?.map((i) => (
                    <div key={i} className="bg-surface h-48 rounded-lg"></div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="bg-surface h-64 rounded-lg"></div>
                  <div className="bg-surface h-32 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader currentUser={currentUser} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="mb-8">
            <ProfileHeader
              user={profileData}
              isOwnProfile={isOwnProfile}
              onFollow={handleFollow}
              onMessage={handleMessage}
              onEditProfile={handleEditProfile}
              onImageUpload={handleImageUpload}
            />
          </div>

          {/* Profile Navigation */}
          <div className="mb-8">
            <ProfileNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              userPermissions={{ canEdit: isOwnProfile }}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'posts' && (
                <PostGrid
                  posts={[]}
                  isOwnProfile={isOwnProfile}
                  onPostClick={handlePostClick}
                  onDeletePost={handleDeletePost}
                  onEditPost={handleEditPost}
                />
              )}
              
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">About</h3>
                      {isOwnProfile && (
                        <button className="text-accent hover:text-accent/80 nav-transition text-sm font-medium">
                          Edit
                        </button>
                      )}
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {profileData?.bio}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {profileData?.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-surface text-text-primary text-sm rounded-full border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Experience</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <div>
                              <p className="font-medium">{profileData?.title}</p>
                              <p className="text-sm text-text-secondary">{profileData?.company} • 2024 - Present</p>
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
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        { type: 'like', content: 'Liked a post about "Modern CSS Techniques"', time: '2 hours ago' },
                        { type: 'comment', content: 'Commented on "JavaScript Performance Tips"', time: '1 day ago' },
                        { type: 'connection', content: 'Connected with Sarah Chen', time: '3 days ago' },
                        { type: 'post', content: 'Published "Building Scalable React Applications"', time: '1 week ago' }
                      ]?.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-surface rounded-lg">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <span className="text-accent text-xs">●</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity?.content}</p>
                            <p className="text-xs text-text-secondary mt-1">{activity?.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {isOwnProfile && (
                <ProfileStats
                  stats={{
                    totalPosts: profileData?.posts || 0,
                    totalLikes: 2847,
                    totalComments: 892,
                    totalShares: 234,
                    profileViews: 5632,
                    connectionsThisMonth: 47,
                    postsThisMonth: 12,
                    engagementRate: 8.4,
                    topSkillEndorsements: 89,
                    repositoriesContributed: 23
                  }}
                />
              )}
              
              {!isOwnProfile && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Mutual Connections</h3>
                    <div className="space-y-3">
                      {[1, 2, 3]?.map((connection) => (
                        <div key={connection} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">SC</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Sarah Chen</p>
                            <p className="text-xs text-text-secondary">Frontend Developer</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Similar Profiles</h3>
                    <div className="space-y-3">
                      {[1, 2, 3]?.map((profile) => (
                        <div key={profile} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">JD</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-text-secondary">Backend Developer</p>
                          </div>
                          <button className="text-xs text-accent hover:text-accent/80 nav-transition">
                            Follow
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;