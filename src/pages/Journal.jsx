import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function Journal() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date', 20),
  });

  return (
    <div className="min-h-screen pt-24 lg:pt-16 px-6 lg:px-16 pb-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[11px] tracking-[0.3em] text-[#8a8a8a] uppercase mb-16"
      >
        Journal
      </motion.h1>

      {isLoading ? (
        <div className="space-y-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[16/10] bg-[#e8e8e6] animate-pulse" />
              <div className="space-y-4">
                <div className="h-3 w-16 bg-[#e8e8e6] animate-pulse" />
                <div className="h-4 w-48 bg-[#e8e8e6] animate-pulse" />
                <div className="h-3 w-full bg-[#e8e8e6] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">
            No journal entries yet
          </p>
        </div>
      ) : (
        <div className="space-y-20">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                to={createPageUrl(`JournalPost?slug=${post.slug}`)}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                {post.cover_image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                )}
                
                <div className={post.cover_image ? '' : 'lg:col-span-2 max-w-2xl'}>
                  <span className="text-[10px] tracking-[0.2em] text-[#8a8a8a] uppercase">
                    {format(new Date(post.created_date), 'MMMM d, yyyy')}
                  </span>
                  
                  <h2 className="text-[13px] tracking-[0.1em] text-[#1a1a1a] mt-3 mb-4 group-hover:text-[#8a8a8a] transition-colors">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-sm text-[#5a5a5a] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <span className="inline-block mt-4 text-[10px] tracking-[0.2em] text-[#8a8a8a] uppercase group-hover:text-[#1a1a1a] transition-colors">
                    Read More →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}