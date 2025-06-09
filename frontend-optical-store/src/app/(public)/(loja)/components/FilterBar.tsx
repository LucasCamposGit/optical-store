"use client";

import React from 'react';

interface FilterState {
  search: string;
  category: string;
  price_min: string;
  price_max: string;
  stock: boolean;
  page: number;
  limit: number;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string | boolean | number) => void;
  onClearFilters: () => void;
  totalResults?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults = 0
}) => {
  const hasActiveFilters = !!(
    filters.search ||
    filters.category ||
    filters.price_min ||
    filters.price_max ||
    filters.stock
  );

  return (
    <section className="container mx-auto py-6 px-6 bg-gray-50">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-1">Buscar produto</label>
          <input
            type="text"
            placeholder="Nome, código ou marca..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="1">Óculos de Grau</option>
            <option value="2">Óculos de Sol</option>
            <option value="3">Lentes de Contato</option>
            <option value="4">Acessórios</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Preço Min</label>
          <input
            type="number"
            placeholder="R$ 0"
            value={filters.price_min}
            onChange={(e) => onFilterChange('price_min', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço Max</label>
          <input
            type="number"
            placeholder="R$ 9999"
            value={filters.price_max}
            onChange={(e) => onFilterChange('price_max', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stock Filter and Clear Button */}
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.stock}
              onChange={(e) => onFilterChange('stock', e.target.checked)}
              className="mr-2 rounded"
            />
            <span className="text-sm">Apenas em estoque</span>
          </label>
          
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full text-xs px-2 py-1 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Busca: "{filters.search}"
              <button
                onClick={() => onFilterChange('search', '')}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          
          {filters.category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Categoria: {['', 'Óculos de Grau', 'Óculos de Sol', 'Lentes de Contato', 'Acessórios'][parseInt(filters.category)] || filters.category}
              <button
                onClick={() => onFilterChange('category', '')}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          
          {(filters.price_min || filters.price_max) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              Preço: R$ {filters.price_min || '0'} - R$ {filters.price_max || '∞'}
              <button
                onClick={() => {
                  onFilterChange('price_min', '');
                  onFilterChange('price_max', '');
                }}
                className="ml-1 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
          
          {filters.stock && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              Em estoque
              <button
                onClick={() => onFilterChange('stock', false)}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        {totalResults > 0 ? (
          <span>{totalResults} produto{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}</span>
        ) : (
          <span>Nenhum produto encontrado</span>
        )}
      </div>
    </section>
  );
};

export default FilterBar;
