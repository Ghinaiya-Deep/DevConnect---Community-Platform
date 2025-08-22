import React from 'react';

const AuthenticationDivider = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-card text-text-secondary font-medium">
          or continue with email
        </span>
      </div>
    </div>
  );
};

export default AuthenticationDivider;