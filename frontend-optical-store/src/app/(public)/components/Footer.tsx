// src/components/Footer.tsx
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0d4a66] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Coluna 1 - Sobre */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Ótica Satiko</h2>
          <p className="text-sm">
            Uma ótica com mais de 37 anos de experiência. Oferecemos óculos com lentes e armações de qualidade,
            sempre prezando pela qualidade e atendimento personalizado.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-gray-300" size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white hover:text-gray-300" size={20} />
            </a>
          </div>
        </div>

        {/* Coluna 2 - Serviços */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Serviços</h2>
          <ul className="space-y-1 text-sm">
            <li>Exames de Visão</li>
            <li>Ajustes e Manutenção</li>
            <li>Consultoria Personalizada</li>
          </ul>
        </div>

        {/* Coluna 3 - Contato */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contato</h2>
          <p className="text-sm">Email: satiko.oticas@gmail.com</p>
          <p className="text-sm">Celular: (11) 94564-7329</p>
          <p className="text-sm">Telefone: (11) 2956-9466</p>
        </div>

        {/* Coluna 4 - Endereços */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Endereços</h2>
          <ul className="text-sm space-y-1">
            <li>Av. Raimundo Paradera, 129 - Vila Rosaria, São Paulo - SP, 08021-450</li>
          </ul>
        </div>

      </div>

      {/* Rodapé inferior */}
      <div className="mt-10 border-t border-white border-opacity-10 pt-4 text-center text-sm text-white">
        © 2025 Ótica Satiko. Todos os Direitos Reservados.
      </div>
    </footer>
  );
}
