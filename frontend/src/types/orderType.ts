export interface OrderItem {
  id: string;
  title: string;
  price?: number;
  quantity?: number;
}

export interface OrderData {
  items: OrderItem[];
  [key: string]: any;
}

export type OrderType = {
  id?: string;
  total_amount?: number;
  status?: string;
  created_at?: string | Date;
  user_id?: string;
  data?: OrderData;
};