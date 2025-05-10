"use client"

export default function ScrollIndicator() {
  const scrollToNextSection = () => {
    // Altura da janela de visualização como referência para determinar a próxima seção
    const viewportHeight = window.innerHeight;
    
    // Rolar para a próxima seção (aproximadamente a altura da viewport)
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" 
      onClick={scrollToNextSection}
      aria-label="Rolar para a próxima seção"
    >
      <div className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
