import { useAuth } from '../contexts/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import { userStats, recentActivity } from '../data/mockData';
import { Award, BarChart4, Pencil } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ProfilePage() {
  const { user } = useAuth();
  
  const pieData = [
    { name: 'Science', value: 45 },
    { name: 'Technology', value: 30 },
    { name: 'History', value: 15 },
    { name: 'Other', value: 10 },
  ];
  
  const COLORS = ['#6366f1', '#a5b4fc', '#312e81', '#c7d2fe'];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header/banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          {/* Profile info */}
          <div className="px-6 sm:px-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-4 sm:mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-500">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <h1 className="text-2xl font-bold text-slate-800">{user?.name}</h1>
                <p className="text-slate-500">{user?.email}</p>
              </div>
              
              <button className="mt-4 sm:mt-0 btn-secondary flex items-center">
                <Pencil size={16} className="mr-1" />
                Pencil Profile
              </button>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="px-6 sm:px-8 py-6 border-t border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Stats & Achievements</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-indigo-600 mb-2">
                  <Award size={20} />
                </div>
                <p className="text-sm text-slate-600">Quizzes Completed</p>
                <p className="text-2xl font-semibold text-slate-800">{userStats.quizzesCompleted}</p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-indigo-600 mb-2">
                  <BarChart4 size={20} />
                </div>
                <p className="text-sm text-slate-600">Average Score</p>
                <p className="text-2xl font-semibold text-slate-800">{userStats.averageScore}%</p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-indigo-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 7 L9 7 L9 15 L5 15 L5 7 Z"></path>
                    <path d="M10 10 L14 10 L14 15 L10 15 L10 10 Z"></path>
                    <path d="M15 5 L19 5 L19 15 L15 15 L15 5 Z"></path>
                  </svg>
                </div>
                <p className="text-sm text-slate-600">Total Questions</p>
                <p className="text-2xl font-semibold text-slate-800">{userStats.totalQuestions}</p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-indigo-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <p className="text-sm text-slate-600">Current Streak</p>
                <p className="text-2xl font-semibold text-slate-800">{userStats.streak} days</p>
              </div>
            </div>
          </div>
          
          {/* Quiz distribution */}
          <div className="px-6 sm:px-8 py-6 border-t border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Quiz Categories Distribution</h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent activity */}
          <div className="px-6 sm:px-8 py-6 border-t border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      {activity.type === 'quiz-completed' ? (
                        <Award size={20} className="text-indigo-600" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-slate-800">
                        {activity.type === 'quiz-completed' 
                          ? `Completed quiz: ${activity.details.title}`
                          : `Created quiz: ${activity.details.title}`
                        }
                      </p>
                      
                      {activity.type === 'quiz-completed' && (
                        <p className="text-sm text-slate-600 mt-1">
                          Score: {activity.details.score}/{activity.details.maxScore}
                        </p>
                      )}
                      
                      {activity.type === 'quiz-created' && (
                        <p className="text-sm text-slate-600 mt-1">
                          {activity.details.questionsCount} questions
                        </p>
                      )}
                    </div>
                    
                    <div className="text-sm text-slate-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
