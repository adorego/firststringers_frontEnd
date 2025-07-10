// components/SplashScreen.tsx
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <img
        src="/logo.png" // tu animación, puede ser .gif, .svg animado o Lottie
        alt="Loading..."
        className="w-32 h-32 animate-bounce"
      />
    </div>
  );
};

export default SplashScreen;
