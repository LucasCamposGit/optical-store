"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useCart } from '@/context/CartContext';
import FilterBar from '../components/FilterBar';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  stock_qty: number;
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

// Filter state interface
interface FilterState {
  search: string;
  category: string;
  price_min: string;
  price_max: string;
  stock: boolean;
  page: number;
  limit: number;
}

// Loading component for Suspense fallback
function StoreLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando loja...</p>
      </div>
    </div>
  );
}

// Main store component that uses useSearchParams
function StoreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<number | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 0
  });  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    price_min: '',
    price_max: '',
    stock: false,
    page: 1,
    limit: 12
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || '';
    const initialPriceMin = searchParams.get('price_min') || '';
    const initialPriceMax = searchParams.get('price_max') || '';
    const initialStock = searchParams.get('stock') === 'available';
    const initialPage = parseInt(searchParams.get('page') || '1');
    const initialLimit = parseInt(searchParams.get('limit') || '12');

    setFilters({
      search: initialSearch,
      category: initialCategory,
      price_min: initialPriceMin,
      price_max: initialPriceMax,
      stock: initialStock,
      page: initialPage,
      limit: initialLimit
    });
  }, [searchParams]);

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(filters.search, 500);

  // Update URL when filters change
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.price_min) params.set('price_min', newFilters.price_min);
    if (newFilters.price_max) params.set('price_max', newFilters.price_max);
    if (newFilters.stock) params.set('stock', 'available');
    if (newFilters.page !== 1) params.set('page', newFilters.page.toString());
    if (newFilters.limit !== 12) params.set('limit', newFilters.limit.toString());

    const queryString = params.toString();
    const newURL = queryString ? `/loja?${queryString}` : '/loja';
    
    // Update URL without triggering a page reload
    window.history.replaceState({}, '', newURL);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };  const fetchProducts = useCallback(async (filtersToUse?: FilterState) => {
    try {
      setLoading(true);
      
      const currentFilters = filtersToUse || filters;
      
      // Build query parameters
      const params = new URLSearchParams();
      if (currentFilters.search) params.append('search', currentFilters.search);
      if (currentFilters.category) params.append('category', currentFilters.category);
      if (currentFilters.price_min) params.append('price_min', currentFilters.price_min);
      if (currentFilters.price_max) params.append('price_max', currentFilters.price_max);
      if (currentFilters.stock) params.append('stock', 'available');
      params.append('page', currentFilters.page.toString());
      params.append('limit', currentFilters.limit.toString());

      const response = await fetch(`http://localhost:8080/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }

      const data: ProductsResponse = await response.json();
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
  }, [filters]);  useEffect(() => {
    // Fetch products when debounced search changes or other filters change
    const filtersWithDebouncedSearch = {
      ...filters,
      search: debouncedSearch
    };
    fetchProducts(filtersWithDebouncedSearch);
  }, [fetchProducts, debouncedSearch, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string | boolean | number) => {
    const newFilters = {
      ...filters,
      [key]: value,
      // Reset page when filters change (except when changing page itself)
      page: key === 'page' ? value as number : 1
    };
    
    setFilters(newFilters);
    updateURL(newFilters);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      handleFilterChange('page', newPage);    }
  };
  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      price_min: '',
      price_max: '',
      stock: false,
      page: 1,
      limit: 12
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);  };

  // Handle add to cart functionality
  const handleAddToCart = async (product: Product) => {
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push('/login?redirect=/loja');
      return;
    }
    
    // If product has no variants or only one variant, add directly
    const variantToAdd = product.variants && product.variants.length > 0 ? product.variants[0] : null;
    
    if (!variantToAdd) {
      alert('Este produto não possui variantes disponíveis.');
      return;
    }

    try {
      setAddingToCart(product.id);
      await addToCart(variantToAdd.id, 1);
      
      // Show success message
      setShowSuccessMessage(product.id);
      setTimeout(() => setShowSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
    } finally {
      setAddingToCart(null);
    }
  };

  return (    <div>
      {/* Header Section */}
      <section className="bg-blue-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Encontre o produto perfeito</h2>
          <p className="text-lg">Use os filtros abaixo para encontrar exatamente o que você procura!</p>
        </div>
      </section>

      {/* Filters Section */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalResults={pagination.total}
      />

      {/* Results Section */}
      <section className="container mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">
            Produtos {pagination.total > 0 && `(${pagination.total} encontrados)`}
          </h2>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Exibir:</label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 shadow animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button 
              onClick={() => fetchProducts()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">Nenhum produto encontrado com os filtros aplicados.</p>
                <button 
                  onClick={() => {
                    const clearedFilters = {
                      search: '',
                      category: '',
                      price_min: '',
                      price_max: '',
                      stock: false,
                      page: 1,
                      limit: 12
                    };
                    setFilters(clearedFilters);
                    updateURL(clearedFilters);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="w-full h-56 bg-white flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <Image
                          src={`http://localhost:8080/api/uploads/${product.image}`}
                          alt={product.name}
                          width={300}
                          height={224}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/oculos-card.png';
                          }}
                        />
                      ) : (
                        <Image 
                          src="/img/oculos-card.png" 
                          alt={product.name} 
                          width={200} 
                          height={200} 
                          className="w-full h-full object-contain p-4"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-base font-medium text-gray-800 mb-2 h-12 overflow-hidden line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <p className="text-blue-600 font-bold text-xl">{formatPrice(product.base_price)}</p>
                        <p className="text-sm text-gray-500">
                          em até 6x de {formatPrice(product.base_price / 6)} sem juros
                        </p>
                        <p className="text-sm text-gray-500">
                          ou <span className="text-blue-600 font-medium">{formatPrice(product.base_price)} à vista</span>
                        </p>
                      </div>

                      {/* Stock Status */}
                      <div className="mb-4">
                        <p className={`text-xs font-medium ${product.stock_qty > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {product.stock_qty > 0 ? '✓ Disponível' : '✗ Indisponível'}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Link href={`/produto/${product.id}`}>
                          <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200 font-medium">
                            Ver Detalhes
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.total_pages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                
                {/* Page numbers */}
                <div className="flex space-x-1">
                  {[...Array(Math.min(5, pagination.total_pages))].map((_, i) => {
                    const pageNum = Math.max(1, pagination.page - 2) + i;
                    if (pageNum > pagination.total_pages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 border rounded-md ${
                          pageNum === pagination.page
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.total_pages}
                  className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Próximo
                </button>
              </div>
            )}          </>
        )}
      </section>    </div>
  );
}

// Main component wrapped with Suspense
export default function Store() {
  return (
    <Suspense fallback={<StoreLoading />}>
      <StoreContent />
    </Suspense>
  );
}
