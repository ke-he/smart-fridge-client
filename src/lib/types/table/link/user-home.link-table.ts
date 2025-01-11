export const USER_HOME_LINK_TABLE_NAME = 'data.user_home_link';

export interface UserHomeLinkTable {
  user_id: number;
  home_id: number;
  join_date: Date;
  is_owner: boolean;
}
