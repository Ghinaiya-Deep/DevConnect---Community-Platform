import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuthenticationForm = ({ 
  mode, 
  onSubmit, 
  onForgotPassword, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    rememberMe: false,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

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
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup') {
      if (!formData?.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData?.username?.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData?.username?.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9_]+$/?.test(formData?.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
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

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    // Mock authentication - check credentials
    if (mode === 'signin') {
      const validCredentials = [
        { email: 'developer@devconnect.com', password: 'DevConnect123!' },
        { email: 'admin@devconnect.com', password: 'AdminPass123!' },
        { email: 'user@example.com', password: 'UserPass123!' }
      ];

      const isValid = validCredentials?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (!isValid) {
        setErrors({ 
          submit: `Invalid credentials. Try: developer@devconnect.com / DevConnect123!` 
        });
        return;
      }
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <>
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            value={formData?.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            error={errors?.fullName}
            required
            disabled={isLoading}
          />
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleInputChange}
            placeholder="Choose a unique username"
            description="This will be your unique identifier on DevConnect"
            error={errors?.username}
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
        placeholder="Enter your email address"
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData?.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        description={mode === 'signup' ? 'Must be at least 8 characters long' : undefined}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      {mode === 'signup' && (
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
      )}
      {mode === 'signin' && (
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e?.target?.checked }))}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-accent hover:text-accent/80 nav-transition"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
      )}
      {mode === 'signup' && (
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button type="button" className="text-accent hover:underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-accent hover:underline">
                Privacy Policy
              </button>
            </span>
          }
          checked={formData?.agreeToTerms}
          onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e?.target?.checked }))}
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />
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
        className="mt-6"
      >
        {mode === 'signup' ? 'Create Account' : 'Sign In'}
      </Button>
    </form>
  );
};

export default AuthenticationForm;