import { Category, Quiz, QuizAttempt, User } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'user',
};

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Science',
    description: 'Physics, Chemistry, Biology and more',
    iconName: 'flask'
  },
  {
    id: 'cat-2',
    name: 'History',
    description: 'World history, civilizations and important events',
    iconName: 'landmark'
  },
  {
    id: 'cat-3',
    name: 'Technology',
    description: 'Programming, web development and IT',
    iconName: 'code'
  },
  {
    id: 'cat-4',
    name: 'Literature',
    description: 'Books, authors and literary periods',
    iconName: 'book'
  },
  {
    id: 'cat-5',
    name: 'Geography',
    description: 'Countries, capitals and natural features',
    iconName: 'globe'
  },
  {
    id: 'cat-6',
    name: 'Custom',
    description: 'Upload your documents to create custom quizzes',
    iconName: 'file-text'
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Introduction to Physics',
    description: 'Test your knowledge of basic physics concepts including mechanics and thermodynamics',
    createdAt: '2023-06-15T10:30:00Z',
    duration: 15,
    category: 'Science',
    createdBy: 'system',
    isPublic: true,
    questions: [
      {
        id: 'q1-1',
        text: 'What is Newton\'s First Law of Motion?',
        type: 'multiple-choice',
        options: [
          'An object in motion stays in motion unless acted upon by an external force',
          'Force equals mass times acceleration',
          'For every action, there is an equal and opposite reaction',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 0,
        explanation: 'Newton\'s First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.'
      },
      {
        id: 'q1-2',
        text: 'What is the unit of force in the International System of Units (SI)?',
        type: 'multiple-choice',
        options: [
          'Watt',
          'Joule',
          'Newton',
          'Pascal'
        ],
        correctAnswer: 2,
        explanation: 'The newton (N) is the SI unit of force, named after Sir Isaac Newton.'
      },
      {
        id: 'q1-3',
        text: 'Explain the difference between speed and velocity.',
        type: 'subjective',
        correctAnswer: 'Speed is a scalar quantity that refers to how fast an object is moving, while velocity is a vector quantity that refers to how fast an object is moving in a specific direction.',
      }
    ]
  },
  {
    id: 'quiz-2',
    title: 'Web Development Fundamentals',
    description: 'Basic concepts of HTML, CSS and JavaScript for web development',
    createdAt: '2023-07-20T14:45:00Z',
    duration: 20,
    category: 'Technology',
    createdBy: 'system',
    isPublic: true,
    questions: [
      {
        id: 'q2-1',
        text: 'Which HTML tag is used to create a hyperlink?',
        type: 'multiple-choice',
        options: [
          '<link>',
          '<a>',
          '<href>',
          '<url>'
        ],
        correctAnswer: 1,
        explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML.'
      },
      {
        id: 'q2-2',
        text: 'Which CSS property is used to change the text color of an element?',
        type: 'multiple-choice',
        options: [
          'text-color',
          'font-color',
          'color',
          'text-style'
        ],
        correctAnswer: 2,
        explanation: 'The "color" property is used to set the text color in CSS.'
      }
    ]
  }
];

export const quizAttempts: QuizAttempt[] = [
  {
    id: 'attempt-1',
    quizId: 'quiz-1',
    userId: 'user-1',
    startedAt: '2023-06-18T09:15:00Z',
    completedAt: '2023-06-18T09:28:00Z',
    score: 2,
    maxScore: 3,
    answers: [
      {
        questionId: 'q1-1',
        answer: 0,
        isCorrect: true
      },
      {
        questionId: 'q1-2',
        answer: 2,
        isCorrect: true
      },
      {
        questionId: 'q1-3',
        answer: 'Speed is how fast something moves, velocity includes direction.',
        isCorrect: false
      }
    ]
  },
  {
    id: 'attempt-2',
    quizId: 'quiz-2',
    userId: 'user-1',
    startedAt: '2023-07-25T16:00:00Z',
    completedAt: '2023-07-25T16:15:00Z',
    score: 2,
    maxScore: 2,
    answers: [
      {
        questionId: 'q2-1',
        answer: 1,
        isCorrect: true
      },
      {
        questionId: 'q2-2',
        answer: 2,
        isCorrect: true
      }
    ]
  }
];

export const recentActivity = [
  {
    id: 'activity-1',
    type: 'quiz-completed',
    quizId: 'quiz-2',
    date: '2023-07-25T16:15:00Z',
    details: {
      score: 2,
      maxScore: 2,
      title: 'Web Development Fundamentals'
    }
  },
  {
    id: 'activity-2',
    type: 'quiz-completed',
    quizId: 'quiz-1',
    date: '2023-06-18T09:28:00Z',
    details: {
      score: 2,
      maxScore: 3,
      title: 'Introduction to Physics'
    }
  },
  {
    id: 'activity-3',
    type: 'quiz-created',
    quizId: 'quiz-custom-1',
    date: '2023-05-10T13:45:00Z',
    details: {
      title: 'Machine Learning Basics',
      questionsCount: 5
    }
  }
];

export const userStats = {
  quizzesCompleted: 6,
  averageScore: 85,
  totalQuestions: 24,
  categoriesExplored: 3,
  streak: 2
};
