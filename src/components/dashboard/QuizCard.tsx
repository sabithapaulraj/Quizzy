import { ArrowRight, Clock } from 'lucide-react';
import { Quiz } from '../../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

export default function QuizCard({ quiz, index }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card hover:shadow-md transition-shadow group"
    >
      <div className="flex flex-col h-full">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {quiz.category}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {quiz.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{quiz.description}</p>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-slate-500">
          <Clock size={16} className="mr-1" />
          <span>{quiz.duration} minutes</span>
          <span className="mx-2">•</span>
          <span>{quiz.questions.length} questions</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Created {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/quiz/${quiz.id}`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Take Quiz <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
