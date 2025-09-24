
import React from 'react'
import { motion } from 'framer-motion'
import {User, Mail, Calendar, Shield, Settings, Bell} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const { user, isAuthenticated, userRole } = useAuth()

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const accountFeatures = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      action: 'Configure'
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Update your account information',
      action: 'Manage'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Manage your security settings',
      action: 'Review'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Your Profile
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage your account settings and preferences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{user?.userName}</h2>
                  <span className="inline-block px-3 py-1 text-sm bg-cyan-500/20 text-cyan-400 rounded-full">
                    {userRole}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Member Since</p>
                      <p className="text-white">{user?.createdTime && formatDate(user.createdTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">User ID</p>
                      <p className="text-white font-mono text-sm">{user?.userId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Account Management</h3>

                {accountFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                          <feature.icon className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                          <p className="text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300">
                        {feature.action}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Admin Features */}
                {userRole === 'ADMIN' && (
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/30">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-purple-400" />
                      <span>Admin Features</span>
                    </h4>
                    <p className="text-gray-400 mb-4">
                      You have administrative privileges. Access advanced features and management tools.
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                      Admin Dashboard
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
