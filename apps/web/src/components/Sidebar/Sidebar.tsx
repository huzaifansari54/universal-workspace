'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  onCreateClick?: () => void;
}

export default function Sidebar({ onCreateClick }: SidebarProps) {
  const pathname = usePathname();

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

      {/* Global Quick Actions Trigger */}
      <div className={styles.quickActionContainer}>
        <button className={styles.createButton} onClick={onCreateClick}>
          <span className={styles.createIcon}>+</span>
          <span className={styles.createText}>Create</span>
        </button>
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
