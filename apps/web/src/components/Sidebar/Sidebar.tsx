'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

/**
 * Navigation Item structure
 */
interface NavItem {
  label: string;
  href: string;
  icon?: string; // We'll use emojis or simple strings for now
}

/**
 * SIDEBAR COMPONENT
 * 
 * This component provides the primary navigation for the Universal Action Workspace.
 * It is designed with a persistent, glassmorphic layout optimized for web screens.
 * 
 * Features:
 * - Route-aware active states using next/navigation
 * - Glassmorphism design pattern via global CSS and local modules
 * - Responsive transitions
 */
export default function Sidebar() {
  const pathname = usePathname();

  // Navigation configuration
  const navItems: NavItem[] = [
    { label: 'Templates', href: '/', icon: '⚡' },
    { label: 'Workspace', href: '/workspace', icon: '🛠️' },
    { label: 'Activity', href: '/activity', icon: '📊' },
    { label: 'Modules', href: '/modules', icon: '🧩' },
  ];

  return (
    <aside className={`${styles.sidebar} glass`}>
      {/* Branding Section */}
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>Universal Action</h1>
      </div>

      {/* Primary Navigation */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile Section */}
      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>JD</div>
          <div className={styles.userName}>John Doe</div>
        </div>
      </div>
    </aside>
  );
}
