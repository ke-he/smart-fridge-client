export const ITEM_TABLE_NAME = 'data.item';

export interface ItemTable {
  id: number;
  name: string;
  item_type_id: number;
  image_url: string | null;
}
