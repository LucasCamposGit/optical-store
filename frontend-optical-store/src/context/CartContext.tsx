"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Cart, AddToCartRequest } from '@/types/cart';
import { useAuth } from './LoginContext';

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  addToCart: (variantId: number, quantity: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  // Get auth token from localStorage or auth context
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token') || auth.tokens?.access_token;
    }
    return auth.tokens?.access_token || null;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return auth.isAuthenticated && !!getAuthToken();
  };

  // API request helper
  const makeRequest = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    // Return null for 204 No Content responses
    if (response.status === 204) {
      return null;
    }

    return response.json();
  };

  // Fetch current cart
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated()) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cartData = await makeRequest('http://localhost:8080/api/cart');
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (variantId: number, quantity: number) => {
    if (!isAuthenticated()) {
      throw new Error('Please log in to add items to cart');
    }

    try {
      setLoading(true);
      setError(null);
      
      const request: AddToCartRequest = {
        product_variant_id: variantId,
        quantity: quantity,
      };

      const updatedCart = await makeRequest('http://localhost:8080/api/cart/add', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update cart item quantity
  const updateCartItem = useCallback(async (itemId: number, quantity: number) => {
    if (!isAuthenticated()) {
      throw new Error('Please log in to update cart');
    }

    try {
      setLoading(true);
      setError(null);

      const updatedCart = await makeRequest(`http://localhost:8080/api/cart/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });

      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: number) => {
    if (!isAuthenticated()) {
      throw new Error('Please log in to remove items from cart');
    }

    try {
      setLoading(true);
      setError(null);

      await makeRequest(`http://localhost:8080/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });

      // Refresh cart after removal
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  // Clear all items from cart
  const clearCart = useCallback(async () => {
    if (!isAuthenticated()) {
      throw new Error('Please log in to clear cart');
    }

    try {
      setLoading(true);
      setError(null);

      await makeRequest('http://localhost:8080/api/cart/clear', {
        method: 'DELETE',
      });

      // Refresh cart after clearing
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);
  // Load cart on component mount and when authentication changes
  useEffect(() => {
    refreshCart();
  }, [refreshCart, auth.isAuthenticated]);

  // Calculate derived values
  const cartCount = cart?.total_items || 0;
  const totalPrice = cart?.total_price || 0;

  const value: CartContextType = {
    cart,
    cartCount,
    totalPrice,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
