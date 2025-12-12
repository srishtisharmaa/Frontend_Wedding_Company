// src/App.tsx

import React from 'react';
import QuizCard from './components/QuizCard'; 

const App: React.FC = () => {
  return (
    // Main Container: Full viewport height, centered content, and the required gradient background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-8 relative overflow-hidden">
      
      {/* Quiz Card Container (The white rounded box - WIDER: max-w-7xl) 
          ***BORDER 30px, ROUNDNESS 60px, PADDING p-16*** */}
      <div 
        // Increased roundness and padding for thick border and content separation
        className="w-full max-w-7xl bg-white rounded-[60px] p-16 relative overflow-hidden" // Added overflow-hidden
        style={{
          // First value: The maximum border thickness (30px inset border)
          boxShadow: 'inset 0 0 0 30px rgba(100, 160, 220, 0.6), 0 12px 30px rgba(0, 0, 0, 0.08)'
        }}
      >
        
        <QuizCard />

        {/* Aesthetic Sticker ("Best of Luck!") - MOVED INSIDE THE CARD */}
        <div className="absolute" style={{ 
            left: '40px', // Positioned relative to the card's left edge
            bottom: '40px' // Positioned relative to the card's bottom edge
        }}>
          
          {/* The Stylized Paw/Hand */}
          <div className="relative z-10 w-24 h-24 bg-white rounded-full p-2 border-2 border-pink-200/50 shadow-inner" 
               style={{ 
                   boxShadow: 'inset 0 0 10px rgba(255, 192, 203, 0.8), 0 5px 15px rgba(0, 0, 0, 0.1)',
                   background: 'linear-gradient(to bottom right, #fff 50%, #ffe9f0 100%)'
               }}>
               {/* Simple visual paw mark simulation */}
               <div className="absolute inset-0 flex flex-wrap justify-center items-center opacity-70">
                   <div className="w-5 h-5 bg-pink-300 rounded-full m-1"></div>
                   <div className="w-8 h-8 bg-pink-300 rounded-full mt-2"></div>
               </div>
          </div>
          
          {/* The Thought Bubble - Larger and Bolder Text */}
          <div className="absolute transform -translate-y-full translate-x-12 -top-2 z-20"> {/* Adjusted position relative to paw */}
              <div className="relative p-3 pl-5 pr-5 bg-white border-2 border-blue-300 rounded-full shadow-lg">
                  <p className="font-extrabold text-[#1E4E6D] text-lg tracking-wide">
                      Best of Luck!
                  </p>
                  {/* Bubble point */}
                  <div className="absolute w-4 h-4 bg-white border-b-2 border-r-2 border-blue-300 transform rotate-45 -bottom-2 left-1/2 -translate-x-1/2"></div>
              </div>
          </div>
          
        </div>

      </div>
      
    </div>
  );
};

export default App;