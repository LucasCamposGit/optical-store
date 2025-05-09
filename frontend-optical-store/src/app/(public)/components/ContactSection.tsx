"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ContatoSection() {
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
    spaceBetween={20}
    slidesPerView={1}
    navigation
    breakpoints={{
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="mb-20"
  >
    {[
      {
        nome: "Mariana Lima",
        texto: "Excelente! Tive a melhor experiência. Voltarei com certeza!",
        estrelas: 5,
        data: "18/02/2025"
      },
      {
        nome: "Vinícius Miguel",
        texto: "Atendimento muito bom e ótimos produtos.",
        estrelas: 4,
        data: "18/02/2025"
      },
      {
        nome: "Fernanda Pereira",
        texto: "Loja linda, equipe atenciosa e ótimas opções de óculos.",
        estrelas: 5,
        data: "18/02/2025"
      },
      {
        nome: "João Batista",
        texto: "Atendimento impecável. Super recomendo!",
        estrelas: 5,
        data: "18/02/2025"
      },
      {
        nome: "Carla Mendes",
        texto: "Boa variedade e ótimo custo-benefício.",
        estrelas: 4,
        data: "18/02/2025"
      },
      {
        nome: "Lucas Araujo",
        texto: "Comprei meus óculos aqui e adorei!",
        estrelas: 5,
        data: "18/02/2025"
      },
    ].map((d, i) => (
      <SwiperSlide key={i}>
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between transition-transform hover:scale-[1.05] hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={`/img/avatar-${i + 1}.jpg`} // você pode adaptar o caminho
                alt={d.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-black">{d.nome}</p>
                <p className="text-xs text-gray-500">{d.data || "15/02/2025"}</p>
              </div>
            </div>
          </div>
          <p className="text-yellow-500 mb-2 text-sm">
            {"★".repeat(d.estrelas)}{"☆".repeat(5 - d.estrelas)}
          </p>
          <p className="text-sm text-gray-700">{d.texto}</p>
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
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <input
                type="text"
                placeholder="Nome"
                className="p-3 border border-gray-300 rounded-md bg-white text-black"
            />
            <input
                type="email"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md bg-white text-black"
            />
            <input
                type="text"
                placeholder="Assunto"
                className="md:col-span-2 p-3 border border-gray-300 rounded-md bg-white text-black"
            />
            <textarea
                placeholder="Mensagem"
                // rows="4"
                className="md:col-span-2 p-3 border border-gray-300 rounded-md bg-white text-black"
            />
            <button
                type="submit"
                className="md:col-span-2 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition"
            >
                Enviar
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
          <img
            src="/img/loja.png"
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