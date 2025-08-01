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
          <li className="hover:text-[#66afff] cursor-pointer">
            <Link href="/">HOME</Link>
          </li>

          <li className="flex items-center space-x-1 hover:text-[#66afff] cursor-pointer">
            <BsSunglasses size="2em" className="mx-1"/>
            <Link href="/loja?category=2">
              <span>ÓCULOS DE SOL</span>
            </Link>
            {/* <MdArrowDropDown /> */}
          </li>

          <li className="flex items-center space-x-1 hover:text-[#66afff] cursor-pointer">
            <IoGlassesOutline size="2em" className="mx-1" />
            <Link href="/loja?category=1">
              <span>ÓCULOS DE GRAU</span>
            </Link>
            {/* <MdArrowDropDown /> */}
          </li>
        </ul>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* "Enviar Receita" button */}
          <div className="bg-white text-[#1c658c] font-semibold px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
            <a href="/receita" className="flex items-center">
              ENVIAR RECEITA
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
