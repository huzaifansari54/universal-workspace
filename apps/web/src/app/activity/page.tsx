'use client';

import React, { useState, useEffect } from 'react';

/**
 * ACTIVITY PAGE
 * 
 * Displays the execution history and status of background actions.
 * Using mock data for frontend testing.
 */

interface Activity {
  id: string;
  name: string;
  template: string;
  status: 'completed' | 'running' | 'failed';
  progress: number;
  time: string;
  duration: string;
  details?: string;
  outputs?: { type: 'file' | 'text'; name: string; content?: string; size?: string }[];
}

export default function ActivityPage() {
  const [filter, setFilter] = useState('all');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([
    { 
      id: '1', 
      name: 'Social Distribution', 
      template: 'Post Video to All Socials', 
      status: 'completed', 
      progress: 100, 
      time: '2 mins ago', 
      duration: '45s', 
      details: 'All platforms (YouTube, TikTok, X) processed successfully.',
      outputs: [
        { type: 'file', name: 'social_clip_1.mp4', size: '12MB' },
        { type: 'file', name: 'social_clip_2.mp4', size: '15MB' }
      ]
    },
    { 
      id: '2', 
      name: 'Video Summary', 
      template: 'AI YouTube Summary', 
      status: 'completed', 
      progress: 100, 
      time: 'Just now', 
      duration: '1m 20s', 
      details: 'Successfully summarized YouTube video and converted to PDF.',
      outputs: [
        { type: 'text', name: 'AI Summary Preview', content: 'In this video, the creator explores the future of agentic AI and how it will transform software development...' },
        { type: 'file', name: 'Video_Summary.pdf', size: '240KB' }
      ]
    },
    { id: '3', name: 'AI Summary', template: 'AI Summary & Notify', status: 'failed', progress: 40, time: '15 mins ago', duration: '10s', details: 'Error: API Rate limit exceeded on OpenAI service.' },
    { id: '4', name: 'Format Conversion', template: 'Media Format Converter', status: 'completed', progress: 100, time: '1 hour ago', duration: '2m 15s', details: 'Transcoded MOV to MP4 (H.264).' },
  ]);

  // Simulate progress for the "running" activity
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => prev.map(a => {
        if (a.status === 'running' && a.progress < 95) {
          return { ...a, progress: a.progress + 1 };
        }
        return a;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleRerun = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActivities(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'running', progress: 0, time: 'Just now' } : a
    ));
  };

  const selectedActivity = activities.find(a => a.id === selectedActivityId);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: selectedActivityId ? '1fr 350px' : '1fr', gap: '2rem', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</th>
                <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Completion</th>
                <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((act) => (
                <tr 
                  key={act.id} 
                  onClick={() => setSelectedActivityId(act.id === selectedActivityId ? null : act.id)}
                  className="glow-hover" 
                  style={{ 
                    borderBottom: '1px solid var(--border)', 
                    cursor: 'pointer',
                    background: selectedActivityId === act.id ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
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
                  <td style={{ padding: '1.5rem' }}>
                    <button 
                      onClick={(e) => handleRerun(e, act.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: '#94a3b8',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                      className="glow-hover"
                    >
                      {act.status === 'running' ? 'Cancel' : 'Rerun'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL SIDEBAR */}
      {selectedActivity && (
        <aside className="glass fade-in" style={{ borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '2rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Action Details</h3>
            <button onClick={() => setSelectedActivityId(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Execution Log</div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6', fontFamily: 'monospace' }}>
              {selectedActivity.details}
            </p>
          </div>

          {selectedActivity.outputs && selectedActivity.outputs.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Generated Assets</div>
              {selectedActivity.outputs.map((out, idx) => (
                <div key={idx} className="glass" style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{out.type === 'file' ? '📄' : '📝'}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{out.name}</span>
                    </div>
                    {out.type === 'file' && <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{out.size}</span>}
                  </div>
                  {out.type === 'text' && (
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                      {out.content}
                    </p>
                  )}
                  <button style={{ 
                    marginTop: '0.25rem',
                    width: '100%', 
                    padding: '0.5rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)', 
                    background: 'rgba(255,255,255,0.05)', 
                    color: 'var(--accent-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }} className="glow-hover">
                    {out.type === 'file' ? 'Download Asset' : 'Copy Text'}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Duration</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{selectedActivity.duration}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Started</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{selectedActivity.time}</div>
            </div>
          </div>

          <button 
            onClick={(e) => handleRerun(e, selectedActivity.id)}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'var(--accent-primary)',
              color: 'white',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            className="glow-hover"
          >
            {selectedActivity.status === 'running' ? 'Abort Process' : 'Restart Action'}
          </button>
        </aside>
      )}

      {filteredActivities.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <p>No activity records found for this filter.</p>
        </div>
      )}

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
