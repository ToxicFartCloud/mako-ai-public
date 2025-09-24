
import React from 'react'
import { Link } from 'react-router-dom'
import {Home, ArrowLeft} from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-800 hover:border-slate-500 transition-all duration-200 ml-4"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Need help? <Link to="/contact" className="text-cyan-400 hover:text-cyan-300">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
