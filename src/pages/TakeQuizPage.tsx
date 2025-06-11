import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, CircleHelp, CircleX } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { quizzes } from '../data/mockData';
import { Quiz, Question } from '../types';
import { motion } from 'framer-motion';

export default function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get quiz data
    setTimeout(() => {
      const foundQuiz = quizzes.find(q => q.id === quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setTimeLeft(foundQuiz.duration * 60);
        setAnswers(new Array(foundQuiz.questions.length).fill(''));
      }
      setIsLoading(false);
    }, 1000);
  }, [quizId]);
  
  useEffect(() => {
    if (!quiz || isQuizCompleted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quiz, isQuizCompleted]);
  
  const handleAnswerChange = (answer: string | number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleQuizSubmit = () => {
    setIsQuizCompleted(true);
    // In a real app, we would submit answers to the backend here
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
        </div>
      </AppLayout>
    );
  }
  
  if (!quiz) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <CircleHelp size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Not Found</h2>
          <p className="text-slate-600 mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/quizzes')}
            className="btn-primary"
          >
            Back to Quizzes
          </button>
        </div>
      </AppLayout>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (isQuizCompleted) {
    // Calculate score
    const score = answers.reduce((total, answer, index) => {
      const question = quiz.questions[index];
      if (answer === question.correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);
    
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <AppLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                {percentage >= 70 ? (
                  <Check size={32} />
                ) : (
                  <CircleX size={32} />
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Quiz Completed!</h1>
              <p className="text-slate-600">{quiz.title}</p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
              <div className="bg-indigo-50 rounded-lg p-4 text-center min-w-32">
                <p className="text-sm text-slate-600">Score</p>
                <p className="text-3xl font-bold text-indigo-600">{score}/{quiz.questions.length}</p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 text-center min-w-32">
                <p className="text-sm text-slate-600">Percentage</p>
                <p className="text-3xl font-bold text-indigo-600">{percentage}%</p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 text-center min-w-32">
                <p className="text-sm text-slate-600">Result</p>
                <p className={`text-xl font-bold ${percentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {percentage >= 70 ? 'Passed' : 'Failed'}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Review Your Answers</h2>
              
              <div className="space-y-4">
                {quiz.questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg border ${
                      answers[index] === question.correctAnswer
                        ? 'border-green-100 bg-green-50'
                        : 'border-red-100 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {answers[index] === question.correctAnswer ? (
                          <Check size={20} className="text-green-600" />
                        ) : (
                          <CircleX size={20} className="text-red-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 mb-2">
                          {index + 1}. {question.text}
                        </p>
                        
                        {question.type === 'multiple-choice' && (
                          <div className="mb-2">
                            <p className="text-sm text-slate-600 mb-1">Your answer:</p>
                            <p className={`font-medium ${
                              answers[index] === question.correctAnswer
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}>
                              {typeof answers[index] === 'number' 
                                ? question.options?.[answers[index] as number] 
                                : 'Not answered'}
                            </p>
                            
                            {answers[index] !== question.correctAnswer && (
                              <>
                                <p className="text-sm text-slate-600 mt-2 mb-1">Correct answer:</p>
                                <p className="font-medium text-green-600">
                                  {typeof question.correctAnswer === 'number'
                                    ? question.options?.[question.correctAnswer as number]
                                    : question.correctAnswer}
                                </p>
                              </>
                            )}
                          </div>
                        )}
                        
                        {question.type === 'subjective' && (
                          <div className="mb-2">
                            <p className="text-sm text-slate-600 mb-1">Your answer:</p>
                            <p className="font-medium text-slate-800 bg-white p-2 rounded border border-slate-200">
                              {answers[index] || 'Not answered'}
                            </p>
                            
                            <p className="text-sm text-slate-600 mt-2 mb-1">Model answer:</p>
                            <p className="font-medium text-slate-800 bg-white p-2 rounded border border-slate-200">
                              {question.correctAnswer}
                            </p>
                          </div>
                        )}
                        
                        {question.explanation && (
                          <div className="mt-2 text-sm bg-white p-3 rounded-lg border border-slate-200">
                            <p className="font-medium text-slate-700 mb-1">Explanation:</p>
                            <p className="text-slate-600">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Back to Dashboard
              </button>
              
              <button
                onClick={() => navigate('/quizzes')}
                className="btn-primary"
              >
                Take Another Quiz
              </button>
            </div>
          </div>
        </motion.div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Quiz header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-800">{quiz.title}</h1>
                <p className="text-slate-500 mt-1">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
              </div>
              
              <div className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg">
                <Clock size={18} className="mr-2" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          
          {/* Question navigation */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 overflow-x-auto">
            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`min-w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentQuestionIndex === index
                      ? 'bg-indigo-600 text-white'
                      : answers[index] !== ''
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          {/* Question content */}
          <div className="p-6">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RenderQuestion
                question={currentQuestion}
                selectedAnswer={answers[currentQuestionIndex]}
                onAnswerChange={handleAnswerChange}
              />
            </motion.div>
          </div>
          
          {/* Navigation buttons */}
          <div className="px-6 py-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`btn-secondary flex items-center ${
                currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft size={18} className="mr-1" />
              Previous
            </button>
            
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleQuizSubmit}
                className="btn-primary flex items-center"
              >
                Submit Quiz
                <Check size={18} className="ml-1" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center"
              >
                Next
                <ArrowRight size={18} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface RenderQuestionProps {
  question: Question;
  selectedAnswer: string | number;
  onAnswerChange: (answer: string | number) => void;
}

function RenderQuestion({ question, selectedAnswer, onAnswerChange }: RenderQuestionProps) {
  if (question.type === 'multiple-choice') {
    return (
      <div>
        <h2 className="text-lg font-medium text-slate-800 mb-4">{question.text}</h2>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div
              key={index}
              onClick={() => onAnswerChange(index)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedAnswer === index
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                  selectedAnswer === index
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-slate-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="ml-3">{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (question.type === 'subjective') {
    return (
      <div>
        <h2 className="text-lg font-medium text-slate-800 mb-4">{question.text}</h2>
        
        <textarea
          value={selectedAnswer as string}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full min-h-32 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
        />
      </div>
    );
  }
  
  return null;
}
