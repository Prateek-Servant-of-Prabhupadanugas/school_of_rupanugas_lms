import React from 'react';

export default function VrindavanBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-transparent">
      
      {/* 1. BACK CLOUDS (Behind Govardhan) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="cloud back-cloud-1"></div>
        <div className="cloud back-cloud-2"></div>
      </div>

      {/* 2. GOVARDHAN JI */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[2500px] h-[65vh] flex items-end">
        <img 
          src="/assets/goverdhan_image.png" 
          alt="Govardhan Hill"
          className="w-full h-auto object-contain object-bottom drop-shadow-[0_-20px_60px_rgba(255,255,255,0.3)]"
        />
      </div>

      {/* 3. FRONT MIST/CLOUDS (Floating in front of the Hill) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mist mist-1"></div>
        <div className="mist mist-2"></div>
        <div className="mist mist-3"></div>
      </div>

      {/* Standard CSS injection to avoid the "jsx=true" error */}
      <style>
        {`
          .cloud {
            position: absolute;
            background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 75%);
            border-radius: 50%;
            filter: blur(80px);
          }

          .back-cloud-1 {
            width: 800px; height: 400px;
            top: 5%; left: -15%;
            animation: drift-slow 80s linear infinite;
          }

          .back-cloud-2 {
            width: 1000px; height: 500px;
            top: 15%; right: -20%;
            animation: drift-slow 100s linear infinite reverse;
          }

          .mist {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            filter: blur(90px);
            border-radius: 100%;
            width: 1200px;
            height: 250px;
            bottom: 10%;
            animation: move-mist 45s linear infinite;
          }

          .mist-2 { bottom: 20%; animation-delay: -15s; opacity: 0.3; }
          .mist-3 { bottom: 5%; animation-delay: -30s; opacity: 0.5; }

          @keyframes drift-slow {
            0% { transform: translateX(0); }
            50% { transform: translateX(150px); }
            100% { transform: translateX(0); }
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
