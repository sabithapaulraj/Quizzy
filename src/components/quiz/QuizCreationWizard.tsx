import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const quizTypes = [
  {
    id: 'topic',
    title: 'Topic-based Quiz',
    description: 'Create a quiz from general knowledge topics',
    icon: <BookOpen size={24} />,
  },
  {
    id: 'document',
    title: 'Document-based Quiz',
    description: 'Upload a document to generate questions',
    icon: <FileText size={24} />,
  },
];

export default function QuizCreationWizard() {
  const [step, setStep] = useState(1);
  const [quizType, setQuizType] = useState<string>('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    // Simulate API call to generate quiz
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    navigate('/quiz/new-quiz-id');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Create New Quiz</h1>
          <div className="text-sm font-medium text-slate-500">
            Step {step} of {quizType === 'document' ? 3 : 2}
          </div>
        </div>
        
        <div className="w-full bg-slate-200 h-2 rounded-full mt-4">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / (quizType === 'document' ? 3 : 2)) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-lg font-medium text-slate-700 mb-4">Choose Quiz Type</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quizTypes.map((type) => (
              <div
                key={type.id}
                className={`card cursor-pointer transition-all ${
                  quizType === type.id
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'hover:border-indigo-200'
                }`}
                onClick={() => setQuizType(type.id)}
              >
                <div className="flex items-start">
                  <div className="rounded-lg p-3 bg-indigo-100 text-indigo-600">{type.icon}</div>
                  <div className="ml-4">
                    <h3 className="font-medium text-slate-800">{type.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!quizType}
              className="btn-primary"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}

      {step === 2 && quizType === 'topic' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-lg font-medium text-slate-700 mb-4">Select Topic</h2>
          
          <div className="card">
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">
                Topic or Subject
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-field"
                placeholder="e.g. World History, Quantum Physics, Web Development"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 mb-1">
                Difficulty Level
              </label>
              <select id="difficulty" className="input-field">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="questions" className="block text-sm font-medium text-slate-700 mb-1">
                Number of Questions
              </label>
              <select id="questions" className="input-field">
                <option value="5">5 questions</option>
                <option value="10">10 questions</option>
                <option value="15">15 questions</option>
                <option value="20">20 questions</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                Question Type
              </label>
              <select id="type" className="input-field">
                <option value="multiple-choice">Multiple Choice Only</option>
                <option value="subjective">Subjective Only</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="btn-secondary"
            >
              Back
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!topic || isGenerating}
              className="btn-primary flex items-center"
            >
              {isGenerating && (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              )}
              {isGenerating ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
          </div>
        </motion.div>
      )}

      {step === 2 && quizType === 'document' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-lg font-medium text-slate-700 mb-4">Upload Document</h2>
          
          <div 
            {...getRootProps()} 
            className={`card border-dashed cursor-pointer ${
              isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300'
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center py-8">
              <Upload size={36} className="mx-auto text-slate-400 mb-3" />
              
              {file ? (
                <>
                  <p className="font-medium text-indigo-600">{file.name}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <p className="text-slate-600 font-medium">
                    {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Supports PDF, DOCX, and TXT files (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="btn-secondary"
            >
              Back
            </button>
            
            <button
              onClick={() => setStep(3)}
              disabled={!file}
              className="btn-primary"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}

      {step === 3 && quizType === 'document' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-lg font-medium text-slate-700 mb-4">Configure Quiz Options</h2>
          
          <div className="card">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                Quiz Title
              </label>
              <input
                id="title"
                type="text"
                className="input-field"
                placeholder="Enter a title for your quiz"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 mb-1">
                Difficulty Level
              </label>
              <select id="difficulty" className="input-field">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="questions" className="block text-sm font-medium text-slate-700 mb-1">
                Number of Questions
              </label>
              <select id="questions" className="input-field">
                <option value="5">5 questions</option>
                <option value="10">10 questions</option>
                <option value="15">15 questions</option>
                <option value="20">20 questions</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                Question Type
              </label>
              <select id="type" className="input-field">
                <option value="multiple-choice">Multiple Choice Only</option>
                <option value="subjective">Subjective Only</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary"
            >
              Back
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="btn-primary flex items-center"
            >
              {isGenerating && (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              )}
              {isGenerating ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
