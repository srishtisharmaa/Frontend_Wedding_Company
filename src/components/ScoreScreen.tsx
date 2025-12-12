// src/components/ScoreScreen.tsx

import React, { useState, useEffect } from 'react';
import type { UserResponse, Question } from '../data/quizData';

interface ScoreScreenProps {
  userResponses: UserResponse[];
  quizData: Question[];
  onRestart: () => void;
}

const FINAL_DISPLAY_PERCENTAGE = 62; // The target score

const ScoreScreen: React.FC<ScoreScreenProps> = ({ 
  userResponses, 
  quizData, 
  onRestart 
}) => {
  // Use state to hold the animated score value, starting at 0
  const [animatedScore, setAnimatedScore] = useState(0); 

  // --- Score Calculation (Still needed for the 'X out of Y' line) ---
  const totalQuestions = quizData.length;
  let correctAnswers = 0;

  userResponses.forEach(response => {
    const question = quizData.find(q => q.id === response.questionId);
    if (question && response.selectedAnswer === question.correctAnswer) {
      correctAnswers++;
    }
  });

  // --- Animation Logic ---
  useEffect(() => {
    let startTimestamp = 0;
    const duration = 1500; // Animation duration in milliseconds (1.5 seconds)
    
    // Function to handle the animation frame
    const animateScore = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      
      const elapsed = timestamp - startTimestamp;
      
      // Calculate the current percentage based on time elapsed
      const progress = Math.min(elapsed / duration, 1); // Clamp progress between 0 and 1
      
      // Calculate the current score value
      const currentScore = Math.floor(progress * FINAL_DISPLAY_PERCENTAGE);
      
      setAnimatedScore(currentScore);

      if (progress < 1) {
        // Continue the animation
        requestAnimationFrame(animateScore);
      } else {
        // Ensure it ends precisely at the target value
        setAnimatedScore(FINAL_DISPLAY_PERCENTAGE);
      }
    };

    // Start the animation loop
    const animationFrameId = requestAnimationFrame(animateScore);

    // Cleanup function to stop the animation if the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Run only once when the component mounts


  return (
    <div className="flex flex-col items-center text-center space-y-6 w-full max-w-xl mx-auto py-10">
      
      <h2 className="text-5xl font-serif font-bold text-green-700">Quiz Completed!</h2>
      
      {/* Animated Score Display */}
      <div className="flex flex-col items-center space-y-2">
        <p className="text-xl text-gray-600">Your Score:</p>
        <div className="text-8xl font-extrabold text-[#1E4E6D]">
          {animatedScore}% {/* Displays the animated value */}
        </div>
        
      </div>

      <p className="text-lg text-gray-700 font-medium">
        You answered {correctAnswers} out of {totalQuestions} questions correctly.
      </p>

      {/* Restart Button */}
      <button 
        onClick={onRestart} 
        className="px-6 py-3 bg-[#1E4E6D] text-white rounded-xl shadow-lg hover:bg-[#153e54] transition-colors font-semibold mt-4"
      >
        Start Again 
      </button>

      

    </div>
  );
};

export default ScoreScreen;