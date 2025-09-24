
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Plus, Edit3, Trash2, Eye, EyeOff, ExternalLink, Shield, Settings, Heart, Bitcoin, Wallet, Twitter, Globe, Link as LinkIcon} from 'lucide-react'
import { useLinks } from '../hooks/useLinks'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const linkTypeIcons = {
  gofundme: Heart,
  crypto: Bitcoin,
  social: Twitter,
  website: Globe,
  other: LinkIcon
}

const linkTypeColors = {
  gofundme: 'bg-pink-500',
  crypto: 'bg-orange-500',
  social: 'bg-blue-500',
  website: 'bg-green-500',
  other: 'bg-gray-500'
}

interface LinkFormData {
  title: string
  url: string
  type: 'gofundme' | 'crypto' | 'social' | 'website' | 'other'
  description: string
  icon: string
  isActive: boolean
  priority: number
}

const AdminPanel = () => {
  const { user, isAuthenticated, userRole } = useAuth()
  const { links, loading, isAdmin, createLink, updateLink, deleteLink, toggleLinkStatus } = useLinks()
  const [showForm, setShowForm] = useState(false)
  const [editingLink, setEditingLink] = useState<any>(null)
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    type: 'other',
    description: '',
    icon: '',
    isActive: true,
    priority: 50
  })

  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (userRole !== 'ADMIN') {
    return (
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-400">Admin privileges required to access this page.</p>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingLink) {
        await updateLink(editingLink._id, formData)
      } else {
        await createLink(formData)
      }

      setShowForm(false)
      setEditingLink(null)
      setFormData({
        title: '',
        url: '',
        type: 'other',
        description: '',
        icon: '',
        isActive: true,
        priority: 50
      })
    } catch (error) {
      // Error already handled by hook
    }
  }

  const handleEdit = (link: any) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      type: link.type,
      description: link.description || '',
      icon: link.icon || '',
      isActive: link.isActive,
      priority: link.priority || 50
    })
    setShowForm(true)
  }

  const handleDelete = async (linkId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteLink(linkId)
    }
  }

  const IconComponent = linkTypeIcons[formData.type] || LinkIcon

  return (
    <div className="pt-16">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Settings className="h-12 w-12 text-cyan-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Manage links and website content
            </p>
          </motion.div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Total Links</h3>
              <p className="text-3xl font-bold text-cyan-400">{links.length}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Active Links</h3>
              <p className="text-3xl font-bold text-green-400">
                {links.filter(link => link.isActive).length}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Admin User</h3>
              <p className="text-lg text-purple-400">{user?.userName}</p>
            </div>
          </div>

          {/* Add Link Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Link Management</h2>
            <button
              onClick={() => {
                setEditingLink(null)
                setFormData({
                  title: '',
                  url: '',
                  type: 'other',
                  description: '',
                  icon: '',
                  isActive: true,
                  priority: 50
                })
                setShowForm(true)
              }}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Link</span>
            </button>
          </div>

          {/* Links List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => {
                const TypeIcon = linkTypeIcons[link.type] || LinkIcon
                const typeColor = linkTypeColors[link.type] || 'bg-gray-500'

                return (
                  <motion.div
                    key={link._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${typeColor}`}>
                          <TypeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                          <p className="text-gray-400 text-sm">{link.url}</p>
                          {link.description && (
                            <p className="text-gray-500 text-sm mt-1">{link.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Type: {link.type}</span>
                            <span>Priority: {link.priority}</span>
                            <span>Created: {new Date(link.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleLinkStatus(link._id, !link.isActive)}
                          className={`p-2 rounded-lg transition-colors ${
                            link.isActive
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                          }`}
                          title={link.isActive ? 'Hide link' : 'Show link'}
                        >
                          {link.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>

                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Open link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>

                        <button
                          onClick={() => handleEdit(link)}
                          className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                          title="Edit link"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(link._id, link.title)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Delete link"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {links.length === 0 && (
                <div className="text-center py-12">
                  <LinkIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No links created yet</p>
                  <p className="text-gray-500">Click "Add Link" to create your first link</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Link Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {editingLink ? 'Edit Link' : 'Add New Link'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter link title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="gofundme">GoFundMe</option>
                    <option value="crypto">Crypto Wallet</option>
                    <option value="social">Social Media</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priority
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.isActive ? 'active' : 'inactive'}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    {editingLink ? 'Update Link' : 'Create Link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPanel
