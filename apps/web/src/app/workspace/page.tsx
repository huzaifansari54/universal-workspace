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
    { id: 'w-2', name: 'OpenAI Summary', icon: '🤖', type: 'module', status: 'pending', config: { action: 'summarize' } },
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Full Library Data
  const library = {
    resources: [
      { id: 'res-1', name: 'Local File', icon: '📄', type: 'resource' },
      { id: 'res-2', name: 'Web URL', icon: '🔗', type: 'resource' },
      { id: 'res-3', name: 'YouTube Video', icon: '📺', type: 'resource' },
      { id: 'res-4', name: 'S3 Bucket', icon: '☁️', type: 'resource' },
    ],
    modules: [
      { id: 'mod-1', name: 'OpenAI Module', icon: '🤖', type: 'module' },
      { id: 'mod-2', name: 'YouTube Module', icon: '📺', type: 'module' },
      { id: 'mod-3', name: 'FFmpeg Compress', icon: '🗜️', type: 'module' },
      { id: 'mod-4', name: 'Discord Webhook', icon: '👾', type: 'module' },
      { id: 'mod-5', name: 'Slack Message', icon: '💬', type: 'module' },
    ]
  };

  const handleRunFlow = () => {
    setIsRunning(true);
    setShowResults(false);
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

      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <nav style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem', display: 'flex', gap: '0.5rem' }}>
            <span>Workspace</span>
            <span>/</span>
            <span style={{ color: 'var(--accent-secondary)' }}>Untitled Action</span>
          </nav>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Action Builder</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => { setWorkflowNodes([]); setSelectedNodeId(null); }}
            style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'transparent', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
          >Reset</button>
          <button
            onClick={handleRunFlow}
            disabled={isRunning || workflowNodes.length === 0}
            style={{ padding: '0.6rem 1.5rem', borderRadius: '10px', background: isRunning || workflowNodes.length === 0 ? '#1e293b' : 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}
          >
            {isRunning ? 'Executing...' : '▶ Run Flow'}
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>

        {/* COLUMN 1: LIBRARY */}
        <aside className="glass" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
          <section>
            <h3 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>RESOURCES</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {library.resources.map(item => (
                <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--border)' }}>
                  <span>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>MODULES</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {library.modules.map(item => (
                <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--border)' }}>
                  <span>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
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
          style={{ borderRadius: '16px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', overflowY: 'auto' }}
        >
          {workflowNodes.length === 0 && !isDraggingOver && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🎯</div>
              <p style={{ maxWidth: '250px', fontSize: '0.9rem' }}>Drag items here to start building.</p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            {workflowNodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ width: '300px', padding: '1.25rem', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', border: selectedNodeId === node.id ? '2px solid var(--accent-primary)' : '1px solid var(--border)', background: 'rgba(30, 41, 59, 0.7)', transition: 'all 0.3s' }}
                >
                  <button onClick={(e) => handleRemoveNode(e, node.id)} style={{ position: 'absolute', top: '-10px', right: '-10px', width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>✕</button>
                  <span style={{ fontSize: '1.6rem' }}>{node.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{node.name}</h4>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{node.status}</span>
                  </div>
                </div>
                {index < workflowNodes.length - 1 && <div style={{ width: '2px', height: '2rem', background: 'var(--accent-primary)', opacity: 0.4 }} />}
              </React.Fragment>
            ))}
          </div>

          {/* RESULTS OVERLAY */}
          {showResults && (
            <div className="glass fade-in" style={{ position: 'absolute', bottom: '2rem', width: '400px', padding: '1.5rem', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--accent-secondary)', zIndex: 100 }}>
              <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>✅ Execution Successful</h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>Generated Asset: Action_Result.pdf (240 KB)</p>
              <button onClick={() => setShowResults(false)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--accent-primary)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Download Result</button>
            </div>
          )}
        </main>

        {/* COLUMN 3: PROPERTIES */}
        <aside className="glass" style={{ padding: '1.5rem', borderRadius: '16px', overflowY: 'auto' }}>
          {selectedNode ? (
            <div className="fade-in">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>⚙️ Properties</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>NODE LABEL</label>
                <input 
                  value={selectedNode.name} 
                  onChange={(e) => updateNodeConfig(selectedNode.id, { name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  {selectedNode.type === 'resource' ? 'SOURCE CONFIG' : 'MODULE ACTION'}
                </label>
                {selectedNode.type === 'resource' ? (
                  <input placeholder="Enter URL or Path" defaultValue={selectedNode.config?.url} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white' }} />
                ) : (
                  <>
                    <select 
                      value={selectedNode.config?.action || ''}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { 
                        config: { ...selectedNode.config, action: e.target.value },
                        name: `${selectedNode.name.split(':')[0]}: ${e.target.selectedOptions[0].text}`
                      })}
                      style={{ width: '100%', padding: '0.75rem', background: '#1e293b', border: '1px solid var(--accent-primary)', borderRadius: '10px', color: 'white' }}
                    >
                      <option value="" disabled>Select Functionality...</option>
                      {selectedNode.name.toLowerCase().includes('youtube') ? (
                        <>
                          <option value="upload">Upload Video</option>
                          <option value="comment">Add Comment</option>
                          <option value="stats">Get Stats</option>
                        </>
                      ) : selectedNode.name.toLowerCase().includes('openai') ? (
                        <>
                          <option value="summarize">Summarize Text</option>
                          <option value="generate">Generate Image</option>
                        </>
                      ) : (
                        <>
                          <option value="standard">Standard Processing</option>
                          <option value="batch">Batch Run</option>
                        </>
                      )}
                    </select>

                    {/* Action-Specific UI */}
                    {selectedNode.config?.action === 'comment' && (
                      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="fade-in">
                        <input placeholder="Video URL" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
                        <textarea placeholder="Message" rows={3} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
                      </div>
                    )}

                    {selectedNode.config?.action === 'upload' && (
                      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="fade-in">
                        <div style={{ padding: '1rem', border: '1px dashed #64748b', borderRadius: '8px', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>Drop Video File Here</div>
                        <input placeholder="Video Title" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed rgba(99, 102, 241, 0.2)' }}>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
                  <strong>Status:</strong> {selectedNode.status.toUpperCase()}<br />
                  Configure the action above to prepare this module.
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button onClick={() => setSelectedNodeId(null)} style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: 'var(--accent-primary)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Done</button>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#64748b', gap: '1rem' }}>
              <div style={{ fontSize: '3rem', opacity: 0.2 }}>🔍</div>
              <p style={{ fontSize: '0.9rem' }}>Select a node to configure properties.</p>
            </div>
          )}
        </aside>
      </div>

      <style jsx>{`
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
