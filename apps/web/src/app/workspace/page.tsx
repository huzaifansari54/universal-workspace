'use client';

import React, { useState, useRef } from 'react';

/**
 * WORKSPACE PAGE (Action Builder)
 * 
 * A 3-column interface for building custom actions.
 * - Left: Library (Resources & Modules)
 * - Center: Canvas (The Action Flow)
 * - Right: Configuration (Properties)
 */

interface WorkflowNode {
  id: string;
  name: string;
  icon: string;
  type: 'resource' | 'module';
  status: 'ready' | 'pending' | 'idle' | 'running';
  config?: Record<string, any>;
}

export default function WorkspacePage() {
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([
    { id: 'w-1', name: 'YouTube Video', icon: '📺', type: 'resource', status: 'ready', config: { url: 'https://youtube.com/watch?v=...' } },
    { id: 'w-2', name: 'OpenAI Summary', icon: '🤖', type: 'module', status: 'pending', config: { model: 'gpt-4', length: 'medium' } },
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

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

  const handleRunFlow = () => {
    setIsRunning(true);
    setShowResults(false);
    // Simulate flow execution
    setTimeout(() => {
      setWorkflowNodes(prev => prev.map(n => ({ ...n, status: 'running' })));
      setTimeout(() => {
        setWorkflowNodes(prev => prev.map(n => ({ ...n, status: 'ready' })));
        setIsRunning(false);
        setShowResults(true);
      }, 2000);
    }, 500);
  };

  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;

    const item = JSON.parse(data);
    const newNode: WorkflowNode = {
      id: `w-${Date.now()}`,
      name: item.name,
      icon: item.icon,
      type: item.type,
      status: 'idle',
      config: {}
    };

    setWorkflowNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const handleRemoveNode = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWorkflowNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const updateNodeConfig = (id: string, updates: Partial<WorkflowNode>) => {
    setWorkflowNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const selectedNode = workflowNodes.find(n => n.id === selectedNodeId);

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
            onClick={() => {
              setWorkflowNodes([]);
              setSelectedNodeId(null);
            }}
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
            disabled={isRunning || workflowNodes.length === 0}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: isRunning || workflowNodes.length === 0 ? '#1e293b' : 'var(--accent-primary)',
              color: isRunning || workflowNodes.length === 0 ? '#64748b' : 'white',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            className={!isRunning && workflowNodes.length > 0 ? "glow-hover animate-pulse-glow" : ""}
          >
            {isRunning ? (
              <>
                <span className="spinner"></span> Executing...
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
                <div 
                  key={item.id} 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="glow-hover" 
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    cursor: 'grab',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    border: '1px solid var(--border)',
                    transition: 'transform 0.2s'
                  }}
                >
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
                <div 
                  key={item.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="glow-hover" 
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    cursor: 'grab',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    border: '1px solid var(--border)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* COLUMN 2: CANVAS */}
        <main 
          className={`glass ${isDraggingOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          style={{
            borderRadius: '16px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            overflowY: 'auto',
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
            transition: 'all 0.3s'
          }}
        >
          {workflowNodes.length === 0 && !isDraggingOver && (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#475569',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🎯</div>
              <p style={{ maxWidth: '250px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Drag resources or modules from the library to start building your action flow.
              </p>
            </div>
          )}

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
                  onClick={() => setSelectedNodeId(node.id)}
                  className="glass glow-hover"
                  style={{
                    width: '300px',
                    padding: '1.25rem',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                    border: selectedNodeId === node.id ? '2px solid var(--accent-primary)' : '1px solid var(--border)',
                    boxShadow: selectedNodeId === node.id ? '0 0 25px rgba(99, 102, 241, 0.2)' : 'none',
                    transform: selectedNodeId === node.id ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Remove Button */}
                  <button 
                    onClick={(e) => handleRemoveNode(e, node.id)}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s'
                    }}
                    className="remove-btn"
                  >
                    ✕
                  </button>

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
                        background: node.status === 'ready' ? '#10b981' : node.status === 'pending' ? '#f59e0b' : node.status === 'running' ? 'var(--accent-secondary)' : '#64748b'
                      }} className={node.status === 'running' ? 'spinner' : ''} />
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
          </div>

          {/* RESULTS OVERLAY */}
          {showResults && (
            <div className="glass fade-in" style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              padding: '1.5rem',
              borderRadius: '20px',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid var(--accent-secondary)',
              boxShadow: '0 10px 50px rgba(0,0,0,0.5)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>✅ Execution Successful</h3>
                <button onClick={() => setShowResults(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>✕</button>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>All steps in your action flow have been completed. The following assets were generated:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Action_Result.pdf</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>240 KB • Document</div>
                    </div>
                  </div>
                  <button style={{ color: 'var(--accent-secondary)', background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Download</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => setShowResults(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'transparent', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>Close</button>
                <button style={{ flex: 1.5, padding: '0.75rem', borderRadius: '10px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>View in Activity</button>
              </div>
            </div>
          )}
        </main>

        {/* COLUMN 3: PROPERTIES */}
        <aside className="glass" style={{
          padding: '1.5rem',
          borderRadius: '16px',
          overflowY: 'auto'
        }}>
          {selectedNode ? (
            <div className="fade-in" key={selectedNode.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.5rem' }}>⚙️</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Properties</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Label</label>
                  <input
                    type="text"
                    value={selectedNode.name}
                    onChange={(e) => updateNodeConfig(selectedNode.id, { name: e.target.value })}
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
                  <label style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                    {selectedNode.type === 'resource' ? 'Source Config' : 'Module Config'}
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedNode.type === 'resource' ? (
                      <input 
                        placeholder="Enter URL or Path"
                        defaultValue={selectedNode.config?.url}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          padding: '0.6rem',
                          color: '#94a3b8',
                          fontSize: '0.85rem'
                        }}
                      />
                    ) : (
                      <>
                        <select style={{
                          width: '100%',
                          background: '#1e293b',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          padding: '0.6rem',
                          color: 'white',
                          fontSize: '0.85rem'
                        }}>
                          <option>Standard Processing</option>
                          <option>High Priority</option>
                          <option>Batch Mode</option>
                        </select>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input type="checkbox" id="notify" defaultChecked />
                          <label htmlFor="notify" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Notify on completion</label>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed rgba(99, 102, 241, 0.2)' }}>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
                    <strong>Status:</strong> {selectedNode.status.toUpperCase()}
                    <br />
                    This {selectedNode.type} is ready for inclusion in the action flow.
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <button 
                    onClick={() => setSelectedNodeId(null)}
                    style={{
                      width: '100%',
                      background: 'var(--accent-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }} className="glow-hover">
                    Done
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
        .glass:hover .remove-btn {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
