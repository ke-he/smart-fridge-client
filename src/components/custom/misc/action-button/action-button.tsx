'use client';

import React, { LegacyRef } from 'react';
import styles from './action-button.module.css';

type ActionButtonProps = {
  label: string;
  icon?: React.ReactNode;
  badgeCount?: number;
  onClick: () => void;
  ref?: LegacyRef<HTMLButtonElement>;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  badgeCount,
  onClick,
  ref,
}) => {
  return (
    <button ref={ref} onClick={onClick} className={styles['action-button']}>
      {icon && <span className={styles['action-icon']}>{icon}</span>}
      <span className={styles['action-label']}>{label}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className={styles['action-badge']}>{badgeCount}</span>
      )}
    </button>
  );
};

export default ActionButton;
