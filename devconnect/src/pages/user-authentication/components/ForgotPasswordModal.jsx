import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      onSubmit(email);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Reset Password</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-surface rounded-lg nav-transition"
            disabled={isLoading}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reset Link Sent!</h3>
                <p className="text-text-secondary text-sm">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <Button variant="default" fullWidth onClick={handleClose}>
                Got it
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-text-secondary text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e?.target?.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address"
                error={error}
                required
                disabled={isLoading}
              />

              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;