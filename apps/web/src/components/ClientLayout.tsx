'use client';

import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";
import EngagementDrawer from "@/components/EngagementDrawer";
import CapabilitySelector from "@/components/CapabilitySelector";
import UploadWizard from "@/components/UploadWizard";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isUploadWizardOpen, setIsUploadWizardOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Global Navigation */}
      <Sidebar onCreateClick={() => setIsLauncherOpen(true)} />

      {/* Main Content Area */}
      <main style={{ 
        marginLeft: 'var(--sidebar-width)', 
        flex: 1,
        padding: '2rem',
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent)'
      }}>
        {/* Global Header for Capabilities & Engagement */}
        <Header onOpenEngagement={() => setIsDrawerOpen(true)} />
        
        {children}
      </main>

      {/* Global Contextual Engagement */}
      <EngagementDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Central Capability Hub */}
      <CapabilitySelector 
        isOpen={isLauncherOpen} 
        onClose={() => setIsLauncherOpen(false)} 
        onSelectUpload={() => {
          setIsLauncherOpen(false);
          setIsUploadWizardOpen(true);
        }}
      />

      {/* Resource Upload Flow */}
      <UploadWizard isOpen={isUploadWizardOpen} onClose={() => setIsUploadWizardOpen(false)} />
    </div>
  );
}
