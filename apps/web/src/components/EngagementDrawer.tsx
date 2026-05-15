'use client';

import React, { useState } from 'react';

export default function EngagementDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '400px',
      height: '100vh',
      background: 'rgba(30, 41, 59, 0.95)',
      backdropFilter: 'blur(10px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Engagement</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>
          ×
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
          <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Comments</span>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer' }}>Logs</span>
        </div>

        {/* Mock Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#6366f1', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>U{i}</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>User {i}</span>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>2h ago</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                This is a mock comment about the current capability being used. Great flow!
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <input 
          type="text" 
          placeholder="Add a comment..." 
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: 'white',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}
