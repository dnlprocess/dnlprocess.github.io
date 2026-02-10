import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Mail, Instagram, MapPin } from 'lucide-react';

export default function Info() {
  const { data: settings = [] } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => base44.entities.SiteSettings.list('-created_date', 1),
  });

  const siteSettings = settings[0] || {};

  return (
    <div className="min-h-screen pt-24 lg:pt-16 px-6 lg:px-16 pb-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[11px] tracking-[0.3em] text-[#8a8a8a] uppercase mb-16"
      >
        Info
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-[11px] tracking-[0.2em] text-[#1a1a1a] uppercase mb-6">
            About
          </h2>
          
          <div className="text-sm text-[#3a3a3a] leading-relaxed space-y-4">
            {siteSettings.bio ? (
              siteSettings.bio.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p className="text-[#8a8a8a]">
                My name is Daniel Lipshitz, and I am currently a senior visiting student studying Math at Columbia University. My interests lie in Mathematical Physics and Enumerative Geometry.
                Outside of math, I enjoy hiking/photography and cooking, and when I can, I trade the chalkboard and psets for climbing chalk and bouldering problems.
                On this site, you’ll find my photography, mathematical writings, and general musings.
              </p>
            )}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-[11px] tracking-[0.2em] text-[#1a1a1a] uppercase mb-6">
            Contact
          </h2>
          
          <div className="space-y-4">
            {siteSettings.email && (
              <a 
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-3 text-sm text-[#3a3a3a] hover:text-[#1a1a1a] transition-colors group"
              >
                <Mail size={16} strokeWidth={1.5} className="text-[#8a8a8a] group-hover:text-[#1a1a1a] transition-colors" />
                {siteSettings.email}
              </a>
            )}
            
            {siteSettings.instagram && (
              <a 
                href={`https://instagram.com/${siteSettings.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#3a3a3a] hover:text-[#1a1a1a] transition-colors group"
              >
                <Instagram size={16} strokeWidth={1.5} className="text-[#8a8a8a] group-hover:text-[#1a1a1a] transition-colors" />
                {siteSettings.instagram}
              </a>
            )}
            
            {siteSettings.location && (
              <div className="flex items-center gap-3 text-sm text-[#5a5a5a]">
                <MapPin size={16} strokeWidth={1.5} className="text-[#8a8a8a]" />
                {siteSettings.location}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="mt-12 pt-8 border-t border-[#e0e0de]">
            <h3 className="text-[10px] tracking-[0.2em] text-[#8a8a8a] uppercase mb-3">
              Email
            </h3>
            <p className="text-sm text-[#3a3a3a]">
              Feel free to email me: daniel [at] lipshitz [dot] com
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-32 pt-8 border-t border-[#e0e0de]"
      >
        <p className="text-[10px] tracking-[0.15em] text-[#8a8a8a]">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
}