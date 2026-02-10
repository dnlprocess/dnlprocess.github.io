import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const { data: projects = [] } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => base44.entities.Project.filter({ slug }),
    enabled: !!slug,
  });

  const project = projects[0];

  const { data: photos = [], isLoading: photosLoading } = useQuery({
    queryKey: ['project-photos', project?.title],
    queryFn: () => base44.entities.Photo.filter({ project: project?.title }, 'order', 50),
    enabled: !!project?.title,
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-16 px-6 lg:px-16 pb-24">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Link 
          to={createPageUrl('Projects')}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors uppercase"
        >
          <ArrowLeft size={14} strokeWidth={1} />
          Back to Projects
        </Link>
      </motion.div>

      {/* Project Header */}
      <div className="mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[11px] tracking-[0.3em] text-[#1a1a1a] uppercase mb-3"
        >
          {project.title}
        </motion.h1>
        
        {project.year && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[10px] tracking-[0.2em] text-[#8a8a8a] uppercase mb-6"
          >
            {project.year}
          </motion.p>
        )}

        {project.description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-[#5a5a5a] leading-relaxed max-w-2xl"
          >
            {project.description}
          </motion.p>
        )}
      </div>

      {/* Photos Grid */}
      {photosLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-[4/5] bg-[#e8e8e6] animate-pulse"
            />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">
            No photographs in this project yet
          </p>
        </div>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}