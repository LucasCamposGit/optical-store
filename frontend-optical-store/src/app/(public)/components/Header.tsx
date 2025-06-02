"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile ao carregar e ao redimensionar
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Verificar inicialmente
    checkIfMobile();
    
    // Adicionar event listener para redimensionamento
    window.addEventListener('resize', checkIfMobile);
    
    // Limpar event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fechar menu ao clicar em um link (para mobile)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-[#0d4a66] text-white flex items-center justify-between px-10 py-4 shadow-md fixed top-0 w-full z-50">
      {/* LOGO */}
      <div className="flex items-center space-x-3">
        <Image src="/img/satiko-logo.png" alt="Óticas Satiko" width={80} height={80} className="h-20 w-auto" />
      </div>

      {/* BOTÃO HAMBÚRGUER (visível apenas em mobile) */}
      <button 
        className="lg:hidden flex flex-col space-y-1.5 z-50" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        <span className={`block w-8 h-0.5 bg-white transition duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-8 h-0.5 bg-white transition duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-8 h-0.5 bg-white transition duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* MENU DESKTOP */}
      <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
        <a href="#" className="relative text-white after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1">
          Home
        </a>
        <a href="#sobre-nos" className="hover:text-blue-200 transition">Sobre Nós</a>
        <a href="#servicos" className="hover:text-blue-200 transition">Serviços</a>
        <a href="#parceiros" className="hover:text-blue-200 transition">Parceiros</a>
        <a href="#diferenciais" className="hover:text-blue-200 transition">Diferenciais</a>

          {/* LOJA com cor gold mantendo o estilo */}
        <a
          href="/loja"
          className="relative px-3 py-1 rounded-md bg-[#f5cc59] text-[#3b2f00] hover:bg-[#d4af37] hover:text-white transition"
        >
          LOJA
        </a>
        <a href="#contato" className="hover:text-blue-200 transition">Depoimentos</a>
      </nav>


      {/* MENU MOBILE (overlay) */}
      <div className={`lg:hidden fixed inset-0 bg-[#0d4a66] transition-all duration-300 z-40 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <nav className="flex flex-col items-center space-y-6 text-lg font-semibold text-white">
            <a href="#" onClick={handleLinkClick} className="relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1">
              Home
            </a>
            <a href="#sobre-nos" onClick={handleLinkClick} className="hover:text-blue-200 transition">Sobre Nós</a>
            <a href="#servicos" onClick={handleLinkClick} className="hover:text-blue-200 transition">Serviços</a>
            <a href="#parceiros" onClick={handleLinkClick} className="hover:text-blue-200 transition">Parceiros</a>
            <a href="#diferenciais" onClick={handleLinkClick} className="hover:text-blue-200 transition">Diferenciais</a>
            <a
              href="/loja"
              onClick={handleLinkClick}
              className="relative px-3 py-1 rounded-md bg-[#f5cc59] text-[#3b2f00] hover:bg-[#d4af37] hover:text-white transition"
            >
              LOJA
            </a>
            <a href="#contato" onClick={handleLinkClick} className="hover:text-blue-200 transition">Depoimentos</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
