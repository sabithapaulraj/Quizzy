import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Clock, Plus, Star, Target } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import StatsCard from '../components/dashboard/StatsCard';
import QuizCard from '../components/dashboard/QuizCard';
import { quizzes } from '../data/mockData';
import { userStats } from '../data/mockData';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredQuizzes = selectedCategory 
    ? quizzes.filter(quiz => quiz.category === selectedCategory)
    : quizzes;
  
  const categories = [...new Set(quizzes.map(quiz => quiz.category))];
  
  const stats = [
    { title: 'Quizzes Completed', value: userStats.quizzesCompleted, icon: <Award size={24} /> },
    { title: 'Average Score', value: `${userStats.averageScore}%`, icon: <Target size={24} /> },
    { title: 'Questions Answered', value: userStats.totalQuestions, icon: <BookOpen size={24} /> },
    { title: 'Current Streak', value: `${userStats.streak} days`, icon: <Star size={24} /> },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Track your progress and discover new quizzes</p>
        </div>
        
        <Link to="/create-quiz" className="mt-4 md:mt-0 btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          Create Quiz
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            index={index}
          />
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Available Quizzes</h2>
          
          <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === null
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === category
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <Clock className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-slate-700">No quizzes found</h3>
            <p className="mt-2 text-slate-500">Try selecting a different category or create a new quiz</p>
            <Link to="/create-quiz" className="mt-4 inline-block btn-primary">
              Create Quiz
            </Link>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
