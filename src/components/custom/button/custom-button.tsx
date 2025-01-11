import React from 'react';
import styles from './custom-button.module.css';

export default function CustomButton({
  filled,
  children,
  ...props
}: { filled?: boolean } & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>) {
  return (
    <button
      className={filled ? styles.customButtonFilled : styles.customButton}
      {...props}
    >
      {children}
    </button>
  );
}
