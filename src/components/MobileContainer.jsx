import React from 'react';

export default function MobileContainer({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#050507] flex flex-col relative text-white overflow-x-hidden font-sans antialiased">
      {/* Background radial glow effects for premium styling */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gym-gold/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gym-gold-dark/3 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Gym Logo Transparent Watermark Background */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center pointer-events-none opacity-[0.035] z-0" 
        style={{ 
          backgroundImage: "url('/images/logo.png')", 
          backgroundSize: 'min(80vw, 550px)',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Main app container - removed fixed heights so it adjusts to content height and prevents blank gaps */}
      <div className="flex-1 w-full flex flex-col relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex-grow flex flex-col relative bg-[#0a0a0c]/85 border border-white/5 md:rounded-3xl backdrop-blur-md overflow-hidden min-h-[calc(100vh-2rem)] md:min-h-[780px] h-auto shadow-2xl transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
