import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { motion } from 'framer-motion';

export default function Home() {
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ['photos'],
    queryFn: () => base44.entities.Photo.list('order', 50),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 lg:pt-16 pb-12 px-6 lg:px-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[11px] tracking-[0.3em] text-[#8a8a8a] uppercase mb-4"
        >
          Selected Works
        </motion.h1>
      </section>

      {/* Photo Grid */}
      <section className="px-6 lg:px-16 pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] bg-[#e8e8e6] animate-pulse"
              />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">
              No photographs yet
            </p>
          </div>
        ) : (
          <PhotoGrid photos={photos} />
        )}
      </section>
    </div>
  );
}