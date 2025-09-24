
import React from 'react'
import { motion } from 'framer-motion'
import {ArrowRight, Zap, Shield, Cpu, Brain, Rocket, Users} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LinksSection from '../components/LinksSection'

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        {/* ACCESSIBILITY: Decorative background elements - consider adding aria-hidden="true" */}
        {/* ALT TEXT NOTE: Hero background uses CSS gradients - no alt text needed for decorative gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg')] bg-cover bg-center opacity-10"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* ACCESSIBILITY: Main heading - properly structured with h1 */}
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              Mako AI
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-300 mb-8 font-light">
              Advanced Artificial Intelligence Solutions
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your business with cutting-edge AI technology. From machine learning to automation,
              we deliver intelligent solutions that drive growth and innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                aria-label="Explore our AI services and solutions"
              >
                Explore Services
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 px-8 py-4 rounded-lg font-medium hover:bg-slate-800 hover:border-slate-500 transition-all duration-200"
                aria-label="Get in touch with our AI experts"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="features-heading" className="text-4xl font-bold text-slate-100 mb-4">
              Why Choose Mako AI?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We combine cutting-edge technology with practical solutions to deliver AI that works for your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Advanced Intelligence",
                description: "State-of-the-art machine learning algorithms that adapt and evolve with your needs."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance delivering results in milliseconds, not minutes."
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security ensuring your data remains protected and private."
              },
              {
                icon: Cpu,
                title: "Scalable Architecture",
                description: "Built to grow with your business from startup to enterprise scale."
              },
              {
                icon: Rocket,
                title: "Rapid Deployment",
                description: "Get up and running quickly with our streamlined implementation process."
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Dedicated team of AI specialists providing ongoing guidance and optimization."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section - Only show if user is logged in */}
      {user && <LinksSection />}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/20 to-purple-900/20" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-heading" className="text-4xl font-bold text-slate-100 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already leveraging the power of AI to drive innovation and growth.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
              aria-label="Start your AI transformation journey"
            >
              Start Your AI Journey
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
