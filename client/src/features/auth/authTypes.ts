export interface TProfile {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
  role_user: string;
  created_at?: string;
  updated_at?: string | null;
  is_verified?: boolean;
}

export type NewUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
