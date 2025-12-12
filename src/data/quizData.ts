// src/data/quizData.ts

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface UserResponse {
  questionId: number;
  selectedAnswer: string | null;
}

export const quizData: Question[] = [
  
  {
    id: 1,
    questionText: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow",
  },
  {
    id: 2,
    questionText: "What would probably you find in your fridge?",
    options: ["shoes", "ice-cream", "pen"],
    correctAnswer: "ice-cream",
  },
  {
    id: 3,
    questionText: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite",
  },
  {
    id: 4,
    questionText: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow",
  },
  
];