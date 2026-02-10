import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', page: 'Home' },
    { name: 'Projects', page: 'Projects' },
    { name: 'Journal', page: 'Journal' },
    { name: 'Info', page: 'Info' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .nav-link {
          letter-spacing: 0.15em;
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
        }
        
        .site-title {
          letter-spacing: 0.2em;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }
        
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Desktop Vertical Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-between py-12 z-50 bg-[#f5f5f3]/90 backdrop-blur-sm">
        <Link 
          to={createPageUrl('Home')} 
          className="site-title text-[#1a1a1a] writing-mode-vertical transform -rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          Portfolio
        </Link>
        
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`nav-link transition-colors duration-300 ${
                currentPageName === item.page 
                  ? 'text-[#1a1a1a]' 
                  : 'text-[#8a8a8a] hover:text-[#1a1a1a]'
              }`}
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="w-[1px] h-16 bg-[#d0d0d0]" />
      </nav>

      {/* Mobile Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#f5f5f3]/95 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 py-5">
          <Link to={createPageUrl('Home')} className="site-title text-[#1a1a1a]">
            Portfolio
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#1a1a1a] p-2"
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#f5f5f3] flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={createPageUrl(item.page)}
                    onClick={() => setMenuOpen(false)}
                    className={`nav-link text-lg tracking-[0.3em] transition-colors duration-300 ${
                      currentPageName === item.page 
                        ? 'text-[#1a1a1a]' 
                        : 'text-[#8a8a8a] hover:text-[#1a1a1a]'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-20">
        {children}
      </main>
    </div>
  );
}