'use client';

import { useState } from 'react';
import ActionButton from '@/components/custom/misc/action-button/action-button';
import { ArrowDownUp } from 'lucide-react';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SortProps {
  onSortChange: (order: SortOrder) => void;
}

export default function Sort({ onSortChange }: SortProps) {
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC);

  const onClick = () => {
    const newSortOrder =
      sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    setSortOrder(newSortOrder);
    onSortChange(newSortOrder);
  };

  return (
    <ActionButton label={'Sort'} icon={<ArrowDownUp />} onClick={onClick} />
  );
}
