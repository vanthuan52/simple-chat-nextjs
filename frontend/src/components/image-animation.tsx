import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',

  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
];

const ImageAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[90vw] h-[60vh]">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="landscape"
            className={
              `absolute rounded-3xl shadow-2xl border-4 border-white/60 dark:border-slate-800 transition-transform duration-700 ease-in-out ` +
              [
                'top-0 left-1/4 w-1/3 rotate-[-8deg] z-10',
                'top-10 left-1/2 w-1/4 rotate-[12deg] z-20',
                'top-1/3 left-0 w-1/4 rotate-[-4deg] z-30',
                'top-1/2 left-1/3 w-1/3 rotate-[6deg] z-40',
                'bottom-0 right-1/4 w-1/4 rotate-[-10deg] z-30',
                'bottom-10 left-1/2 w-1/4 rotate-[8deg] z-20',
                'bottom-1/3 right-0 w-1/4 rotate-[2deg] z-10',
                'top-1/4 right-1/4 w-1/3 rotate-[-6deg] z-20',
              ][i % 8]
            }
            style={{
              filter: 'brightness(0.92) saturate(1.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)',
              animation: `float${i % 4} 6s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(12px) scale(1.03); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(16px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default ImageAnimation;
