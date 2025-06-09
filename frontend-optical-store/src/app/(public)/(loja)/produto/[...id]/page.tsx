"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

// Types
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

// Subcomponents

const PriceInfo = ({ basePrice }: { basePrice: number }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const installmentPrice = basePrice / 10;

  return (
    <div>
      <p className="text-green-600 text-3xl font-semibold">{formatPrice(basePrice)}</p>
      <p className="text-sm text-gray-700">em até 10x de {formatPrice(installmentPrice)} sem juros</p>
      <p className="text-sm text-gray-700">ou <span className="text-green-600">{formatPrice(basePrice)}</span> via depósito bancário</p>
    </div>
  );
};

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Quantidade</label>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

const Installments = ({ basePrice }: { basePrice: number }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const values = [];
  for (let i = 1; i <= 10; i++) {
    const installmentValue = basePrice / i;
    values.push(`${i}x de ${formatPrice(installmentValue)}`);
  }

  return (
    <div className="grid grid-cols-5 gap-2 mt-4 text-sm text-green-600">
      {values.map((v, i) => (
        <div key={i} className="border px-2 py-1 rounded text-center">
          {v} <span className="text-gray-600">sem juros</span>
        </div>
      ))}
    </div>
  );
};

const ProductOptions = ({ variants }: { variants: Variant[] }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="my-4">
      <h3 className="text-sm font-medium mb-2">Opções disponíveis:</h3>
      <div className="flex gap-2 flex-wrap">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariant(variant)}
            className={`border rounded px-3 py-1 text-sm hover:bg-gray-100 ${
              selectedVariant?.id === variant.id ? 'bg-green-100 border-green-500' : ''
            }`}
          >
            {variant.color} {variant.size && `- ${variant.size}`}
            {variant.extra_price > 0 && (
              <span className="text-xs text-gray-600 block">
                +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(variant.extra_price)}
              </span>
            )}
          </button>
        ))}
      </div>
      {selectedVariant && (
        <div className="mt-2 text-sm text-gray-600">
          <p>SKU: {selectedVariant.sku}</p>
          <p>Estoque: {selectedVariant.stock_qty} unidades</p>
        </div>
      )}
    </div>
  );
};

const PurchaseButtons = () => (
  <div className="flex gap-4 my-4">
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      COMPRAR
    </button>
    <button className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50">
      COMPRA EM QUANTIDADE
    </button>
  </div>
);

// Main Component

const ContactLensProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract product ID from params (first element of the id array)
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('ID do produto não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Produto não encontrado');
          }
          throw new Error('Erro ao carregar produto');
        }

        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 border rounded shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 border rounded shadow-md">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Erro</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto p-6 border rounded shadow-md">
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold mb-2">Produto não encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">      {/* Product Image */}
      {product.image && (
        <div className="mb-6">
          <Image
            src={`http://localhost:8080/api/uploads/${product.image}`}
            alt={product.name}
            width={500}
            height={400}
            className="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="border rounded shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
        
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        
        <ProductOptions variants={product.variants || []} />
        <PriceInfo basePrice={product.base_price} />
        <QuantitySelector />
        <PurchaseButtons />
        <Installments basePrice={product.base_price} />
      </div>
    </div>
  );
};

export default ContactLensProduct;