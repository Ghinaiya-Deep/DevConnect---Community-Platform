import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';


const AuthenticationCard = ({ onAuthenticate = () => {} }) => {
  const [mode, setMode] = useState('signin'); // signin, signup, forgot
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (mode !== 'forgot') {
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (mode === 'signup') {
      if (!formData?.name) {
        newErrors.name = 'Full name is required';
      }
      
      if (!formData?.username) {
        newErrors.username = 'Username is required';
      } else if (formData?.username?.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }

      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        email: formData?.email,
        name: formData?.name || formData?.email?.split('@')?.[0],
        username: formData?.username || formData?.email?.split('@')?.[0]
      };
      
      onAuthenticate(userData);
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setErrors({});
    setFormData({
      email: formData?.email,
      password: '',
      confirmPassword: '',
      name: '',
      username: '',
      agreeToTerms: false
    });
  };

  const handleSocialAuth = (provider) => {
    console.log(`Authenticating with ${provider}`);
    const userData = {
      email: `user@${provider?.toLowerCase()}.com`,
      name: `${provider} User`,
      username: `${provider?.toLowerCase()}user`
    };
    onAuthenticate(userData);
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup': return 'Join DevConnect';
      case 'forgot': return 'Reset Password';
      default: return 'Welcome Back';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'signup': return 'Connect with developers worldwide';
      case 'forgot': return 'Enter your email to reset your password';
      default: return 'Sign in to your account';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevation-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">{getTitle()}</h1>
          <p className="text-text-secondary">{getSubtitle()}</p>
        </div>

        {mode !== 'forgot' && (
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('Google')}
              iconName="Chrome"
              iconPosition="left"
              disabled={isLoading}
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('GitHub')}
              iconName="Github"
              iconPosition="left"
              disabled={isLoading}
            >
              Continue with GitHub
            </Button>
          </div>
        )}

        {mode !== 'forgot' && (
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-text-secondary">or</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                error={errors?.name}
                required
                disabled={isLoading}
              />
              <Input
                label="Username"
                type="text"
                name="username"
                value={formData?.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                error={errors?.username}
                description="This will be your unique identifier"
                required
                disabled={isLoading}
              />
            </>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {mode !== 'forgot' && (
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors?.password}
              required
              disabled={isLoading}
            />
          )}

          {mode === 'signup' && (
            <>
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData?.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                error={errors?.confirmPassword}
                required
                disabled={isLoading}
              />
              
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData?.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-accent"
                  disabled={isLoading}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <button type="button" className="text-accent hover:underline">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-accent hover:underline">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors?.agreeToTerms && (
                <p className="text-sm text-error">{errors?.agreeToTerms}</p>
              )}
            </>
          )}

          {errors?.submit && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors?.submit}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send Reset Link' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button
                type="button"
                onClick={() => handleModeChange('forgot')}
                className="text-sm text-accent hover:underline nav-transition"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
              <p className="text-sm text-text-secondary">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('signup')}
                  className="text-accent hover:underline nav-transition"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleModeChange('signin')}
                className="text-accent hover:underline nav-transition"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="text-sm text-text-secondary">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => handleModeChange('signin')}
                className="text-accent hover:underline nav-transition"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;