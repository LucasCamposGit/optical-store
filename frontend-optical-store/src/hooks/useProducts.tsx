import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  image: string;
  variants: Variant[];
}

interface Variant {
  id: number;
  product_id: number;
  sku: string;
  color: string;
  size: string;
  extra_price: number;
  stock_qty: number;
  image_url: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface FilterState {
  search: string;
  category: string;
  price_min: string;
  price_max: string;
  stock: boolean;
  page: number;
  limit: number;
}

interface UseProductsOptions {
  baseUrl?: string;
  debounceMs?: number;
  cacheTimeout?: number;
}

interface ProductsHookResult {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Simple cache implementation
const cache = new Map<string, { data: ProductsResponse; timestamp: number }>();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function useProducts(
  filters: FilterState,
  options: UseProductsOptions = {}
): ProductsHookResult {
  const {
    baseUrl = 'http://localhost:8080/api',
    debounceMs = 500,
    cacheTimeout = CACHE_TIMEOUT
  } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(filters.search, debounceMs);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build query parameters with debounced search
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (filters.category) params.append('category', filters.category);
      if (filters.price_min) params.append('price_min', filters.price_min);
      if (filters.price_max) params.append('price_max', filters.price_max);
      if (filters.stock) params.append('stock', 'available');
      params.append('page', filters.page.toString());
      params.append('limit', filters.limit.toString());

      const queryString = params.toString();
      const url = `${baseUrl}/products?${queryString}`;
      
      // Check cache first
      const cachedResult = cache.get(url);
      if (cachedResult && Date.now() - cachedResult.timestamp < cacheTimeout) {
        const data = cachedResult.data;
        setProducts(data.products || []);
        setPagination({
          total: data.total,
          page: data.page,
          limit: data.limit,
          total_pages: data.total_pages
        });
        setError(null);
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }

      const data: ProductsResponse = await response.json();
      
      // Cache the result
      cache.set(url, { data, timestamp: Date.now() });
      
      setProducts(data.products || []);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        total_pages: data.total_pages
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [
    baseUrl,
    debouncedSearch,
    filters.category,
    filters.price_min,
    filters.price_max,
    filters.stock,
    filters.page,
    filters.limit,
    cacheTimeout
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    pagination,
    loading,
    error,
    refetch: fetchProducts
  };
}

// Clear cache utility
export function clearProductsCache() {
  cache.clear();
}
