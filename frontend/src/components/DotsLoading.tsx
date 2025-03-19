import React, { useEffect, useState } from 'react';

const DotsLoading = () => {
  const [activeDot, setActiveDot] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="mt-8 flex justify-center gap-2">
      <div className={`h-2 w-2 rounded-full transition-opacity duration-300 ${activeDot === 0 ? 'bg-green opacity-100' : 'bg-green opacity-30'}`}></div>
      <div className={`h-2 w-2 rounded-full transition-opacity duration-300 ${activeDot === 1 ? 'bg-orange opacity-100' : 'bg-orange opacity-30'}`}></div>
      <div className={`h-2 w-2 rounded-full transition-opacity duration-300 ${activeDot === 2 ? 'bg-secondary opacity-100' : 'bg-secondary opacity-30'}`}></div>
    </div>
  );
};

export default DotsLoading;