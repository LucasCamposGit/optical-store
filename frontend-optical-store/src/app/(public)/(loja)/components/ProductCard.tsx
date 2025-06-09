import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  image: string;
  variants: Variant[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getTotalStock = () => {
    return product.variants?.reduce((total, variant) => total + variant.stock_qty, 0) || 0;
  };

  const isInStock = getTotalStock() > 0;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
        {!isInStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            Esgotado
          </div>
        )}
        
        {product.image ? (
          <img
            src={`http://localhost:8080/api/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
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
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        )}
        
        {/* Price and Variants Info */}
        <div className="pt-2">
          <p className="text-blue-600 font-bold text-xl">
            {formatPrice(product.base_price)}
          </p>
          
          {product.variants && product.variants.length > 0 && (
            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
              <span>
                {product.variants.length} variante{product.variants.length > 1 ? 's' : ''}
              </span>
              <span className={isInStock ? 'text-green-600' : 'text-red-600'}>
                {isInStock ? `${getTotalStock()} em estoque` : 'Esgotado'}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-4">
          <Link href={`/produto/${product.id}`} className="block">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200">
              Ver Detalhes
            </button>
          </Link>
          
          <button 
            onClick={() => onAddToCart?.(product)}
            disabled={!isInStock}
            className={`w-full py-2 rounded transition-colors duration-200 ${
              isInStock
                ? 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                : 'border border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isInStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
