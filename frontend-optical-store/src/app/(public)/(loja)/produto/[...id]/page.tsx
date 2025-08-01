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

// Subcomponents

const PriceInfo = ({ basePrice }: { basePrice: number }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const installmentPrice = basePrice / 6;

  return (
    <div>
      <p className="text-[#0d4a66] text-3xl font-semibold">{formatPrice(basePrice)}</p>
      <p className="text-sm text-gray-700">em até 6x de {formatPrice(installmentPrice)} sem juros</p>
      <p className="text-sm text-gray-700">ou <span className="text-[#0d4a66]">{formatPrice(basePrice)} à vista.</span></p>
    </div>
  );
};

const ContactInfo = ({ productName }: { productName: string }) => {
  const whatsappMessage = `Olá! Gostaria de saber mais sobre o óculos ${productName}`;
  const whatsappUrl = `https://wa.me/5511945647329?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="my-6 p-4 bg-blue-50 border border-[#0d4a66] rounded-lg">
      <h3 className="text-lg font-semibold text-[#0d4a66] mb-3">Interessado neste produto?</h3>
      <div className="space-y-2 text-sm">
        <p className="text-gray-700">Entre em contato conosco para mais informações:</p>
        <div className="flex flex-col space-y-1">
          <p><span className="font-medium">Telefone:</span> (11) 2956-9466</p>
          <p><span className="font-medium">WhatsApp:</span> (11) 94564-7329</p>
          <p><span className="font-medium">E-mail:</span> contato@oticasatiko.com.br</p>
        </div>
        <div className="mt-3">
          <button className="bg-[#0d4a66] text-white px-6 py-2 rounded hover:bg-[#0d4a99] transition">
            <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer">
                  Entrar em Contato via WhatsApp
            </a>
          </button>
        </div>
      </div>
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
  // Até 6x sem juros
  for (let i = 1; i <= 6; i++) {
    const installmentValue = basePrice / i;
    values.push(`${i}x de ${formatPrice(installmentValue)} sem juros`);
  }
  // De 7x a 12x com juros (simulando 2% de juros ao mês)
  // for (let i = 7; i <= 12; i++) {
  //   const installmentValue = (basePrice * 1.02 ** (i - 6)) / i;
  //   values.push(`${i}x de ${formatPrice(installmentValue)} com juros`);
  // }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Opções de Pagamento</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        {values.map((v, i) => (
          <div key={i} className="border px-2 py-1 rounded text-center">
            <span className={i < 6 ? "text-[#0d4a66]" : "text-gray-600"}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductAvailability = ({ 
  product 
}: { 
  product: Product;
}) => {
  return (
    <div className="my-4 p-3 bg-gray-50 rounded">
      <h4 className="font-medium text-gray-800 mb-2">Disponibilidade</h4>
      <div className="text-sm">
        <p className={`${product.stock_qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock_qty > 0 
            ? `✓ Em estoque (${product.stock_qty} unidades disponíveis)`
            : '✗ Fora de estoque'
          }
        </p>
      </div>
    </div>
  );
};

// Main Component

const ContactLensProduct = () => {
  const params = useParams();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

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

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          {product.image && (
            <div className="w-full max-w-lg">
              <Image
                src={`http://localhost:8080/api/uploads/${product.image}`}
                alt={product.name}
                width={500}
                height={400}
                className="w-full h-auto rounded-lg shadow-md"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="border rounded shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          
          {product.description && (
            <p className="text-gray-600 mb-4">{product.description}</p>
          )}
          <PriceInfo basePrice={product.base_price + (selectedVariant?.extra_price || 0)} />
          <ProductAvailability product={product} />
          <ContactInfo productName={product.name} />
          <Installments basePrice={product.base_price + (selectedVariant?.extra_price || 0)} />
        </div>
      </div>
    </div>
  );
};

export default ContactLensProduct;