'use client';

import React, { useState } from 'react';

/**
 * ACTIVITY PAGE
 * 
 * Displays the execution history and status of background actions.
 * Using mock data for frontend testing.
 */
export default function ActivityPage() {
  const [filter, setFilter] = useState('all');

  const activities = [
    { id: '1', name: 'Social Distribution', template: 'Post Video to All Socials', status: 'completed', progress: 100, time: '2 mins ago', duration: '45s' },
    { id: '2', name: 'Cloud Backup', template: 'Compress & Secure Archive', status: 'running', progress: 65, time: 'Just now', duration: '12m (est)' },
    { id: '3', name: 'AI Summary', template: 'AI Summary & Notify', status: 'failed', progress: 40, time: '15 mins ago', duration: '10s' },
    { id: '4', name: 'Format Conversion', template: 'Media Format Converter', status: 'completed', progress: 100, time: '1 hour ago', duration: '2m 15s' },
    { id: '5', name: 'YouTube Upload', template: 'Post Video to All Socials', status: 'completed', progress: 100, time: '3 hours ago', duration: '5m 30s' },
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'running': return '#3b82f6';
      case 'failed': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-outfit)', marginBottom: '0.5rem' }}>Activity Feed</h1>
          <p style={{ color: '#94a3b8' }}>Monitor and audit your automated action sequences.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {['all', 'running', 'completed', 'failed'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: filter === f ? 'var(--accent-primary)' : 'transparent',
                color: filter === f ? 'white' : '#94a3b8',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* SEARCH BAR */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
        <input 
          type="text" 
          placeholder="Search activity logs..." 
          style={{ 
            width: '100%', 
            padding: '1rem 1rem 1rem 3rem', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px',
            color: 'white',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
      </div>

      <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Action & Template</th>
              <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status Indicator</th>
              <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Completion</th>
              <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duration</th>
              <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Timeline</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((act) => (
              <tr key={act.id} className="glow-hover" style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>{act.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--accent-secondary)' }}>◈</span> {act.template}
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.6rem', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '20px', 
                    background: `${getStatusColor(act.status)}10`,
                    border: `1px solid ${getStatusColor(act.status)}30`,
                    color: getStatusColor(act.status),
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(act.status) }} />
                    {act.status}
                  </div>
                </td>
                <td style={{ padding: '1.5rem', minWidth: '180px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${act.progress}%`, 
                        height: '100%', 
                        background: act.status === 'failed' ? '#ef4444' : 'var(--accent-primary)',
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: act.status === 'running' ? '0 0 10px var(--accent-primary)' : 'none'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', width: '35px', fontFamily: 'monospace' }}>{act.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  {act.duration}
                </td>
                <td style={{ padding: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                  {act.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredActivities.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <p>No activity records found for this filter.</p>
        </div>
      )}
    </div>
  );
}
