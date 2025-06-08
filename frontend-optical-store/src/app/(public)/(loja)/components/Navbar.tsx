import { IoGlassesOutline } from "react-icons/io5";
import { MdArrowDropDown } from 'react-icons/md';
import { BsSunglasses } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="bg-[#1c658c] text-white text-sm font-medium py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">

        {/* Menu Items */}
        <ul className="flex flex-wrap items-center space-x-6 py-3">
          <li className="hover:underline cursor-pointer">HOME</li>

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

        {/* "Enviar Receita" button */}
        <div className="bg-white text-[#1c658c] font-semibold px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
          ENVIAR RECEITA
        </div>
      </div>
    </nav>
  );
}
