"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PartnersSection() {
  return (
    <section id="parceiros" className="py-16 bg-white text-center px-4">
      <div className="max-w-6xl mx-auto">
        {/* Texto superior estilo imagem */}
        <p className="text-[11px] font-normal uppercase tracking-wide text-black">
          TRABALHAMOS COM AS MELHORES MARCAS DO MERCADO,<br />
          OFERECENDO SEMPRE O QUE HÁ DE MAIS INOVADOR E CONFIÁVEL
        </p>

        {/* Título principal estilo imagem, mas em azul */}
        <h2 className="text-3xl font-bold text-blue-600 mt-2 mb-10">
          Marcas e Parceiros
        </h2>

        {/* Logos slider */}
        <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={30}
            navigation
            loop={true}
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            className="mb-12 max-w-[900px] mx-auto"
        >

          {["brand1.png", "brand2.png", "brand3.png", "brand4.png", "brand5.png"].map((logo, i) => (
            <SwiperSlide key={i} className="flex justify-center items-center w-[180px]">
              <img
                src={`/img/${logo}`}
                alt={`Logo ${i}`}
                className="w-full h-30 object-contain mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Vídeo institucional */}
      {/* Vídeo institucional com sobreposição na próxima seção */}
            <div className="relative z-20 max-w-3xl mx-auto -mb-24">
            <video
                controls
                className="rounded-lg shadow-xl w-full"
                poster="/img/video-capa.png"
            >
                <source src="/videos/video-otica.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
            </video>
            </div>
        </div>
    </section>
  );
}
