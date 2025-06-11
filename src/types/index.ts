export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  duration: number; // in minutes
  questions: Question[];
  category: string;
  createdBy: string;
  isPublic: boolean;
}

export type QuestionType = 'multiple-choice' | 'subjective';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  maxScore: number;
  answers: {
    questionId: string;
    answer: string | number;
    isCorrect?: boolean;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
}
