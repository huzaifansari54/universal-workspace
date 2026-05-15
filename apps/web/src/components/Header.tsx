'use client';

import React from 'react';

interface HeaderProps {
  onOpenEngagement?: () => void;
}

export default function Header({ onOpenEngagement }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Capability Search */}
      <div style={{ position: 'relative', width: '400px' }}>
        <input 
          type="text" 
          placeholder="Search capabilities (e.g., Upload, Comments)..." 
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
          🔍
        </span>
      </div>

      {/* Engagement & Actions */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button 
          onClick={onOpenEngagement}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }} 
          title="Comments"
        >
          💬
        </button>
        <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }} title="Notifications">
          🔔
        </button>
        <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
        <button style={{ 
          background: 'rgba(99, 102, 241, 0.1)', 
          border: '1px solid rgba(99, 102, 241, 0.2)', 
          color: '#6366f1', 
          padding: '0.5rem 1rem', 
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Live Activity
        </button>
      </div>
    </header>
  );
}
