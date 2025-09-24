
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Menu, X, User, LogOut, Settings} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      setIsUserMenuOpen(false)
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    /* ACCESSIBILITY: Header landmark with proper navigation role */
    <header className="relative z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700" role="banner">
      <nav className="max-w-6xl mx-auto px-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition-all duration-200"
            aria-label="Mako AI - Return to homepage"
          >
            Mako AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* ACCESSIBILITY: Navigation links with proper ARIA current for active page */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-slate-300 hover:text-cyan-400 transition-colors duration-200 ${
                  location.pathname === item.href ? 'text-cyan-400' : ''
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  aria-label={`User menu for ${user.email}`}
                >
                  <User size={20} />
                  <span className="text-sm">{user.email}</span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                      role="menuitem"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                        role="menuitem"
                      >
                        <Settings size={16} />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-red-400 transition-colors duration-200"
                      role="menuitem"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {/* TODO: Implement sign in modal */}}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-200"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {/* TODO: Implement sign up modal */}}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-200"
                  aria-label="Create a new account"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-slate-700"
            role="menu"
            aria-orientation="vertical"
          >
            {/* ACCESSIBILITY: Mobile navigation links with proper roles */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200 ${
                  location.pathname === item.href ? 'text-cyan-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile User Menu */}
            {user ? (
              <div className="pt-4 border-t border-slate-700 mt-4">
                <div className="text-slate-400 text-sm mb-2">Signed in as {user.email}</div>
                <Link
                  to="/profile"
                  className="block py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Profile
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block py-2 text-slate-300 hover:text-red-400 transition-colors duration-200"
                  role="menuitem"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-700 mt-4 space-y-2">
                <button
                  onClick={() => {/* TODO: Implement sign in modal */}}
                  className="block w-full text-left py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200"
                  role="menuitem"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {/* TODO: Implement sign up modal */}}
                  className="block w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-200"
                  role="menuitem"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
