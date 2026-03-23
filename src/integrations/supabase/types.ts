export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      commissions: {
        Row: {
          agent_id: string
          amount: number
          created_at: string
          currency: string
          id: string
          order_id: string
          paid_at: string | null
          release_date: string | null
          status: string
        }
        Insert: {
          agent_id: string
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          order_id: string
          paid_at?: string | null
          release_date?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          order_id?: string
          paid_at?: string | null
          release_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_agents: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          manager_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          manager_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          manager_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manager_agents_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_agents_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          agent_id: string | null
          commission: number
          created_at: string
          currency: string
          customer_email: string
          customer_name: string | null
          device_id: string | null
          id: string
          ip_address: string | null
          price: number
          product_id: string | null
          product_name: string | null
          referral_code: string | null
          status: string
        }
        Insert: {
          agent_id?: string | null
          commission?: number
          created_at?: string
          currency?: string
          customer_email: string
          customer_name?: string | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          price?: number
          product_id?: string | null
          product_name?: string | null
          referral_code?: string | null
          status?: string
        }
        Update: {
          agent_id?: string | null
          commission?: number
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          price?: number
          product_id?: string | null
          product_name?: string | null
          referral_code?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_requests: {
        Row: {
          agent_id: string
          amount: number
          created_at: string
          id: string
          method: string | null
          method_details: Json | null
          notes: string | null
          processed_at: string | null
          status: string
        }
        Insert: {
          agent_id: string
          amount: number
          created_at?: string
          id?: string
          method?: string | null
          method_details?: Json | null
          notes?: string | null
          processed_at?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          amount?: number
          created_at?: string
          id?: string
          method?: string | null
          method_details?: Json | null
          notes?: string | null
          processed_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_requests_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_holder_name: string | null
          agent_type: Database["public"]["Enums"]["agent_type"] | null
          balance_payable: number | null
          bank_name: string | null
          commission_rate: number | null
          created_at: string | null
          email: string
          full_name: string
          iban: string | null
          id: string
          manager_cut: number | null
          phone: string | null
          preferred_locale: string | null
          referral_code: string | null
          status: Database["public"]["Enums"]["account_status"] | null
          swift_bic: string | null
          tier: Database["public"]["Enums"]["agent_tier"] | null
          total_earned: number | null
          user_id: string
        }
        Insert: {
          account_holder_name?: string | null
          agent_type?: Database["public"]["Enums"]["agent_type"] | null
          balance_payable?: number | null
          bank_name?: string | null
          commission_rate?: number | null
          created_at?: string | null
          email: string
          full_name: string
          iban?: string | null
          id?: string
          manager_cut?: number | null
          phone?: string | null
          preferred_locale?: string | null
          referral_code?: string | null
          status?: Database["public"]["Enums"]["account_status"] | null
          swift_bic?: string | null
          tier?: Database["public"]["Enums"]["agent_tier"] | null
          total_earned?: number | null
          user_id: string
        }
        Update: {
          account_holder_name?: string | null
          agent_type?: Database["public"]["Enums"]["agent_type"] | null
          balance_payable?: number | null
          bank_name?: string | null
          commission_rate?: number | null
          created_at?: string | null
          email?: string
          full_name?: string
          iban?: string | null
          id?: string
          manager_cut?: number | null
          phone?: string | null
          preferred_locale?: string | null
          referral_code?: string | null
          status?: Database["public"]["Enums"]["account_status"] | null
          swift_bic?: string | null
          tier?: Database["public"]["Enums"]["agent_tier"] | null
          total_earned?: number | null
          user_id?: string
        }
        Relationships: []
      }
      referral_clicks: {
        Row: {
          agent_id: string | null
          country: string | null
          created_at: string
          device_id: string | null
          id: string
          ip_address: string | null
          referral_code: string
          user_agent: string | null
        }
        Insert: {
          agent_id?: string | null
          country?: string | null
          created_at?: string
          device_id?: string | null
          id?: string
          ip_address?: string | null
          referral_code: string
          user_agent?: string | null
        }
        Update: {
          agent_id?: string | null
          country?: string | null
          created_at?: string
          device_id?: string | null
          id?: string
          ip_address?: string | null
          referral_code?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_clicks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_scans: {
        Row: {
          country: string | null
          id: string
          ip_address: string | null
          referral_code: string
          scanned_at: string
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          id?: string
          ip_address?: string | null
          referral_code: string
          scanned_at?: string
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          id?: string
          ip_address?: string | null
          referral_code?: string
          scanned_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_profile_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_manager_of_agent: {
        Args: { _agent_profile_id: string }
        Returns: boolean
      }
    }
    Enums: {
      account_status: "active" | "blocked"
      agent_tier: "bronze" | "silver" | "gold"
      agent_type: "airport" | "hotel" | "tour_guide" | "taxi" | "affiliate"
      app_role: "admin" | "manager" | "agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["active", "blocked"],
      agent_tier: ["bronze", "silver", "gold"],
      agent_type: ["airport", "hotel", "tour_guide", "taxi", "affiliate"],
      app_role: ["admin", "manager", "agent"],
    },
  },
} as const
