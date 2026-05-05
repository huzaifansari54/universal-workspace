'use client';

import React, { useState } from 'react';

/**
 * MODULES PAGE
 * 
 * Manage external integrations, OAuth credentials, and local tool settings.
 * Using mock data for frontend testing.
 */
export default function ModulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI', 'Social', 'Storage', 'Utility'];

  const modules = [
    { id: 'm1', name: 'OpenAI', description: 'Advanced text and image generation models for content automation.', category: 'AI', connected: true, icon: '🤖', lastUsed: '10m ago' },
    { id: 'm2', name: 'Discord', description: 'Real-time communication and webhook distribution for alerts.', category: 'Social', connected: true, icon: '👾', lastUsed: '2h ago' },
    { id: 'm3', name: 'Slack', description: 'Enterprise messaging and team coordination for work flows.', category: 'Social', connected: false, icon: '💬', lastUsed: 'Never' },
    { id: 'm4', name: 'FFmpeg', description: 'Powerful media processing, transcoding and optimization.', category: 'Utility', connected: true, icon: '🗜️', lastUsed: 'Yesterday' },
    { id: 'm5', name: 'AWS S3', description: 'Secure and scalable cloud object storage for assets.', category: 'Storage', connected: false, icon: '☁️', lastUsed: 'Never' },
    { id: 'm6', name: 'Google Drive', description: 'Cloud file storage and synchronization for documents.', category: 'Storage', connected: false, icon: '📂', lastUsed: 'Never' },
  ];

  const filteredModules = modules.filter(mod => {
    const matchesSearch = mod.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || mod.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-outfit)', marginBottom: '0.5rem' }}>Integrations Center</h1>
          <p style={{ color: '#94a3b8' }}>Connect and configure the tools that power your automated actions.</p>
        </div>
      </header>

      {/* FILTERS & SEARCH */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ 
                padding: '0.5rem 1.25rem', 
                borderRadius: '20px', 
                border: activeCategory === cat ? '1px solid var(--accent-primary)' : '1px solid var(--border)', 
                background: activeCategory === cat ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                color: activeCategory === cat ? 'var(--accent-primary)' : '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 3rem', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border)', 
              borderRadius: '12px',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filteredModules.map((mod) => (
          <div key={mod.id} className="glass glow-hover fade-in" style={{ 
            padding: '1.5rem', 
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            position: 'relative',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '14px', 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)'
              }}>
                {mod.icon}
              </div>
              <div style={{ 
                padding: '0.35rem 0.75rem', 
                borderRadius: '20px', 
                fontSize: '0.75rem', 
                fontWeight: 700,
                background: mod.connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                color: mod.connected ? '#10b981' : '#64748b',
                border: `1px solid ${mod.connected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: mod.connected ? '#10b981' : '#64748b' }} />
                {mod.connected ? 'Connected' : 'Disconnected'}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{mod.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', height: '3rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {mod.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Category</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>{mod.category}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Last Used</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{mod.lastUsed}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ 
                flex: 1, 
                padding: '0.8rem', 
                borderRadius: '12px', 
                border: 'none', 
                background: mod.connected ? 'rgba(255,255,255,0.05)' : 'var(--accent-primary)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer'
              }} className="glow-hover">
                {mod.connected ? 'Configure' : 'Connect Now'}
              </button>
              {mod.connected && (
                <button style={{ 
                  width: '45px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(239, 68, 68, 0.2)', 
                  background: 'transparent',
                  color: '#ef4444',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}>
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Suggest Module Card */}
        <div style={{ 
          padding: '2rem', 
          borderRadius: '20px',
          border: '2px dashed var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.01)'
        }} className="glow-hover">
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#64748b' }}>+</div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Request New Module</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>We're constantly adding new integrations.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
