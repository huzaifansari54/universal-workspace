'use client';

import React from 'react';
import styles from './TemplateCard.module.css';

/**
 * Props for the TemplateCard component
 */
interface TemplateCardProps {
  title: string;
  description: string;
  modules: string[]; // List of module symbols/icons
  onClick?: () => void;
}

/**
 * TEMPLATE CARD COMPONENT
 * 
 * A visual representation of a predefined action flow.
 * Each card displays the core value proposition and the modules involved.
 * 
 * Logic:
 * - Hover effects provide visual feedback via the global `.glow-hover` and `.glass` classes.
 * - Displays a set of icons representing the capabilities utilized.
 */
export default function TemplateCard({ title, description, modules, onClick }: TemplateCardProps) {
  return (
    <div className={`${styles.card} glass glow-hover`} onClick={onClick}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.footer}>
        <div className={styles.moduleIcons}>
          {modules.map((mod, i) => (
            <span key={i} className={styles.moduleIcon} title={mod}>
              {mod.substring(0, 1).toUpperCase()}
            </span>
          ))}
        </div>
        <button className={styles.actionButton}>Use Template</button>
      </div>
    </div>
  );
}
