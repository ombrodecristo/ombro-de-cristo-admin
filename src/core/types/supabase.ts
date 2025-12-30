export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      churches: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      devotionals: {
        Row: {
          author_id: string | null;
          content: string;
          created_at: string;
          id: string;
          published_at: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          published_at?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          published_at?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "devotionals_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      diary_entries: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          missionary_id: string;
          shared: boolean;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          missionary_id: string;
          shared?: boolean;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          missionary_id?: string;
          shared?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diary_entries_missionary_id_fkey";
            columns: ["missionary_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      library_items: {
        Row: {
          content_type: Database["public"]["Enums"]["library_item_content_type"];
          created_at: string;
          description: string | null;
          file_path: string | null;
          id: string;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
          video_provider:
            | Database["public"]["Enums"]["library_item_video_provider"]
            | null;
          video_url: string | null;
        };
        Insert: {
          content_type: Database["public"]["Enums"]["library_item_content_type"];
          created_at?: string;
          description?: string | null;
          file_path?: string | null;
          id?: string;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
          video_provider?:
            | Database["public"]["Enums"]["library_item_video_provider"]
            | null;
          video_url?: string | null;
        };
        Update: {
          content_type?: Database["public"]["Enums"]["library_item_content_type"];
          created_at?: string;
          description?: string | null;
          file_path?: string | null;
          id?: string;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
          video_provider?:
            | Database["public"]["Enums"]["library_item_video_provider"]
            | null;
          video_url?: string | null;
        };
        Relationships: [];
      };
      logs: {
        Row: {
          created_at: string;
          id: string;
          level: string;
          message: string;
          metadata: Json | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          level: string;
          message: string;
          metadata?: Json | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          level?: string;
          message?: string;
          metadata?: Json | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          church_id: string | null;
          created_at: string;
          full_name: string;
          gender: Database["public"]["Enums"]["user_genders"] | null;
          id: string;
          language_preference: string | null;
          mentor_id: string | null;
          role: Database["public"]["Enums"]["user_roles"];
          updated_at: string;
        };
        Insert: {
          church_id?: string | null;
          created_at?: string;
          full_name: string;
          gender?: Database["public"]["Enums"]["user_genders"] | null;
          id: string;
          language_preference?: string | null;
          mentor_id?: string | null;
          role?: Database["public"]["Enums"]["user_roles"];
          updated_at?: string;
        };
        Update: {
          church_id?: string | null;
          created_at?: string;
          full_name?: string;
          gender?: Database["public"]["Enums"]["user_genders"] | null;
          id?: string;
          language_preference?: string | null;
          mentor_id?: string | null;
          role?: Database["public"]["Enums"]["user_roles"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_profiles_church_id";
            columns: ["church_id"];
            isOneToOne: false;
            referencedRelation: "churches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_own_user: { Args: never; Returns: undefined };
      get_user_gender: { Args: never; Returns: string };
      get_user_role: { Args: never; Returns: string };
    };
    Enums: {
      library_item_content_type: "pdf" | "video";
      library_item_video_provider: "youtube" | "storage";
      user_genders: "MALE" | "FEMALE";
      user_roles: "ADMIN" | "MENTOR" | "MISSIONARY";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      library_item_content_type: ["pdf", "video"],
      library_item_video_provider: ["youtube", "storage"],
      user_genders: ["MALE", "FEMALE"],
      user_roles: ["ADMIN", "MENTOR", "MISSIONARY"],
    },
  },
} as const;
