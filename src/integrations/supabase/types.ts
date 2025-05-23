export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      curated_list_products: {
        Row: {
          added_at: string | null
          id: string
          list_id: string | null
          position: number | null
          product_id: string | null
        }
        Insert: {
          added_at?: string | null
          id?: string
          list_id?: string | null
          position?: number | null
          product_id?: string | null
        }
        Update: {
          added_at?: string | null
          id?: string
          list_id?: string | null
          position?: number | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curated_list_products_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "curated_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curated_list_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      curated_lists: {
        Row: {
          cover_image: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_pinned: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_pinned?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          badges: string[] | null
          category: string
          created_at: string | null
          description: string | null
          editorial_summary: string | null
          email: string | null
          features: Json | null
          id: string
          logo: string | null
          logo_url: string | null
          media: Json | null
          name: string
          price: string | null
          pricing: Json | null
          rejection_reason: string | null
          reviewer_persona: string | null
          signal_score: number | null
          status: string | null
          updated_at: string | null
          use_case: string[] | null
          website: string | null
        }
        Insert: {
          badges?: string[] | null
          category: string
          created_at?: string | null
          description?: string | null
          editorial_summary?: string | null
          email?: string | null
          features?: Json | null
          id?: string
          logo?: string | null
          logo_url?: string | null
          media?: Json | null
          name: string
          price?: string | null
          pricing?: Json | null
          rejection_reason?: string | null
          reviewer_persona?: string | null
          signal_score?: number | null
          status?: string | null
          updated_at?: string | null
          use_case?: string[] | null
          website?: string | null
        }
        Update: {
          badges?: string[] | null
          category?: string
          created_at?: string | null
          description?: string | null
          editorial_summary?: string | null
          email?: string | null
          features?: Json | null
          id?: string
          logo?: string | null
          logo_url?: string | null
          media?: Json | null
          name?: string
          price?: string | null
          pricing?: Json | null
          rejection_reason?: string | null
          reviewer_persona?: string | null
          signal_score?: number | null
          status?: string | null
          updated_at?: string | null
          use_case?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          has_completed_onboarding: boolean | null
          id: string
          is_contributor: boolean | null
          joined_at: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          has_completed_onboarding?: boolean | null
          id: string
          is_contributor?: boolean | null
          joined_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          is_contributor?: boolean | null
          joined_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          compared_product: string | null
          cons: string
          created_at: string | null
          flag_reason: string | null
          flagged_at: string | null
          id: string
          pricing_feedback: string | null
          product_id: string | null
          pros: string
          reviewer_type: string | null
          score: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          verdict: string | null
        }
        Insert: {
          compared_product?: string | null
          cons: string
          created_at?: string | null
          flag_reason?: string | null
          flagged_at?: string | null
          id?: string
          pricing_feedback?: string | null
          product_id?: string | null
          pros: string
          reviewer_type?: string | null
          score?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verdict?: string | null
        }
        Update: {
          compared_product?: string | null
          cons?: string
          created_at?: string | null
          flag_reason?: string | null
          flagged_at?: string | null
          id?: string
          pricing_feedback?: string | null
          product_id?: string | null
          pros?: string
          reviewer_type?: string | null
          score?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verdict?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_products: {
        Row: {
          id: string
          product_id: string | null
          saved_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          saved_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          saved_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          interests: string[] | null
          notification_preferences: Json | null
          privacy_settings: Json | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interests?: string[] | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interests?: string[] | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
