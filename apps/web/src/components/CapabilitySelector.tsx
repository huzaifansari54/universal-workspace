'use client';

import React from 'react';

interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Content' | 'Account' | 'Social';
}

const capabilities: Capability[] = [
  { id: 'upload', title: 'Upload Resource', description: 'Add videos, docs, or data', icon: '📤', category: 'Content' },
  { id: 'new-action', title: 'New Action', description: 'Build a manual workflow', icon: '🛠️', category: 'Content' },
  { id: 'profile', title: 'Manage Profile', description: 'Edit your avatar and info', icon: '👤', category: 'Account' },
  { id: 'channel', title: 'Create Channel', description: 'Setup shared workspace', icon: '🌐', category: 'Account' },
  { id: 'comments', title: 'Engagement Feed', description: 'Read and reply to comments', icon: '💬', category: 'Social' },
  { id: 'settings', title: 'Settings', description: 'Configure app preferences', icon: '⚙️', category: 'Account' },
];

interface CapabilitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUpload?: () => void;
}

export default function CapabilitySelector({ isOpen, onClose, onSelectUpload }: CapabilitySelectorProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '900px',
        background: 'rgba(30, 41, 59, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'scaleUp 0.3s ease-out',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Select Capability</h2>
          <p style={{ color: '#94a3b8' }}>Choose what you want to achieve today</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {capabilities.map((cap) => (
            <div 
              key={cap.id}
              onClick={() => { 
                if (cap.id === 'upload' && onSelectUpload) {
                  onSelectUpload();
                } else {
                  alert(`Triggering: ${cap.title}`); 
                  onClose(); 
                }
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>{cap.icon}</span>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{cap.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{cap.description}</p>
              </div>
              <div style={{
                marginTop: 'auto',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: cap.category === 'Content' ? '#6366f1' : cap.category === 'Account' ? '#22d3ee' : '#f43f5e',
                fontWeight: 700
              }}>
                {cap.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
