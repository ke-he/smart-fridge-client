'use client';

import ActionButton from '@/components/custom/misc/action-button/action-button';
import { ArrowDownUp } from 'lucide-react';

export default function Sort() {
  const onClick = () => {
    console.log('Sort');
  };

  return (
    <ActionButton label={'Sort'} icon={<ArrowDownUp />} onClick={onClick} />
  );
}
