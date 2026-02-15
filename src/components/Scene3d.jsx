import React from 'react';
import krishnaImage from '../assets/krishna_and_friends.png';

export default function VrindavanBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A2F1F]">
      
      {/* 1. MAIN BACKGROUND: Increased vibrancy and removed blur interference */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 brightness-110 saturate-[1.1]"
        style={{ 
          backgroundImage: `url('${krishnaImage}')`,
        }}
      >
        {/* Colorful gradient overlay instead of flat black to keep colors rich */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-transparent to-emerald-900/40"></div>
      </div>

      {/* 2. REMOVED BLURRY CLOUDS - Replaced with crisp ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[40%] bg-white/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[150px]"></div>
      </div>

      {/* 3. GOVARDHAN JI: Set to full opacity and sharpened shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[2500px] h-[70vh] flex items-end pointer-events-none">
        <img 
          src="/assets/goverdhan_image.png" 
          alt="Govardhan Hill"
          className="w-full h-auto object-contain object-bottom drop-shadow-[0_-10px_40px_rgba(0,0,0,0.5)] contrast-[1.05]"
        />
      </div>

      {/* 4. CLEAN MIST: Reduced blur and opacity to stop the 'washed out' look */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mist-clean mist-1"></div>
        <div className="mist-clean mist-2"></div>
      </div>

      <style>
        {`
          .mist-clean {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            /* Reduced blur from 100px to 40px to keep it from muddying the background */
            filter: blur(40px);
            width: 100%;
            height: 200px;
            bottom: 0;
            animation: move-mist 60s linear infinite;
          }

          .mist-2 { 
            bottom: 5%; 
            animation-delay: -30s; 
            opacity: 0.2; 
            height: 150px;
          }

          @keyframes move-mist {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}