// src/components/QuizCard.tsx (Refined Styling)

import React, { useState } from 'react';
import Option from './Option';
import ScoreScreen from './ScoreScreen'; 
import { quizData } from '../data/quizData';
import type { Question, UserResponse } from '../data/quizData'; 

const QuizCard: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [quizState, setQuizState] = useState<'active' | 'completed'>('active');
  const [isSubmitted, setIsSubmitted] = useState(false); 

  // --- Helper Variables ---
  const currentQuestion: Question = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const currentSelection = userResponses.find(
    (response) => response.questionId === currentQuestion.id
  )?.selectedAnswer || null;


  // --- Handlers ---

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;

    const existingResponseIndex = userResponses.findIndex(
      (response) => response.questionId === currentQuestion.id
    );

    const newResponse: UserResponse = {
      questionId: currentQuestion.id,
      selectedAnswer: option,
    };

    if (existingResponseIndex > -1) {
      const updatedResponses = [...userResponses];
      updatedResponses[existingResponseIndex] = newResponse;
      setUserResponses(updatedResponses);
    } else {
      setUserResponses((prevResponses) => [...prevResponses, newResponse]);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizState('completed');
      return;
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsSubmitted(false); 
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setIsSubmitted(false); 
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserResponses([]);
    setQuizState('active');
    setIsSubmitted(false);
  };


  // --- Render ---

  if (quizState === 'completed') {
    return (
      <ScoreScreen 
        userResponses={userResponses} 
        quizData={quizData} 
        onRestart={handleRestart} 
      />
    );
  }

  return (
    // Outer Quiz Content container: max-w-2xl
    <div className="flex flex-col items-center text-center space-y-8 w-full max-w-2xl mx-auto">
      
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-5xl font-serif font-bold text-[#1E4E6D]">
            Test Your Knowledge
        </h1>
        <p className="text-sm text-gray-600 mb-2">
            Answer all questions to see your results
        </p>
      </div>


      {/* Simplified Progress Bar (Thick line with active segment) */}
      <div className="flex w-full justify-center mb-4">
        <div className="flex w-full space-x-0"> 
          {quizData.map((question, index) => {
            const isCurrent = index === currentQuestionIndex;
            
            let barColor = 'bg-gray-200'; 
            if (isCurrent) {
              barColor = 'bg-[#1E4E6D]'; // Dark color for active step
            }
            
            return (
              <div 
                key={question.id} 
                className={`h-1 flex-1 transition-colors duration-300 ${barColor}`}
                style={{ maxWidth: `${100 / totalQuestions}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Question Box (Updated look) */}
      <div className="w-full p-4 rounded-xl text-center shadow-lg"
           style={{ 
             background: 'linear-gradient(to right, #e0f7fa, #b3e5fc)', // Light blue gradient background
             border: '1px solid rgba(179, 229, 252, 0.5)' // Soft border
           }}>
          
          <h2 className="text-xl font-medium text-[#1E4E6D] text-center">
              <span className="text-lg font-bold mr-2">{currentQuestionIndex + 1}.</span>
              {currentQuestion.questionText}
          </h2>
      </div>

      {/* Answer Options */}
      <div className="w-full space-y-3 mt-4">
          {currentQuestion.options.map((option, index) => (
              <Option
                key={index}
                optionText={option}
                index={index}
                onSelect={handleOptionSelect}
                isSelected={currentSelection === option}
                isSubmitted={isSubmitted} 
                correctAnswer={currentQuestion.correctAnswer} 
              />
          ))}
      </div>
      
      {/* Navigation Arrows (Grouped on the right) */}
      <div className="flex justify-end w-full pt-4 space-x-2">
        
        {/* Previous Button (Left Arrow) */}
        <button 
          className={`p-3 rounded-full transition-colors font-semibold text-lg
                      ${currentQuestionIndex === 0 
                        ? 'text-gray-400 cursor-default' 
                        : 'bg-blue-100/50 text-blue-800 hover:bg-blue-200'}`}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          aria-label="Previous Question"
        >
            &larr;
        </button>

        {/* Next Button (Right Arrow/View Score) */}
        <button 
          className={`p-3 rounded-full transition-colors font-semibold text-lg
                      ${isLastQuestion
                        ? 'bg-[#1E4E6D] text-white hover:bg-[#153e54] w-[100px] rounded-xl' 
                        : 'bg-blue-100/50 text-blue-800 hover:bg-blue-200'}`}
          onClick={handleNext}
          aria-label={isLastQuestion ? "View Score" : "Next Question"}
        >
            {isLastQuestion ? 'Submit' : '→'} 
        </button>
      </div>
    </div>
  );
};

export default QuizCard;