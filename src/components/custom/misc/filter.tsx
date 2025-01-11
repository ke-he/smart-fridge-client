'use client';

import ActionButton from '@/components/custom/misc/action-button/action-button';
import { ListFilter } from 'lucide-react';

export default function Filter() {
  const onClick = () => {
    console.log('Filter');
  };

  return (
    <ActionButton
      label={'Filter'}
      icon={<ListFilter />}
      badgeCount={3}
      onClick={onClick}
    />
  );
}
