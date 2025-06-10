"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { IoGlassesOutline } from "react-icons/io5";
import { MdArrowDropDown } from 'react-icons/md';
import { BsSunglasses } from "react-icons/bs";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-[#1c658c] text-white text-sm font-medium py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">

        {/* Menu Items */}
        <ul className="flex flex-wrap items-center space-x-6 py-3">
          <li className="hover:underline cursor-pointer">
            <Link href="/">HOME</Link>
          </li>

          <li className="flex items-center space-x-1 hover:underline cursor-pointer">
            <BsSunglasses size="2em" className="mx-1"/>
            <span>ÓCULOS DE SOL</span>
            <MdArrowDropDown />
          </li>

          <li className="flex items-center space-x-1 hover:underline cursor-pointer">
            <IoGlassesOutline size="2em" className="mx-1" />
            <span>ÓCULOS DE GRAU</span>
            <MdArrowDropDown />
          </li>
        </ul>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon with Badge */}
          <Link href="/carrinho">
            <div className="relative cursor-pointer hover:bg-blue-700 p-2 rounded transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* "Enviar Receita" button */}
          <div className="bg-white text-[#1c658c] font-semibold px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
            ENVIAR RECEITA
          </div>
        </div>
      </div>
    </nav>
  );
}
