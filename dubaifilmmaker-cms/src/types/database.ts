export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          client: string
          category: string
          data_cat: string
          description: string | null
          poster_image: string
          poster_image_srcset: string
          video_url: string
          video_formats: Json
          featured: boolean
          order_index: number
          seo: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          client: string
          category: string
          data_cat: string
          description?: string | null
          poster_image: string
          poster_image_srcset: string
          video_url: string
          video_formats?: Json
          featured?: boolean
          order_index?: number
          seo?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          client?: string
          category?: string
          data_cat?: string
          description?: string | null
          poster_image?: string
          poster_image_srcset?: string
          video_url?: string
          video_formats?: Json
          featured?: boolean
          order_index?: number
          seo?: Json
          created_at?: string
          updated_at?: string
        }
      }
      content_pages: {
        Row: {
          id: string
          page_type: string
          title: string
          content: Json
          meta: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_type: string
          title: string
          content: Json
          meta?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_type?: string
          title?: string
          content?: Json
          meta?: Json
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      media_files: {
        Row: {
          id: string
          filename: string
          original_name: string
          file_type: string
          file_size: number
          url: string
          alt_text: string | null
          folder: string | null
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_name: string
          file_type: string
          file_size: number
          url: string
          alt_text?: string | null
          folder?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_name?: string
          file_type?: string
          file_size?: number
          url?: string
          alt_text?: string | null
          folder?: string | null
          created_at?: string
        }
      }
    }
  }
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]