import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import QuizCard from '../components/dashboard/QuizCard';
import { quizzes } from '../data/mockData';

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [...new Set(quizzes.map(quiz => quiz.category))];
  
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = searchTerm === '' || 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || quiz.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Quizzes</h1>
          <p className="text-slate-500 mt-1">Browse and take quizzes to test your knowledge</p>
        </div>
        
        <Link to="/create-quiz" className="mt-4 md:mt-0 btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          Create Quiz
        </Link>
      </div>
      
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
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
        {filteredQuizzes.map((quiz, index) => (
          <QuizCard key={quiz.id} quiz={quiz} index={index} />
        ))}
        
        {filteredQuizzes.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="rounded-full bg-slate-100 p-3 w-fit mx-auto">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-slate-700">No quizzes found</h3>
            <p className="mt-2 text-slate-500">
              {searchTerm 
                ? `No results for "${searchTerm}". Try a different search term.` 
                : 'Try selecting a different category or create a new quiz.'}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
