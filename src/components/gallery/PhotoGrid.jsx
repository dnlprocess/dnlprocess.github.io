import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoGrid({ photos }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goNext = () => {
    if (selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };
  
  const goPrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      {/* Masonry-style Grid */}
      <div className="columns-1 md:columns-2 gap-4 md:gap-6 lg:gap-8 space-y-4 md:space-y-6 lg:space-y-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={24} strokeWidth={1} />
            </button>

            {/* Navigation Arrows */}
            {selectedIndex > 0 && (
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
              >
                <ChevronLeft size={40} strokeWidth={1} />
              </button>
            )}
            
            {selectedIndex < photos.length - 1 && (
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
              >
                <ChevronRight size={40} strokeWidth={1} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex]?.image_url}
                alt={photos[selectedIndex]?.title}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>

            {/* Photo Info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
                {photos[selectedIndex]?.title}
              </p>
              {photos[selectedIndex]?.location && (
                <p className="text-white/40 text-xs tracking-[0.15em] mt-1">
                  {photos[selectedIndex]?.location}
                </p>
              )}
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 right-6 text-white/40 text-xs tracking-[0.2em]">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}