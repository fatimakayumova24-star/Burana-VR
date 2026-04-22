import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Info, ArrowRight, ChevronLeft, ChevronRight, Sun, Moon, Menu, Instagram, Mail } from 'lucide-react';
import { SITE_CONTENT, ARTIFACTS, Artifact } from './constants';

// Helper to convert standard Google Drive share links into direct image links
const getDirectImageUrl = (url: string) => {
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // Using the thumbnail endpoint is much more reliable for embedding Drive images
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
    }
  }
  return url;
};

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artifact | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle dark mode class on html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentIndex = selectedArtwork ? ARTIFACTS.findIndex(a => a.id === selectedArtwork.id) : -1;

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex !== -1) {
      setSelectedArtwork(ARTIFACTS[(currentIndex + 1) % ARTIFACTS.length]);
    }
  }, [currentIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex !== -1) {
      setSelectedArtwork(ARTIFACTS[(currentIndex - 1 + ARTIFACTS.length) % ARTIFACTS.length]);
    }
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtwork) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedArtwork(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtwork, handleNext, handlePrev]);

  // Handle scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArtwork]);

  return (
    <div className="min-h-screen bg-[#f4f4f0] dark:bg-museum-dark text-museum-dark dark:text-museum-light font-sans selection:bg-museum-dark selection:text-museum-light dark:selection:bg-museum-light dark:selection:text-museum-dark transition-colors duration-500">
      <div className="noise-overlay" />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-[#f4f4f0]/90 dark:bg-museum-dark/90 backdrop-blur-md py-4 border-b border-black/5 dark:border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-widest uppercase">{SITE_CONTENT.navTitle}</div>
          <div className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase text-gray-600 dark:text-museum-muted">
            <a href="#about" className="hover:text-museum-dark dark:hover:text-museum-light transition-colors">About</a>
            <a href="#exhibition" className="hover:text-museum-dark dark:hover:text-museum-light transition-colors">Artifacts</a>
            <a href="#contact" className="hover:text-museum-dark dark:hover:text-museum-light transition-colors">Contact</a>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="text-sm uppercase tracking-widest p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#f4f4f0] dark:bg-museum-dark flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 p-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <div className="flex flex-col items-center space-y-8 text-lg tracking-[0.2em] uppercase">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-museum-accent transition-colors">About</a>
              <a href="#exhibition" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-museum-accent transition-colors">Artifacts</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-museum-accent transition-colors">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getDirectImageUrl(SITE_CONTENT.heroImage)}
            alt="Burana Tower"
            className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f0]/40 via-[#f4f4f0]/60 to-[#f4f4f0] dark:from-museum-dark/40 dark:via-museum-dark/60 dark:to-museum-dark"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 w-px h-24 bg-gradient-to-b from-transparent to-museum-accent/50 mx-auto"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-600 dark:text-museum-muted mb-6"
          >
            {SITE_CONTENT.heroSubtitle}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-light leading-[0.85] tracking-tighter mb-8 text-balance uppercase"
          >
            {SITE_CONTENT.heroTitleLine1} <br className="hidden md:block" />
            <span className="italic text-museum-accent/90 lowercase text-5xl md:text-7xl lg:text-8xl block mt-4">{SITE_CONTENT.heroTitleLine2}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8"
          >
            <button 
              onClick={() => {
                document.getElementById('exhibition')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden inline-flex items-center space-x-3 bg-transparent border border-black/30 dark:border-museum-light/30 text-museum-dark dark:text-museum-light rounded-full px-8 py-4 text-xs tracking-[0.15em] uppercase hover:border-museum-accent dark:hover:border-museum-accent hover:text-museum-accent dark:hover:text-museum-accent transition-all duration-500"
            >
              <span className="relative z-10 font-medium">View Artifacts</span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-museum-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
            <a 
              href="#about" 
              className="inline-flex items-center space-x-3 border border-transparent text-gray-600 dark:text-museum-muted hover:text-museum-dark dark:hover:text-museum-light rounded-full px-8 py-4 text-xs tracking-[0.15em] uppercase transition-all duration-300"
            >
              <span>Explore Museum</span>
            </a>
          </motion.div>
        </div>
      </header>

      {/* About / Introduction Section */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-light mb-6 text-balance">
              {SITE_CONTENT.welcomeMessage}
            </h2>
            <div className="w-12 h-px bg-museum-accent mb-8"></div>
            <p className="text-gray-600 dark:text-museum-muted text-sm md:text-base leading-relaxed mb-8">
              {SITE_CONTENT.introductionText}
            </p>
            <a 
              href="#exhibition" 
              className="inline-flex items-center space-x-2 text-xs tracking-[0.15em] uppercase text-museum-accent hover:text-museum-dark dark:hover:text-white transition-colors"
            >
              <span>View Artifacts</span>
              <ArrowRight size={14} />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square md:aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5 relative">
              <img 
                src={getDirectImageUrl(SITE_CONTENT.aboutImage)} 
                alt="Burana Museum Introduction" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-black/10 dark:border-white/10 m-4"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exhibition Section */}
      <main id="exhibition" className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-black/5 dark:border-white/5">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Historical Artifacts</h2>
            <p className="text-gray-600 dark:text-museum-muted max-w-md text-sm leading-relaxed">
              Discover the remnants of the ancient city of Balasagun. Click any artifact to view detailed historical information.
            </p>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="text-xs tracking-[0.2em] uppercase text-gray-600 dark:text-museum-muted border-b border-black/20 dark:border-white/20 pb-2 inline-block">
              Showing {ARTIFACTS.length} Exhibits
            </div>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {/* CSS Columns Masonry */}
          {ARTIFACTS.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="relative overflow-hidden bg-black/5 dark:bg-white/5">
                <img
                  src={getDirectImageUrl(artwork.imageUrl)}
                  alt={artwork.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-white border border-white/30 rounded-full px-6 py-3 backdrop-blur-sm">
                      <Maximize2 size={16} />
                      <span className="text-xs tracking-widest uppercase">View Details</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-1 group-hover:text-museum-accent transition-colors">{artwork.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-museum-muted">{artwork.category}</p>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-museum-muted font-mono">{artwork.period}</div>
                </div>
              </motion.div>
            ))}
          </div>
      </main>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-museum-accent mb-4">Get in Touch</div>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">Contact Information</h2>
          <p className="text-gray-600 dark:text-museum-muted text-sm md:text-base leading-relaxed mb-12">
            For inquiries regarding the Open Air Burana Online Museum, educational resources, or collaboration opportunities, please reach out to us.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:kayumova_f@auca.kg"
              className="flex items-center space-x-3 px-8 py-4 border border-black/20 dark:border-white/20 rounded-full hover:border-museum-accent dark:hover:border-museum-accent hover:text-museum-accent transition-colors"
            >
              <Mail size={18} />
              <span className="text-xs tracking-widest uppercase">kayumova_f@auca.kg</span>
            </a>
            <a 
              href="#"
              className="flex items-center space-x-3 px-8 py-4 border border-black/20 dark:border-white/20 rounded-full hover:border-museum-accent dark:hover:border-museum-accent hover:text-museum-accent transition-colors"
            >
              <Instagram size={18} />
              <span className="text-xs tracking-widest uppercase">Instagram</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif text-xl tracking-widest uppercase">{SITE_CONTENT.navTitle}</div>
          <div className="text-xs text-museum-muted tracking-wider">
            &copy; {new Date().getFullYear()} {SITE_CONTENT.museumName}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Artifact Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedArtwork(null)}
          >
            <button 
              className="hidden md:block absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-2 rounded-full backdrop-blur-sm"
              onClick={() => setSelectedArtwork(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <button 
              className="hidden md:block absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full backdrop-blur-sm"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>

            <button 
              className="hidden md:block absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-7xl max-h-[90vh] flex flex-col lg:flex-row bg-[#f4f4f0]/95 dark:bg-museum-dark/95 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden relative z-40"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Image Side - Hidden on mobile, visible on large screens */}
              <div className="hidden lg:flex w-full lg:w-3/5 relative bg-black/10 dark:bg-black/50 items-center justify-center p-4 md:p-8 min-h-[40vh] lg:min-h-[80vh]">
                <img
                  src={getDirectImageUrl(selectedArtwork.imageUrl)}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain shadow-2xl border border-black/5 dark:border-white/5"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details Side */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto no-scrollbar bg-transparent">
                <div className="mb-8">
                  <div className="text-xs tracking-[0.2em] uppercase text-gray-600 dark:text-museum-muted mb-4 flex items-center space-x-2">
                    <Info size={14} />
                    <span>Historical Information</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-2 leading-tight text-museum-dark dark:text-museum-light">
                    {selectedArtwork.title}
                  </h2>
                </div>

                <div className="space-y-6 border-t border-black/10 dark:border-white/10 pt-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-gray-600 dark:text-museum-muted mb-1">Time Period</p>
                      <p className="font-mono text-sm text-museum-dark dark:text-museum-light">{selectedArtwork.period}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-gray-600 dark:text-museum-muted mb-1">Category</p>
                      <p className="text-sm text-museum-dark dark:text-museum-light">{selectedArtwork.category}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-gray-600 dark:text-museum-muted mb-3">Description</p>
                    <p className="text-sm text-gray-800 dark:text-white/70 leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <button 
                      onClick={handlePrev}
                      className="flex-1 flex items-center justify-center space-x-2 py-3.5 border border-black/20 dark:border-white/20 rounded-full text-museum-dark dark:text-museum-light text-[10px] sm:text-xs tracking-[0.15em] uppercase hover:border-museum-accent dark:hover:border-museum-accent hover:text-museum-accent dark:hover:text-museum-accent transition-all duration-300"
                    >
                      <ChevronLeft size={14} />
                      <span>Previous</span>
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center space-x-2 py-3.5 border border-black/20 dark:border-white/20 rounded-full text-museum-dark dark:text-museum-light text-[10px] sm:text-xs tracking-[0.15em] uppercase hover:border-museum-accent dark:hover:border-museum-accent hover:text-museum-accent dark:hover:text-museum-accent transition-all duration-300"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedArtwork(null)}
                    className="w-full py-4 bg-museum-dark dark:bg-white text-museum-light dark:text-museum-dark rounded-full text-xs tracking-[0.15em] uppercase hover:bg-museum-accent dark:hover:bg-museum-accent hover:text-white dark:hover:text-white transition-all duration-300 font-medium"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
