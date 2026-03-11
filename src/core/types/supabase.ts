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
      chat_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_read: boolean;
          room_id: string;
          sender_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          room_id: string;
          sender_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          room_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_rooms: {
        Row: {
          created_at: string;
          id: string;
          mentee_id: string;
          mentor_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          mentee_id: string;
          mentor_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          mentee_id?: string;
          mentor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_rooms_mentee_id_fkey";
            columns: ["mentee_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_rooms_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
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
      devotional_translations: {
        Row: {
          content: string;
          created_at: string;
          devotional_id: string;
          id: string;
          is_original: boolean;
          language_code: string;
          status: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          devotional_id: string;
          id?: string;
          is_original: boolean;
          language_code: string;
          status: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          devotional_id?: string;
          id?: string;
          is_original?: boolean;
          language_code?: string;
          status?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "devotional_translations_devotional_id_fkey";
            columns: ["devotional_id"];
            isOneToOne: false;
            referencedRelation: "devotionals";
            referencedColumns: ["id"];
          },
        ];
      };
      devotionals: {
        Row: {
          author_id: string | null;
          created_at: string;
          id: string;
          original_language: string;
          published_at: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          created_at?: string;
          id?: string;
          original_language: string;
          published_at?: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          created_at?: string;
          id?: string;
          original_language?: string;
          published_at?: string;
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
          mentee_id: string;
          shared: boolean;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          mentee_id: string;
          shared?: boolean;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          mentee_id?: string;
          shared?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diary_entries_mentee_id_fkey";
            columns: ["mentee_id"];
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
          title: string;
          updated_at: string;
          video_url: string | null;
        };
        Insert: {
          content_type: Database["public"]["Enums"]["library_item_content_type"];
          created_at?: string;
          description?: string | null;
          file_path?: string | null;
          id?: string;
          title: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Update: {
          content_type?: Database["public"]["Enums"]["library_item_content_type"];
          created_at?: string;
          description?: string | null;
          file_path?: string | null;
          id?: string;
          title?: string;
          updated_at?: string;
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
          permissions: Json;
          push_token: string | null;
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
          permissions?: Json;
          push_token?: string | null;
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
          permissions?: Json;
          push_token?: string | null;
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
      get_chat_rooms_with_details: {
        Args: never;
        Returns: {
          id: string;
          last_message: Json;
          other_user: Json;
          unread_count: number;
        }[];
      };
      get_devotionals_with_fallback: {
        Args: { p_language_code: string };
        Returns: {
          author: Json;
          author_id: string;
          content: string;
          id: string;
          is_original: boolean;
          original_language: string;
          published_at: string;
          title: string;
        }[];
      };
      get_or_create_chat_room: {
        Args: { p_user_1: string; p_user_2: string };
        Returns: {
          created_at: string;
          id: string;
          mentee_id: string;
          mentor_id: string;
        }[];
        SetofOptions: {
          from: "*";
          to: "chat_rooms";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      get_unread_message_count: { Args: never; Returns: number };
      get_user_gender: { Args: never; Returns: string };
      get_user_role: { Args: never; Returns: string };
      mark_messages_as_read: {
        Args: { p_room_id: string };
        Returns: undefined;
      };
      resync_user_auth_state: { Args: { p_user_id: string }; Returns: Json };
      retry_translation: {
        Args: { p_translation_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      library_item_content_type: "PDF" | "YOUTUBE" | "DIRECT_UPLOAD";
      user_genders: "MALE" | "FEMALE";
      user_roles: "ADMIN" | "MENTOR" | "MENTEE";
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
      library_item_content_type: ["PDF", "YOUTUBE", "DIRECT_UPLOAD"],
      user_genders: ["MALE", "FEMALE"],
      user_roles: ["ADMIN", "MENTOR", "MENTEE"],
    },
  },
} as const;
