'use client';

import React, { useState } from 'react';

/**
 * WORKSPACE PAGE (Action Builder)
 * 
 * A 3-column interface for building custom actions.
 * - Left: Library (Resources & Modules)
 * - Center: Canvas (The Action Flow)
 * - Right: Configuration (Properties)
 */
// import React, { useState } from 'react';

/**
 * WORKSPACE PAGE (Action Builder)
 * 
 * A 3-column interface for building custom actions.
 * - Left: Library (Resources & Modules)
 * - Center: Canvas (The Action Flow)
 * - Right: Configuration (Properties)
 */
export default function WorkspacePage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Mock Library Data
  const library = {
    resources: [
      { id: 'res-1', name: 'Local File', icon: '📄', type: 'resource' },
      { id: 'res-2', name: 'Web URL', icon: '🔗', type: 'resource' },
      { id: 'res-3', name: 'YouTube Video', icon: '📺', type: 'resource' },
      { id: 'res-4', name: 'S3 Bucket', icon: '☁️', type: 'resource' },
    ],
    modules: [
      { id: 'mod-1', name: 'OpenAI Summary', icon: '🤖', type: 'module' },
      { id: 'mod-2', name: 'FFmpeg Compress', icon: '🗜️', type: 'module' },
      { id: 'mod-3', name: 'Discord Webhook', icon: '👾', type: 'module' },
      { id: 'mod-4', name: 'Slack Message', icon: '💬', type: 'module' },
    ]
  };

  // Mock Active Workflow
  const [workflowNodes] = useState([
    { id: 'w-1', name: 'YouTube Video', icon: '📺', type: 'resource', status: 'ready' },
    { id: 'w-2', name: 'OpenAI Summary', icon: '🤖', type: 'module', status: 'pending' },
    { id: 'w-3', name: 'Discord Webhook', icon: '👾', type: 'module', status: 'idle' },
  ]);

  const handleRunFlow = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

      {/* HEADER & BREADCRUMBS */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <nav style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem', display: 'flex', gap: '0.5rem' }}>
            <span>Workspace</span>
            <span>/</span>
            <span style={{ color: 'var(--accent-secondary)' }}>Untitled Action</span>
          </nav>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>Action Builder</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: '#94a3b8',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            className="glow-hover"
          >
            Reset
          </button>
          <button
            onClick={handleRunFlow}
            disabled={isRunning}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: isRunning ? '#64748b' : 'var(--accent-primary)',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            className="glow-hover"
          >
            {isRunning ? (
              <>
                <span className="spinner"></span> Running...
              </>
            ) : (
              <>▶ Run Flow</>
            )}
          </button>
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr 320px',
        gap: '1.5rem',
        flex: 1,
        overflow: 'hidden'
      }}>

        {/* COLUMN 1: LIBRARY */}
        <aside className="glass" style={{
          padding: '1.5rem',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          overflowY: 'auto'
        }}>
          <section>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.1em', marginBottom: '1rem' }}>Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {library.resources.map(item => (
                <div key={item.id} className="glow-hover" style={{
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.1em', marginBottom: '1rem' }}>Modules</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {library.modules.map(item => (
                <div key={item.id} className="glow-hover" style={{
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* COLUMN 2: CANVAS */}
        <main className="glass" style={{
          borderRadius: '16px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          overflowY: 'auto',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)'
        }}>
          {/* Action Nodes */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            paddingBottom: '4rem'
          }}>
            {workflowNodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node.id)}
                  className="glass glow-hover"
                  style={{
                    width: '300px',
                    padding: '1.25rem',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    border: selectedNode === node.id ? '2px solid var(--accent-primary)' : '1px solid var(--border)',
                    boxShadow: selectedNode === node.id ? '0 0 25px rgba(99, 102, 241, 0.2)' : 'none',
                    transform: selectedNode === node.id ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem'
                  }}>
                    {node.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{node.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: node.status === 'ready' ? '#10b981' : node.status === 'pending' ? '#f59e0b' : '#64748b'
                      }} />
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {node.status}
                      </span>
                    </div>
                  </div>
                </div>

                {index < workflowNodes.length - 1 && (
                  <div style={{
                    width: '2px',
                    height: '2rem',
                    background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
                    opacity: 0.4,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '8px',
                      height: '8px',
                      borderRight: '2px solid var(--accent-secondary)',
                      borderBottom: '2px solid var(--accent-secondary)',
                      opacity: 0.6
                    }} />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Add Node Placeholder */}
            <button style={{
              marginTop: '1rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px dashed var(--border)',
              background: 'transparent',
              color: '#64748b',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }} className="glow-hover">
              +
            </button>
          </div>
        </main>

        {/* COLUMN 3: PROPERTIES */}
        <aside className="glass" style={{
          padding: '1.5rem',
          borderRadius: '16px',
          overflowY: 'auto'
        }}>
          {selectedNode ? (
            <div className="fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.5rem' }}>⚙️</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Properties</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Label</label>
                  <input
                    type="text"
                    defaultValue={workflowNodes.find(n => n.id === selectedNode)?.name}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Input Source</label>
                  <select style={{
                    width: '100%',
                    background: '#1e293b',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    color: 'white',
                    outline: 'none',
                    appearance: 'none'
                  }}>
                    <option>Previous Node Output</option>
                    <option>Manual Trigger</option>
                    <option>External Webhook</option>
                  </select>
                </div>

                <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed rgba(99, 102, 241, 0.2)' }}>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
                    <strong>Tip:</strong> This module will process the data received from the preceding node in the sequence.
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <button style={{
                    width: '100%',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }} className="glow-hover">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#64748b', gap: '1rem' }}>
              <div style={{ fontSize: '3rem', opacity: 0.2 }}>🔍</div>
              <p style={{ fontSize: '0.9rem' }}>Select a node on the canvas to configure its properties.</p>
            </div>
          )}
        </aside>
      </div>

      <style jsx>{`
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
