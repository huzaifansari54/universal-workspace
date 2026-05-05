'use client';

import React, { useState } from 'react';
import TemplateCard from '@/components/TemplateCard/TemplateCard';

/**
 * HOME PAGE (Templates Hub)
 * 
 * Entry point. Displays curated automation recipes.
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      title: 'Post Video to All Socials',
      description: 'Upload a single video and automatically distribute it to YouTube, TikTok, and Instagram Reels.',
      modules: ['YouTube', 'TikTok', 'Meta'],
      category: 'Social'
    },
    {
      title: 'Compress & Secure Archive',
      description: 'Reduce file size with FFmpeg and upload to a secure encrypted S3 cloud storage.',
      modules: ['FFmpeg', 'S3', 'Crypto'],
      category: 'Utility'
    },
    {
      title: 'AI Summary & Notify',
      description: 'Generate a text summary of a long document using GPT-4 and send it to Slack.',
      modules: ['OpenAI', 'Slack', 'Discord'],
      category: 'AI'
    },
    {
      title: 'Media Format Converter',
      description: 'Convert images or videos to modern web-optimized formats (WebP/WebM) instantly.',
      modules: ['FFmpeg', 'Sharp'],
      category: 'Media'
    },
  ];

  const filteredTemplates = templates.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <header style={{ 
        padding: '3rem 0', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            fontFamily: 'var(--font-outfit)',
            marginBottom: '0.75rem',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Templates Hub
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.6' }}>
            Choose a pre-built automation recipe to execute complex cross-platform workflows in seconds.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div style={{ position: 'relative', maxWidth: '500px' }}>
          <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search templates (e.g. 'Social', 'AI')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1rem 1.25rem 1rem 3.5rem', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s'
            }}
          />
        </div>
      </header>

      {/* Templates Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
        gap: '2rem' 
      }}>
        {filteredTemplates.map((template, index) => (
          <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <TemplateCard
              title={template.title}
              description={template.description}
              modules={template.modules}
              onClick={() => console.log(`Triggering: ${template.title}`)}
            />
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>
          <p style={{ fontSize: '1.2rem' }}>No templates found matching "{searchQuery}"</p>
          <button 
            onClick={() => setSearchQuery('')}
            style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '1rem', fontWeight: 600 }}
          >
            Clear Search
          </button>
        </div>
      )}

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
