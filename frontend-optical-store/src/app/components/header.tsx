export default function Header() {
  return (
    <div className="bg-[#0d4a66] text-white flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-6">
        <a href="#" className="text-sm font-bold hover:underline">HOME</a>

        <div className="flex items-center space-x-1 cursor-pointer">
          <span>🕶️</span>
          <span className="text-sm font-bold hover:underline">ÓCULOS DE SOL</span>
          <span>▼</span>
        </div>

        <div className="flex items-center space-x-1 cursor-pointer">
          <span>👓</span>
          <span className="text-sm font-bold hover:underline">ÓCULOS DE GRAU</span>
          <span>▼</span>
        </div>
      </div>
    </div>
  );
}
