
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import AdminPanel from './components/AdminPanel'
import NotFound from './pages/NotFound'

// PERFORMANCE NOTE: Consider React.lazy() for code splitting:
// const About = React.lazy(() => import('./pages/About'))
// const Services = React.lazy(() => import('./pages/Services'))
// const Contact = React.lazy(() => import('./pages/Contact'))
// const Profile = React.lazy(() => import('./pages/Profile'))
// const AdminPanel = React.lazy(() => import('./components/AdminPanel'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* ACCESSIBILITY: Header contains main navigation with proper landmark roles */}
        <Header />

        {/* ACCESSIBILITY: Main content area with proper semantic structure */}
        <main role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/404" element={<NotFound />} />
            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* ACCESSIBILITY: Footer contains supplementary navigation and contact info */}
        <Footer />

        {/* Toast notifications with accessible styling */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #475569'
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App
