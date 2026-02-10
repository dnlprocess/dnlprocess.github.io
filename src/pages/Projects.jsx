import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('order', 20),
  });

  return (
    <div className="min-h-screen pt-24 lg:pt-16 px-6 lg:px-16 pb-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[11px] tracking-[0.3em] text-[#8a8a8a] uppercase mb-16"
      >
        Projects
      </motion.h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/3] bg-[#e8e8e6] animate-pulse" />
              <div className="h-3 w-24 bg-[#e8e8e6] animate-pulse" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">
            No projects yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                to={createPageUrl(`ProjectDetail?slug=${project.slug}`)}
                className="group block"
              >
                <div className="relative overflow-hidden mb-4">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-[#e8e8e6]" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                
                <div className="flex items-baseline justify-between">
                  <h2 className="text-[11px] tracking-[0.2em] text-[#1a1a1a] uppercase group-hover:text-[#8a8a8a] transition-colors">
                    {project.title}
                  </h2>
                  {project.year && (
                    <span className="text-[10px] tracking-[0.15em] text-[#8a8a8a]">
                      {project.year}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}