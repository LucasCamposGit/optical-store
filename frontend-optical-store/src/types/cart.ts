// Cart types for the frontend
export interface Cart {
  id: number;
  user_id: number;
  status: string;
  items: CartItem[];
  total_items: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_variant_id: number;
  qty: number;
  unit_price: number;
  variant: CartVariant;
}

export interface CartVariant {
  id: number;
  sku: string;
  color: string;
  size: string;
  stock_qty: number;
  extra_price: number;
  product: CartProduct;
}

export interface CartProduct {
  id: number;
  name: string;
  image: string;
  base_price: number;
}

export interface AddToCartRequest {
  product_variant_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
