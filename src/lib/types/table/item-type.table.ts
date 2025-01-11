import { DateString } from '@lib/common';

export const ITEM_TYPE_TABLE_NAME = 'data.item_type';

export interface ItemTypeTable {
  id: number;
  name: string;
  created_by: number;
  created_at: DateString;
}
