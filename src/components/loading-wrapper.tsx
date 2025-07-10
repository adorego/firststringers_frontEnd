// components/LoadingWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import SplashScreen from './splash-screen';

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carga inicial
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos o el tiempo real que necesites

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <SplashScreen />}
      <div className={`${loading ? 'hidden' : 'block'}`}>{children}</div>
    </>
  );
};

export default LoadingWrapper;
