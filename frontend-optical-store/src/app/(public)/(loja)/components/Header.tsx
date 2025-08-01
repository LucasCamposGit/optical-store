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
      <div className="flex flex-col md:flex-row items-center flex-start max-w-7xl mx-auto space-y-3 md:space-y-0">
          {/* Logo */}
        <div className="ml-10">
          <Image
            src="/img/satiko-logo.png"
            alt="Ótica Olhos do Bem"
            width={80}
            height={80}
            className="h-20 w-auto rounded-full"
          />
        </div>    
            {/* Search Bar */}
        <div className="bg-[#ffffff] w-full max-w-xl ml-50">
          <form onSubmit={handleSearch} className="flex border rounded">
            <input
              type="text"
              placeholder="Digite o produto"
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
      </div>
    </div>
  );
}
