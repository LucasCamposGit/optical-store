export default function Header() {
  return (
   <div className="bg-[#0d4a66] text-white flex items-center justify-between px-10 py-4 shadow-md  fixed top-0 w-full z-10">
  {/* LOGO */}
  <div className="flex items-center space-x-3">
    <img src="/img/satikologo.png" alt="Óticas Satiko" className="h-20" />
  </div>

  {/* MENU */}
  <nav className="flex items-center space-x-8 text-sm font-semibold">
    <a href="#" className="relative text-white after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:-bottom-1">
      Home
    </a>
    <a href="#sobre-nos" className="hover:text-blue-200 transition">Sobre Nós</a>
    <a href="#" className="hover:text-blue-200 transition">Serviços</a>
    <a href="#" className="hover:text-blue-200 transition">Parceiros</a>
    <a href="#" className="hover:text-blue-200 transition">Diferenciais</a>
    <a href="#" className="hover:text-blue-200 transition">LOJA</a>
    <a href="#" className="hover:text-blue-200 transition">Depoimentos</a>
  </nav>
</div>

  );
}
