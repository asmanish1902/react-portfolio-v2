import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', moveHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
      }}
    >
      {/* Glow Circle */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-70 blur-3xl" />

      {/* Debug Coordinates (remove later) */}
      <div className="absolute top-24 left-0 text-white text-xs whitespace-nowrap">
      </div>
    </div>
  );
};

export default CustomCursor;