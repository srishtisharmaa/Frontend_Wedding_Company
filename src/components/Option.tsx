// src/components/Option.tsx (Keep this the same)

import React from 'react';

interface OptionProps {
  optionText: string;
  index: number;
  onSelect: (option: string) => void;
  isSelected: boolean;
  isSubmitted: boolean;
  correctAnswer: string;
}

const Option: React.FC<OptionProps> = ({ 
  optionText, 
  index, 
  onSelect, 
  isSelected, 
  isSubmitted,
  correctAnswer
}) => {
  
  // Base styling
  let bgColor = 'bg-white';
  let textColor = 'text-gray-700';
  let ringColor = 'ring-1 ring-blue-100/70'; 
  let hoverStyle = 'hover:bg-blue-50';

  if (isSelected) {
    // If selected, use a distinct color and border (like the reference image)
    bgColor = 'bg-blue-100';
    ringColor = 'ring-2 ring-blue-300';
    hoverStyle = ''; 
  }

  // If submitted, show correctness/incorrectness feedback
  if (isSubmitted) {
    hoverStyle = ''; 

    if (optionText === correctAnswer) {
      bgColor = 'bg-green-100';
      ringColor = 'ring-2 ring-green-500';
      textColor = 'text-green-800';
    } else if (isSelected && optionText !== correctAnswer) {
      bgColor = 'bg-red-100';
      ringColor = 'ring-2 ring-red-500';
      textColor = 'text-red-800';
    } else {
      // Correct answer is also highlighted slightly, even if not selected
      if (optionText === correctAnswer) {
         bgColor = 'bg-green-50';
         ringColor = 'ring-1 ring-green-300';
      } else {
         bgColor = 'bg-white';
         ringColor = 'ring-1 ring-blue-100/70';
      }
      textColor = 'text-gray-700';
    }
  }


  return (
    <div
      className={`
        w-full p-3 px-4 rounded-xl cursor-pointer transition-all duration-200 
        flex items-center justify-center shadow-sm h-14
        ${bgColor} ${ringColor} ${hoverStyle}
      `}
      onClick={() => !isSubmitted && onSelect(optionText)}
      aria-checked={isSelected}
      role="radio"
    >
      {/* Centered Option Text */}
      <p className={`text-lg ${textColor} font-medium`}>{optionText}</p>
    </div>
  );
};

export default Option;
