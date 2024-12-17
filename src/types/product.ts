export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  discount: string | null;
  multiple_colors: boolean | null;
  colors?: string[] | null;
  sets?: string[] | null;
}
