'use client';

import React, { useState, useEffect } from 'react';

type Step = 'SELECT' | 'META' | 'UPLOADING' | 'SUCCESS';

export default function UploadWizard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState<Step>('SELECT');
  const [progress, setProgress] = useState(0);

  // Simulate upload progress when in UPLOADING step
  useEffect(() => {
    if (step === 'UPLOADING') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('SUCCESS'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleFileSelect = () => setStep('META');
  const handleStartUpload = () => setStep('UPLOADING');
  const handleReset = () => {
    setStep('SELECT');
    setProgress(0);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(16px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative'
      }}>
        <button 
          onClick={handleReset}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}
        >×</button>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{
            step === 'SELECT' ? 'Upload Resource' :
            step === 'META' ? 'Add Details' :
            step === 'UPLOADING' ? 'Processing...' : 'Upload Complete'
          }</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Step {step === 'SELECT' ? '1' : step === 'META' ? '2' : step === 'UPLOADING' ? '3' : '4'} of 4</p>
        </div>

        {/* Content Area */}
        <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
          
          {step === 'SELECT' && (
            <div 
              onClick={handleFileSelect}
              style={{
                flex: 1,
                border: '2px dashed rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '3rem' }}>☁️</span>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 600 }}>Drag & Drop or Click</p>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>MP4, PDF, PNG or CSV (Max 50MB)</p>
              </div>
            </div>
          )}

          {step === 'META' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Title</label>
                <input type="text" placeholder="e.g., Q3 Financial Report" style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Description</label>
                <textarea rows={4} placeholder="Briefly describe this resource..." style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }} />
              </div>
              <button 
                onClick={handleStartUpload}
                style={{ marginTop: '1rem', padding: '1rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                Start Upload
              </button>
            </div>
          )}

          {step === 'UPLOADING' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#6366f1', transition: 'width 0.1s linear', boxShadow: '0 0 10px #6366f1' }}></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{progress}%</p>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Encrypting and optimizing data...</p>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 211, 238, 0.1)', border: '2px solid #22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                ✅
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Resource Ready</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Your file is now available in the Workspace.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <button onClick={handleReset} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Close</button>
                <button style={{ flex: 1, padding: '0.75rem', background: '#6366f1', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Go to Workspace</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
