
import { useState, useEffect, useCallback } from 'react'
import { lumi } from '../lib/lumi'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

interface Link {
  _id: string
  title: string
  url: string
  type: 'gofundme' | 'crypto' | 'social' | 'website' | 'other'
  description?: string
  icon?: string
  isActive: boolean
  priority: number
  creator: string
  createdAt: string
  updatedAt: string
}

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(false)
  const { user, userRole } = useAuth()

  const isAdmin = userRole === 'ADMIN'

  const fetchLinks = useCallback(async (includeInactive = false) => {
    setLoading(true)
    try {
      const filter = includeInactive ? {} : { isActive: true }
      const { list } = await lumi.entities.links.list({
        filter,
        sort: { priority: -1, createdAt: -1 }
      })
      setLinks(list || [])
    } catch (error) {
      console.error('Failed to fetch links:', error)
      toast.error('Failed to load links')
    } finally {
      setLoading(false)
    }
  }, [])

  const createLink = async (linkData: Omit<Link, '_id' | 'creator' | 'createdAt' | 'updatedAt'>) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    try {
      const now = new Date().toISOString()
      const newLink = await lumi.entities.links.create({
        ...linkData,
        creator: user?.userId || 'admin',
        createdAt: now,
        updatedAt: now
      })

      setLinks(prev => [newLink, ...prev].sort((a, b) => b.priority - a.priority))
      toast.success('Link created successfully')
      return newLink
    } catch (error) {
      console.error('Failed to create link:', error)
      toast.error('Failed to create link')
      throw error
    }
  }

  const updateLink = async (linkId: string, updates: Partial<Link>) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    try {
      const updatedLink = await lumi.entities.links.update(linkId, {
        ...updates,
        updatedAt: new Date().toISOString()
      })

      setLinks(prev =>
        prev.map(link => link._id === linkId ? updatedLink : link)
           .sort((a, b) => b.priority - a.priority)
      )
      toast.success('Link updated successfully')
      return updatedLink
    } catch (error) {
      console.error('Failed to update link:', error)
      toast.error('Failed to update link')
      throw error
    }
  }

  const deleteLink = async (linkId: string) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    try {
      await lumi.entities.links.delete(linkId)
      setLinks(prev => prev.filter(link => link._id !== linkId))
      toast.success('Link deleted successfully')
    } catch (error) {
      console.error('Failed to delete link:', error)
      toast.error('Failed to delete link')
      throw error
    }
  }

  const toggleLinkStatus = async (linkId: string, isActive: boolean) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    try {
      await updateLink(linkId, { isActive })
    } catch (error) {
      // Error already handled in updateLink
    }
  }

  useEffect(() => {
    fetchLinks(isAdmin)
  }, [fetchLinks, isAdmin])

  return {
    links,
    loading,
    isAdmin,
    fetchLinks,
    createLink,
    updateLink,
    deleteLink,
    toggleLinkStatus
  }
}
