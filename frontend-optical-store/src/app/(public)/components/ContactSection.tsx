"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

interface FormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export default function ContatoSection() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Por favor, insira um email válido.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      
      const response = await fetch(`${apiUrl}/api/suportes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          assunto: formData.assunto,
          mensagem: formData.mensagem,
          data: new Date().toISOString(),
          status: 'pendente'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem. Tente novamente.');
      }

      setMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setMessageType('success');
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      });

      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Erro ao enviar mensagem. Tente novamente.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contato" className="bg-blue-50  pt-20 pb-0">
      {/* Depoimentos */}
<div className="max-w-6xl mx-auto px-4 text-center bg-gray-50 py-12 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <p className="text-xs font-medium uppercase tracking-wide text-black-500 uppercase">
          Depoimentos
    </p>
    <h2 className="text-2xl md:text-3xl font-semibold text-black mb-10">
        Experiências que falam por si!
    </h2>

  <Swiper
    modules={[Navigation]}
    spaceBetween={30}
    slidesPerView={1}
    navigation
    breakpoints={{
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    }}
    className="mb-20"
  >
    {[
      {
        nome: "Mariana Lima",
        texto: "Excelente! Tive a melhor experiência. Voltarei com certeza!",
        estrelas: 5,
        data: "15/12/2024"
      },
      {
        nome: "Vinícius Miguel",
        texto: "Atendimento muito bom e ótimos produtos.",
        estrelas: 4,
        data: "03/01/2025"
      },
      {
        nome: "Fernanda Pereira",
        texto: "Loja linda, equipe atenciosa e ótimas opções de óculos.",
        estrelas: 5,
        data: "28/11/2024"
      },
      {
        nome: "João Batista",
        texto: "Atendimento impecável. Super recomendo!",
        estrelas: 5,
        data: "12/01/2025"
      },
      {
        nome: "Carla Mendes",
        texto: "Boa variedade e ótimo custo-benefício.",
        estrelas: 4,
        data: "07/12/2024"
      },
      {
        nome: "Lucas Araujo",
        texto: "Comprei meus óculos aqui e adorei!",
        estrelas: 5,
        data: "22/01/2025"
      },
    ].map((d, i) => (
      <SwiperSlide key={i} className="h-auto mb-4">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg h-full min-h-[200px] flex flex-col justify-between transition-transform hover:scale-[1.02] hover:shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-black">{d.nome}</p>
                  <p className="text-yellow-500 text-sm">
                    {"★".repeat(d.estrelas)}{"☆".repeat(5 - d.estrelas)}
                  </p>
                </div>
                <p className="text-xs text-gray-500 text-left">{d.data}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{d.texto}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


      {/* Contato */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 px-4"
        style={{ backgroundImage: "url('/img/fundo-contato.png')" }} // substitua com a imagem real
        >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative max-w-4xl mx-auto text-center text-white z-10">
            <p className="text-xs uppercase text-gray-200 mb-2">Suporte</p>
            <h2 className="text-2xl font-semibold mb-6">Fale conosco</h2>
            <p className="text-sm text-gray-200 mb-10 max-w-xl mx-auto">
            Preencha os campos abaixo e entraremos em contato o mais breve possível. Estamos prontos para ajudar você a encontrar a melhor solução para a sua visão.
            </p>

            {/* Mensagem de feedback */}
            {message && (
              <div className={`mb-6 p-4 rounded-md ${
                messageType === 'success' 
                  ? 'bg-green-100 border border-green-400 text-green-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome"
                required
                disabled={isLoading}
                className="p-3 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                disabled={isLoading}
                className="p-3 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
            <input
                type="text"
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                placeholder="Assunto"
                required
                disabled={isLoading}
                className="md:col-span-2 p-3 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
            <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleInputChange}
                placeholder="Mensagem"
                required
                disabled={isLoading}
                rows={4}
                className="md:col-span-2 p-3 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 resize-vertical"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="md:col-span-2 bg-[#0d4a66] text-white font-medium py-3 cursor-pointer rounded-md hover:bg-[#0d4a99] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
            </button>
            </form>
        </div>
        </div>


      {/* Mapa */}
      <div className="relative">
        {/* Mapa de fundo */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.749899928029!2d-46.438421899999994!3d-23.505516200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce63e26eb5d57f%3A0x15a9b7ebb42698a6!2sCentro%20%C3%93tico%20Satiko!5e0!3m2!1sen!2sbr!4v1746816130080!5m2!1sen!2sbr" // substitua com seu embed
          className="w-full h-[500px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

        {/* Card de localização */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-xs w-[90%]">
          <Image
            src="/img/loja.png"
            alt="Loja Centro Ótico Satiko"
            width={400}
            height={200}
            className="w-full h-32 object-cover rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold text-black mb-1">Centro Ótico Satiko</h3>
          <p className="text-sm text-gray-600 mb-2">
            Segunda a Sexta: 8h30 - 18h<br />
            Sábado: 8h30 - 15h<br/>
            Av. Raimundo Paradera, 129 - Vila Rosaria, São Paulo - SP, 08021-450
          </p>
          <p className="text-sm text-blue-600 font-medium">Tel: (11) 2956-9466</p>
        </div>
      </div>
    </section>
  );
}