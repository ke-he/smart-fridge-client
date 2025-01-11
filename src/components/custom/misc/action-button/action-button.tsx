'use client';

import React from 'react';
import styles from './action-button.module.css';

type ActionButtonProps = {
  label: string;
  icon?: React.ReactNode;
  badgeCount?: number;
  onClick: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  badgeCount,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={styles['action-button']}>
      {icon && <span className={styles['action-icon']}>{icon}</span>}
      <span className={styles['action-label']}>{label}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className={styles['action-badge']}>{badgeCount}</span>
      )}
    </button>
  );
};

export default ActionButton;
