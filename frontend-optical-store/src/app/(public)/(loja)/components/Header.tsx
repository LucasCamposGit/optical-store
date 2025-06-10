"use client";

import { FaUser, FaPen, FaShoppingCart, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth, useAuthDispatch } from '@/context/LoginContext';
import { AUTH_ACTION } from '@/types/action';
import Link from 'next/link';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { cart, cartCount, totalPrice } = useCart();
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to store page with search parameter
      router.push(`/loja?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    // Clear tokens from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
      // Dispatch logout action
    dispatch({ type: AUTH_ACTION.LOGOUT });
    
    // Redirect to home
    router.push('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-[#0d4a66] px-4 py-3 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto space-y-3 md:space-y-0">
          {/* Logo */}
        <div className="ml-10">
          <Image
            src="/img/satiko-logo.png"
            alt="Ótica Olhos do Bem"
            width={80}
            height={80}
            className="h-20 w-auto rounded-full"
          />
        </div>        {/* Search Bar */}
        <div className="bg-[#ffffff] w-full max-w-xl">
          <form onSubmit={handleSearch} className="flex border rounded">
            <input
              type="text"
              placeholder="Digite o produto, código ou marca"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-gray-800 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-white px-4 text-black hover:text-[#0073a8] cursor-pointer"
            >
              <FaSearch />
            </button>
          </form>
        </div>        {/* User Actions */}
        <div className="flex items-center space-x-4 text-white text-sm">
          {auth.isAuthenticated ? (
            <>
              {/* Authenticated User Menu */}
              <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                <FaUser />
                <span>Minha Conta</span>
              </div>
              <span className="hidden md:inline">|</span>
              <div 
                className="flex items-center space-x-1 hover:underline cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Sair</span>
              </div>
            </>
          ) : (
            <>
              {/* Non-authenticated User Menu */}
              <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                <FaUser />
                <span><Link href="/login">Login</Link></span>
              </div>
              <span className="hidden md:inline">|</span>
              <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                <FaPen />
                <span><Link href="/cadastro">Cadastro</Link></span>
              </div>
            </>
          )}
          <span className="hidden md:inline">|</span>
          {/* Cart Section */}
          <Link href="/carrinho">
            <div className="flex items-center space-x-1 hover:underline cursor-pointer relative">
              <FaShoppingCart />
              <span>{formatPrice(totalPrice || 0)}</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
