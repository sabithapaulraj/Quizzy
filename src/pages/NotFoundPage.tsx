import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-slate-800">Page not found</h2>
        <p className="mt-2 text-slate-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="mt-8 inline-flex items-center btn-primary"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
