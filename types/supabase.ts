export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          href: string | null;
          username: string | null;
          imagesrc: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          href?: string | null;
          username?: string | null;
          imagesrc?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          href?: string | null;
          username?: string | null;
          imagesrc?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          email: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          email?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          email?: string | null;
        };
      };
      todos: {
        Row: {
          id: number;
          user_id: string;
          task: string | null;
          is_complete: boolean | null;
          inserted_at: string;
        };
        Insert: {
          id?: number;
          user_id: string | undefined;
          task?: string | null;
          is_complete?: boolean | null;
          inserted_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          task?: string | null;
          is_complete?: boolean | null;
          inserted_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
