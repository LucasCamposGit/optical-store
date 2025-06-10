"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

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

const QuantitySelector = ({ 
  quantity, 
  setQuantity, 
  maxQuantity 
}: { 
  quantity: number; 
  setQuantity: (q: number) => void; 
  maxQuantity: number; 
}) => {
  return (
    <div className="flex items-center gap-2 my-4">
      <label className="text-sm font-medium">Quantidade</label>
      <div className="flex items-center border rounded">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-1 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4 py-1">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
          className="px-3 py-1 hover:bg-gray-100"
          disabled={quantity >= maxQuantity}
        >
          +
        </button>
      </div>
      <span className="text-sm text-gray-500">
        {maxQuantity > 0 ? `(${maxQuantity} disponível${maxQuantity > 1 ? 'eis' : ''})` : '(Fora de estoque)'}
      </span>
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

const ProductOptions = ({ 
  variants, 
  selectedVariant, 
  onVariantChange 
}: { 
  variants: Variant[]; 
  selectedVariant: Variant | null;
  onVariantChange: (variant: Variant) => void;
}) => {
  if (!variants || variants.length === 0) {
    return (
      <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800">Este produto não possui variantes disponíveis.</p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Opções Disponíveis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {variants.map((variant) => (
          <div
            key={variant.id}
            onClick={() => onVariantChange(variant)}
            className={`cursor-pointer border rounded p-3 transition ${
              selectedVariant?.id === variant.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">{variant.sku}</div>
            <div className="text-sm text-gray-600">
              Cor: {variant.color} | Tamanho: {variant.size}
            </div>
            <div className="text-sm">
              {variant.extra_price > 0 && (
                <span className="text-green-600">+R$ {variant.extra_price.toFixed(2)}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {variant.stock_qty > 0 
                ? `${variant.stock_qty} em estoque`
                : 'Fora de estoque'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PurchaseButtons = ({ 
  onAddToCart, 
  selectedVariant, 
  quantity,
  addingToCart 
}: { 
  onAddToCart: () => void;
  selectedVariant: Variant | null;
  quantity: number;
  addingToCart: boolean;
}) => {
  const canAddToCart = selectedVariant && selectedVariant.stock_qty >= quantity && quantity > 0;

  return (
    <div className="flex gap-4 my-4">
      <button 
        onClick={onAddToCart}
        disabled={!canAddToCart || addingToCart}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        {addingToCart ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adicionando...
          </>
        ) : (
          'ADICIONAR AO CARRINHO'
        )}
      </button>
      <button className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50">
        COMPRA EM QUANTIDADE
      </button>
    </div>
  );
};

// Main Component

const ContactLensProduct = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

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
        }        const productData = await response.json();
        setProduct(productData);
        
        // Set the first variant as selected by default
        if (productData.variants && productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };    fetchProduct();
  }, [productId]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert('Por favor, selecione uma variante do produto.');
      return;
    }

    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push('/login?redirect=' + encodeURIComponent(`/produto/${productId}`));
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(selectedVariant.id, quantity);
      alert('Produto adicionado ao carrinho com sucesso!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
    // Reset quantity if it exceeds the new variant's stock
    if (quantity > variant.stock_qty) {
      setQuantity(Math.min(variant.stock_qty, 1));
    }
  };

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
          <ProductOptions 
          variants={product.variants || []} 
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
        />
        <PriceInfo basePrice={product.base_price + (selectedVariant?.extra_price || 0)} />
        <QuantitySelector 
          quantity={quantity}
          setQuantity={setQuantity}
          maxQuantity={selectedVariant?.stock_qty || 0}
        />
        <PurchaseButtons 
          onAddToCart={handleAddToCart}
          selectedVariant={selectedVariant}
          quantity={quantity}
          addingToCart={addingToCart}
        />
        <Installments basePrice={product.base_price + (selectedVariant?.extra_price || 0)} />
      </div>
    </div>
  );
};

export default ContactLensProduct;