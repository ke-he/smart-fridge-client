import { DateString } from '@lib/common';

export const FRIDGE_ITEM_LINK_TABLE_NAME = 'data.fridge_item_link';

export interface ItemFridgeLinkTable {
  id: number;
  item_id: number;
  fridge_id: number;
  expiration_date: DateString;
}
