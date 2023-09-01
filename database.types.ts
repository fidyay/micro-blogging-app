export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          commentator_id: string | null
          created_at: string
          id: string
          post_id: string | null
          text: string | null
        }
        Insert: {
          commentator_id?: string | null
          created_at: string
          id?: string
          post_id?: string | null
          text?: string | null
        }
        Update: {
          commentator_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          text?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          has_image: boolean | null
          id: string
          title: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          has_image?: boolean | null
          id?: string
          title?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          has_image?: boolean | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          has_avatar: boolean | null
          id: string
          is_author: boolean | null
          name: string | null
        }
        Insert: {
          has_avatar?: boolean | null
          id?: string
          is_author?: boolean | null
          name?: string | null
        }
        Update: {
          has_avatar?: boolean | null
          id?: string
          is_author?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
