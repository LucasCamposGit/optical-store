"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  // Scroll spy para detectar seção ativa
  useEffect(() => {
    const sections = ['home', 'sobre-nos', 'servicos', 'parceiros', 'diferenciais', 'contato'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'home';
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observar todas as seções
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Se não há seções sendo observadas, definir como home
    const homeElement = document.querySelector('body > *:first-child');
    if (homeElement && !homeElement.id) {
      homeElement.id = 'home';
      observer.observe(homeElement);
    }

    return () => observer.disconnect();
  }, []);

  // Fechar menu ao clicar em um link (para mobile)
  const handleLinkClick = (sectionId: string) => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
    setActiveSection(sectionId);
  };

  // Função para verificar se a seção está ativa
  const isActive = (sectionId: string) => activeSection === sectionId;

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
        <a 
          href="#" 
          className={`relative transition ${isActive('home') ? 'text-white after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'text-white hover:text-blue-200'}`}
        >
          Home
        </a>
        <a 
          href="#sobre-nos" 
          className={`relative transition ${isActive('sobre-nos') ? 'text-white after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'text-white hover:text-blue-200'}`}
        >
          Sobre Nós
        </a>
        <a 
          href="#servicos" 
          className={`relative transition ${isActive('servicos') ? 'text-white after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'text-white hover:text-blue-200'}`}
        >
          Serviços
        </a>
        <a 
          href="#parceiros" 
          className={`relative transition ${isActive('parceiros') ? 'text-white after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'text-white hover:text-blue-200'}`}
        >
          Parceiros
        </a>
        <a 
          href="#diferenciais" 
          className={`relative transition ${isActive('diferenciais') ? 'text-white after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'text-white hover:text-blue-200'}`}
        >
          Diferenciais
        </a>

          {/* LOJA com cor gold mantendo o estilo */}
        <a
          href="/loja"
          className="relative px-3 py-1 rounded-md bg-[#f5cc59] text-[#3b2f00] hover:bg-[#d4af37] hover:text-white transition"
        >
          LOJA
        </a>
        <a 
          href="#contato" 
          className={`relative transition ${isActive('contato') ? 'text-white after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'text-white hover:text-blue-200'}`}
        >
          Depoimentos
        </a>
      </nav>


      {/* MENU MOBILE (overlay) */}
      <div className={`lg:hidden fixed inset-0 bg-[#0d4a66] transition-all duration-300 z-40 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <nav className="flex flex-col items-center space-y-6 text-lg font-semibold text-white">
            <a 
              href="#" 
              onClick={() => handleLinkClick('home')} 
              className={`relative transition ${isActive('home') ? 'after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'hover:text-blue-200'}`}
            >
              Home
            </a>
            <a 
              href="#sobre-nos" 
              onClick={() => handleLinkClick('sobre-nos')} 
              className={`relative transition ${isActive('sobre-nos') ? 'after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'hover:text-blue-200'}`}
            >
              Sobre Nós
            </a>
            <a 
              href="#servicos" 
              onClick={() => handleLinkClick('servicos')} 
              className={`relative transition ${isActive('servicos') ? 'after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'hover:text-blue-200'}`}
            >
              Serviços
            </a>
            <a 
              href="#parceiros" 
              onClick={() => handleLinkClick('parceiros')} 
              className={`relative transition ${isActive('parceiros') ? 'after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'hover:text-blue-200'}`}
            >
              Parceiros
            </a>
            <a 
              href="#diferenciais" 
              onClick={() => handleLinkClick('diferenciais')} 
              className={`relative transition ${isActive('diferenciais') ? 'after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'hover:text-blue-200'}`}
            >
              Diferenciais
            </a>
            <a
              href="/loja"
              onClick={() => handleLinkClick('loja')}
              className="relative px-3 py-1 rounded-md bg-[#f5cc59] text-[#3b2f00] hover:bg-[#d4af37] hover:text-white transition"
            >
              LOJA
            </a>
            <a 
              href="#contato" 
              onClick={() => handleLinkClick('contato')} 
              className={`relative transition ${isActive('contato') ? 'after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1' : 'hover:text-blue-200'}`}
            >
              Depoimentos
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
