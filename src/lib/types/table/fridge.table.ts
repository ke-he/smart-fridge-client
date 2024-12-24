import { DateString } from '@lib/common';

export const FRIDGE_TABLE_NAME = 'data.fridge';

export interface FridgeTable {
  id: number;
  name: string;
  home_id: number;
  created_by: number;
  created_at: DateString;
}
