import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa';

export default function ContactBar() {
  return (
    <div className="bg-white border-t border-gray-300 text-sm text-gray-800 px-4 py-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
          {/* <div className="flex items-center space-x-1">
            <FaHome />
            <span>Início</span>
          </div> */}

          {/* <div className="hidden md:block">|</div> */}

          <div className="flex items-center space-x-1">
            <FaPhone />
            <span>Telefone: (11) 2956-9466</span>
          </div>

          {/* <div className="hidden md:block">|</div> */}

          {/* <div className="flex items-center space-x-1">
            <FaEnvelope />
            <span>
              Email: <a href="mailto:contato@olhosdobem.com.br" className="text-blue-600 hover:underline">contato@olhosdobem.com.br</a>
            </span>
          </div> */}

          <div className="hidden md:block">|</div>

          <div className="flex items-center space-x-1">
            <FaWhatsapp />
            <span>WhatsApp: (11) 94564-7329</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 justify-center md:justify-end text-lg">
          <a target="_blank" href="https://wa.me/5511945647329?text=Olá!%20Gostaria%20de%20saber%20mais" className="hover:text-pink-500"><FaWhatsapp /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
}
