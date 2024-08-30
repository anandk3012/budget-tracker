import React, { useEffect, useState } from 'react';
import '../../styles/Load1.css'; // Import the CSS file

export default function Load1() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Simulate the bounce animation for 3 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-screen z-10 bg-black flex items-center justify-center'>
      <div className={`loader w-full h-full flex items-center justify-center ${animationComplete ? 'loading-complete' : ''}`}>
        <div className={`circle ${animationComplete ? '' : 'bounce'}`}></div>
      </div>
    </div>
  );
}
