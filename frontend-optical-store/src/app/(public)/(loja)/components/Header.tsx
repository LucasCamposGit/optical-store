import { FaUser, FaPen, FaShoppingCart, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="bg-[#0d4a66] px-4 py-3">
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
        </div>

        {/* Search Bar */}
        <div className="bg-[#ffffff] w-full max-w-xl">
          <div className="flex border rounded">
            <input
              type="text"
              placeholder="Digite o produto, código ou marca"
              className="w-full px-4 py-2 text-gray-800 focus:outline-none"
            />
            <button className="bg-white px-4 text-black hover:text-[#0073a8] cursor-pointer">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4 text-white text-sm">
          <div className="flex items-center space-x-1 hover:underline cursor-pointer">
            <FaUser />
            <span><a href="/login">Login</a></span>
          </div>
          <span className="hidden md:inline">|</span>
          <div className="flex items-center space-x-1 hover:underline cursor-pointer">
            <FaPen />
            <span>Cadastro</span>
          </div>
          <span className="hidden md:inline">|</span>
          <div className="flex items-center space-x-1 hover:underline cursor-pointer">
            <FaShoppingCart />
            <span>R$0,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
