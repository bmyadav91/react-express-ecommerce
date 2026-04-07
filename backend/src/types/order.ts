type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export type orderStatusType = "PENDING" | "COMPLETED" | "CANCELLED"

export type OrderType = {
  id?: string;
  total_amount?: number;
  status?: orderStatusType;
  created_at?: Date;
  user_id?: string;
  data?: JSONValue;
};