import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sun, Moon, Menu, Mail, Instagram, X } from 'lucide-react';
import { SITE_CONTENT, HISTORY_INFO } from './constants';

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

  // Handle scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f0] dark:bg-museum-dark text-museum-dark dark:text-museum-light font-sans selection:bg-museum-dark selection:text-museum-light dark:selection:bg-museum-light dark:selection:text-museum-dark transition-colors duration-500">
      <div className="noise-overlay" />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-[#f4f4f0]/90 dark:bg-museum-dark/90 backdrop-blur-md py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-widest uppercase">{SITE_CONTENT.navTitle}</div>
          <div className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase text-gray-600 dark:text-museum-muted">
            <a href="#about" className="hover:text-museum-dark dark:hover:text-museum-light transition-colors">About</a>
            <a href="#exhibition" className="hover:text-museum-dark dark:hover:text-museum-light transition-colors">Virtual Tour</a>
            <a href="#references" className="hover:text-museum-dark dark:hover:text-museum-light transition-colors">Credits</a>
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
              <a href="#exhibition" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-museum-accent transition-colors">Virtual Tour</a>
              <a href="#references" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-museum-accent transition-colors">Credits</a>
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
              <span className="relative z-10 font-medium">Virtual Tour</span>
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
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-light mb-6 text-balance">
            {SITE_CONTENT.welcomeMessage}
          </h2>
          <div className="w-12 h-px bg-museum-accent mb-8 mx-auto"></div>
          <p className="text-gray-600 dark:text-museum-muted text-sm md:text-base leading-relaxed max-w-2xl">
            {SITE_CONTENT.introductionText}
          </p>
        </motion.div>

        {/* Lead Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-4xl mx-auto"
        >
          <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed text-museum-dark dark:text-museum-light text-balance text-center md:text-justify max-w-[90%] mx-auto">
            {HISTORY_INFO.lead}
          </p>
        </motion.div>

        {/* Two Columns: Origins & Evolution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="w-8 h-px bg-museum-accent hidden md:block"></div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-museum-accent font-semibold">Origins & Meaning</h3>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-museum-light/80 text-sm md:text-base leading-relaxed text-justify md:text-left">
              {HISTORY_INFO.origins.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="w-8 h-px bg-museum-accent hidden md:block"></div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-museum-accent font-semibold">Evolution & Craft</h3>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-museum-light/80 text-sm md:text-base leading-relaxed text-justify md:text-left">
              {HISTORY_INFO.evolution.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </motion.div>
        </div>

        {/* Highlight Quote Grid spanning full width */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-3xl p-8 md:p-12 mb-20 overflow-hidden text-center"
        >
          <div className="absolute left-0 top-0 w-1 h-full bg-museum-accent hidden md:block"></div>
          <p className="font-serif text-lg md:text-xl text-museum-dark dark:text-museum-light italic leading-relaxed text-center text-balance">
            "{HISTORY_INFO.quote}"
          </p>
        </motion.div>

        {/* Bottom Columns: Spiritual & Attributes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="w-8 h-px bg-museum-accent hidden md:block"></div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-museum-accent font-semibold">Spiritual Guardians</h3>
            </div>
            <p className="text-gray-700 dark:text-museum-light/80 text-sm md:text-base leading-relaxed text-justify md:text-left">
              {HISTORY_INFO.spiritual}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 bg-museum-accent/5 dark:bg-museum-accent/5 border border-museum-accent/10 rounded-2xl p-8 text-center md:text-left"
          >
            <h3 className="text-xs tracking-[0.2em] uppercase text-museum-accent font-semibold mb-4 text-center md:text-left">Physical Attributes</h3>
            <p className="text-sm text-gray-700 dark:text-museum-light/80 leading-relaxed text-justify md:text-left">
              {HISTORY_INFO.attributes}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <a 
            href="#exhibition" 
            className="inline-flex items-center space-x-3 bg-transparent border border-black/30 dark:border-museum-light/30 text-museum-dark dark:text-museum-light rounded-full px-8 py-4 text-xs tracking-[0.15em] uppercase hover:border-museum-accent dark:hover:border-museum-accent hover:text-museum-accent dark:hover:text-museum-accent transition-all duration-300"
          >
            <span>Enter Virtual Tour</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </section>

      {/* Exhibition / Virtual Tour Section */}
      <main id="exhibition" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Virtual Exhibition</h2>
          <p className="text-gray-600 dark:text-museum-muted max-w-2xl text-sm md:text-base leading-relaxed">
            Step fully into the past. Explore our interactive 3D environment and discover the remnants of the ancient city of Balasagun right from your browser.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-black/5 dark:bg-white/5"
        >
          {/* 3D Exhibition embed */}
          <iframe 
            allowFullScreen={true} 
            title="virtual exhibition" 
            frameBorder="0" 
            scrolling="no" 
            src="https://art.kunstmatrix.com/apps/artspaces/?external=true&language=en&uid=143626&exhibition=15423381" 
            width="100%" 
            height="600"
            className="w-full"
          ></iframe>
        </motion.div>
      </main>

      {/* References Section */}
      <section id="references" className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-black/5 dark:border-white/5 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs tracking-[0.2em] uppercase text-museum-accent mb-12 text-center">References & Credits</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-sm md:text-base text-gray-600 dark:text-museum-muted leading-relaxed">
            <div>
              <p className="font-serif text-xl md:text-2xl text-museum-dark dark:text-museum-light mb-2">Kubatbek Shakievich Tabaldiev</p>
              <p>Candidate of History science, Archeologist,</p>
              <p>Associate Professor, Kyrgyz-Turkish "Manas" University</p>
              <p className="mt-2 tracking-widest"><a href="mailto:tarishah@freenet.kg" className="hover:text-museum-accent transition-colors">tarishah@freenet.kg</a></p>
            </div>
            <div>
              <p className="font-serif text-xl md:text-2xl text-museum-dark dark:text-museum-light mb-2">Tokombaeva Tolgonay Kedeykhanovna</p>
              <p>Director of the Republic Archaeological and Architectural Museum at Burana Tower</p>
              <p className="mt-2">Tel: (0-3138) 7-31-18</p>
              <p className="tracking-widest"><a href="mailto:burana@freenet.kg" className="hover:text-museum-accent transition-colors">burana@freenet.kg</a></p>
            </div>
          </div>
          <div className="pt-8 border-t border-black/10 dark:border-white/10 space-y-3 text-sm text-gray-600 dark:text-museum-muted text-center max-w-2xl mx-auto">
            <p><strong>Translated by:</strong> Madeleine Reeves, American University - Central Asia.</p>
            <p><strong>Photos and Graphic works:</strong> Executed by Tabaldiev K. Sh.</p>
            <p><strong>Design:</strong> Omurbekov. T</p>
            <p className="mt-6 pt-4 border-t border-black/5 dark:border-white/5">
              <strong>Article Source:</strong>{" "}
              <a href="https://central-asia.guide/central-asia-guide/balbal-stone-statue/" target="_blank" rel="noopener noreferrer" className="hover:text-museum-accent transition-colors underline decoration-black/20 dark:decoration-white/20 underline-offset-4">
                Central Asia Guide - Balbal Stone Statue
              </a>
            </p>
          </div>
        </motion.div>
      </section>

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
              href="https://www.instagram.com/burana.museum?igsh=MXR6d211czVidzR0cw=="
              target="_blank"
              rel="noopener noreferrer"
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
    </div>
  );
}
