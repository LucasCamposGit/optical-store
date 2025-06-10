"use client";

import React, { Suspense } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

// Loading component
function CartLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando carrinho...</p>
      </div>
    </div>
  );
}

// Empty cart component
function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600">Adicione alguns produtos incríveis à sua coleção!</p>
          </div>
          <Link href="/loja">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Continuar Comprando
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Cart item component
interface CartItemProps {
  item: any; // We'll use the proper type from cart context
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
  updating: boolean;
}

function CartItem({ item, onUpdateQuantity, onRemove, updating }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  const totalPrice = item.unit_price * item.qty;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Product Image */}
        <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {item.variant?.product?.image ? (
            <Image
              src={`http://localhost:8080/api/uploads/${item.variant.product.image}`}
              alt={item.variant.product.name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img/oculos-card.png';
              }}
            />
          ) : (
            <Image 
              src="/img/oculos-card.png" 
              alt="Product" 
              width={128} 
              height={128} 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {item.variant?.product?.name || 'Produto'}
          </h3>
          <div className="text-sm text-gray-600 mb-2">
            <p>SKU: {item.variant?.sku}</p>
            <p>Cor: {item.variant?.color}</p>
            <p>Tamanho: {item.variant?.size}</p>
          </div>
          <div className="text-sm text-gray-500">
            {item.variant?.stock_qty > 0 ? (
              <span className="text-green-600">Em estoque ({item.variant.stock_qty} disponíveis)</span>
            ) : (
              <span className="text-red-600">Fora de estoque</span>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.qty - 1)}
              disabled={updating || item.qty <= 1}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="px-4 py-2 text-center min-w-[3rem]">{item.qty}</span>
            <button
              onClick={() => handleQuantityChange(item.qty + 1)}
              disabled={updating || item.qty >= (item.variant?.stock_qty || 0)}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-sm text-gray-500">Unitário: {formatPrice(item.unit_price)}</div>
            <div className="text-lg font-semibold text-blue-600">{formatPrice(totalPrice)}</div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            disabled={updating}
            className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Remover item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Cart summary component
interface CartSummaryProps {
  cart: any;
  onCheckout: () => void;
}

function CartSummary({ cart, onCheckout }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Itens ({cart.total_items})</span>
          <span className="font-medium">{formatPrice(cart.total_price)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Frete</span>
          <span className="font-medium">A calcular</span>
        </div>
        
        <hr className="my-4" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-blue-600">{formatPrice(cart.total_price)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={!cart.items || cart.items.length === 0}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
      >
        Finalizar Compra
      </button>

      <Link href="/loja">
        <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition">
          Continuar Comprando
        </button>
      </Link>
    </div>
  );
}

// Main cart content component
function CartContent() {
  const { cart, loading, error, updateCartItem, removeFromCart, clearCart } = useCart();
  const [updating, setUpdating] = React.useState(false);

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    try {
      setUpdating(true);
      await updateCartItem(itemId, quantity);
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      setUpdating(true);
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing cart item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      try {
        setUpdating(true);
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Funcionalidade de checkout será implementada em breve!');
  };

  if (loading) {
    return <CartLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Link href="/loja">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Voltar à Loja
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Seu Carrinho</h1>
          <button
            onClick={handleClearCart}
            disabled={updating}
            className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Limpar Carrinho
          </button>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.items.map((item: any) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                updating={updating}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary cart={cart} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main cart page component with Suspense
export default function CartPage() {
  return (
    <Suspense fallback={<CartLoading />}>
      <CartContent />
    </Suspense>
  );
}
