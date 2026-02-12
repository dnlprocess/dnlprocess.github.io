import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function JournalPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => base44.entities.BlogPost.filter({ slug }),
    enabled: !!slug,
  });

  const post = posts[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[#8a8a8a] text-sm tracking-[0.1em]">Post not found</p>
        <Link 
          to={createPageUrl('Journal')}
          className="text-[10px] tracking-[0.2em] text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors uppercase"
        >
          ← Back to Journal
        </Link>
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
          to={createPageUrl('Journal')}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors uppercase"
        >
          <ArrowLeft size={14} strokeWidth={1} />
          Back to Journal
        </Link>
      </motion.div>

      <article className="max-w-3xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-[10px] tracking-[0.2em] text-[#8a8a8a] uppercase">
            {format(new Date(post.created_date), 'MMMM d, yyyy')}
          </span>
          
          <h1 className="text-lg md:text-xl tracking-[0.05em] text-[#1a1a1a] mt-4 font-light">
            {post.title}
          </h1>
        </motion.header>

        {/* Cover Image */}
        {post.cover_image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-sm max-w-none
            prose-headings:font-normal prose-headings:tracking-wide
            prose-p:text-[#3a3a3a] prose-p:leading-relaxed prose-p:text-sm
            prose-a:text-[#1a1a1a] prose-a:underline prose-a:underline-offset-4
            prose-img:my-8
            prose-blockquote:border-l-[#d0d0d0] prose-blockquote:text-[#5a5a5a]
          "
        >
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{post.content}</ReactMarkdown>
        </motion.div>
      </article>
    </div>
  );
}