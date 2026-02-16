import React from 'react';
import krishnaImage from '../assets/krishna_and_friends.png';
// Import your mobile-specific image here
import krishnaMobileImage from '../assets/krishna_balram_playing.jpg'; 

export default function VrindavanBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A2F1F]">
      
      {/* 1. DESKTOP BACKGROUND - Hidden on mobile, visible on medium screens and up */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 brightness-110 saturate-[1.1]"
        style={{ backgroundImage: `url('${krishnaImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-transparent to-emerald-900/40"></div>
      </div>

      {/* 2. MOBILE BACKGROUND - Visible only on small screens */}
      <div 
        className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat brightness-105 saturate-[1.15]"
        style={{ backgroundImage: `url('${krishnaMobileImage}')` }}
      >
        {/* Slightly deeper gradient for mobile to help text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-emerald-950/60"></div>
      </div>

      {/* 3. AMBIENT LIGHTS - Adjusted for better mobile placement */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[80%] md:w-[60%] h-[30%] bg-white/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>

      {/* 4. GOVARDHAN JI: Scaled for mobile responsiveness */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[2500px] h-[50vh] md:h-[70vh] flex items-end pointer-events-none">
        <img 
          src="/assets/goverdhan_image.png" 
          alt="Govardhan Hill"
          className="w-[150%] md:w-full h-auto object-contain object-bottom drop-shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* 5. MIST: Kept clean as requested */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mist-clean mist-1"></div>
        <div className="mist-clean mist-2 opacity-10 md:opacity-20"></div>
      </div>

      <style>
        {`
          .mist-clean {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
            filter: blur(40px);
            width: 100%;
            height: 150px;
            bottom: 0;
            animation: move-mist 60s linear infinite;
          }

          .mist-2 { 
            bottom: 5%; 
            animation-delay: -30s; 
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