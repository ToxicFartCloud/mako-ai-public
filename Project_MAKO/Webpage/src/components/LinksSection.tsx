import React from 'react'
import { motion } from 'framer-motion'
import {ExternalLink} from 'lucide-react'
import { useLinks } from '../hooks/useLinks'

const LinksSection: React.FC = () => {
  const { links, loading } = useLinks()

  if (loading) {
    return (
      <section className="py-16 bg-slate-800/30" aria-label="Loading links">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!links.length) {
    return null
  }

  return (
    <section className="py-16 bg-slate-800/30" aria-labelledby="links-heading">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="links-heading" className="text-3xl font-bold text-slate-100 mb-4">
            Connect With Us
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stay connected and support our mission through various platforms and channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <motion.a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              /* ACCESSIBILITY: ARIA label for external links with clear indication */
              aria-label={`${link.title} - Opens in new tab`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
                  {link.title}
                </h3>
                {/* ACCESSIBILITY: External link indicator with proper ARIA label */}
                <ExternalLink
                  size={18}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                  aria-label="External link indicator"
                />
              </div>

              {link.description && (
                <p className="text-slate-400 text-sm leading-relaxed">
                  {link.description}
                </p>
              )}

              {/* Link type indicator */}
              <div className="absolute top-3 right-3">
                <span
                  className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full"
                  aria-label={`Link type: ${link.type}`}
                >
                  {link.type}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LinksSection
