import React from 'react';
import clsx from 'clsx'; // Import clsx for merging class names
import styles from './custom-button.module.css';

export default function CustomButton({
  filled,
  className,
  children,
  ...props
}: { filled?: boolean; className?: string } & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>) {
  return (
    <button
      className={clsx(
        filled ? styles.customButtonFilled : styles.customButton,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
