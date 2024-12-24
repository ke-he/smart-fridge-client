import { DateString } from '@lib/common';

export const HOME_TABLE_NAME = 'data.home';

export interface HomeTable {
  id: number;
  name: string;
  created_by: number;
  created_at: DateString;
}
