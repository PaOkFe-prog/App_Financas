import type { TransactionCategory, TransactionType } from "./transaction";

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          user_id: string;
          description: string;
          amount: number;
          date: string;
          type: TransactionType;
          category: TransactionCategory;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          description: string;
          amount: number;
          date: string;
          type: TransactionType;
          category: TransactionCategory;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          description?: string;
          amount?: number;
          date?: string;
          type?: TransactionType;
          category?: TransactionCategory;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
