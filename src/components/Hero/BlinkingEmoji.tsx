'use client';

import { useState, useEffect } from 'react';

const BlinkingEmoji = () => {
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    // This interval triggers the wink effect
    const interval = setInterval(() => {
      setIsWinking(true);
      
      // Hold the wink for 500ms, then go back to a smile
      setTimeout(() => {
        setIsWinking(false);
      }, 500);
      
    }, 3000); // Happens every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="transition-all duration-200 ease-in-out">
      {isWinking ? ';)' : ':)'}
    </span>
  );
};

export default BlinkingEmoji;