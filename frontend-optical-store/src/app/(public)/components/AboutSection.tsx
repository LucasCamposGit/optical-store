import Image from 'next/image';
import Link from 'next/link';
import { Eye, Target, HeartHandshake } from "lucide-react"; // ícones sugeridos

export default function AboutSection() {
  return (
    <section id="sobre-nos" className="bg-white-100 py-16 px-6 lg:px-20">      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Imagem com selo */}
        <div className="relative w-full lg:w-1/2">
          <Image
            src="/img/modeloAbout.png"
            alt="Ótica Satiko"
            width={800}
            height={600}
            className="rounded-xl shadow-lg object-cover w-full h-full max-h-[400px]"
          />
          <div className="absolute bottom-4 left-4 bg-white text-sm text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md">
            + 37 ANOS DE EXPERIÊNCIA
          </div>
        </div>

        {/* Texto */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Somos mais que uma Ótica
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-justify">
            A Ótica Satiko é dedicada em oferecer produtos de qualidade. Traz um atendimento personalizado com foco no conforto e estilo dos nossos clientes. Trabalhamos com as melhores lentes e as melhores armações do mercado óptico, utilizando tecnologia de ponta para maximizar a sua experiência visual. Nosso compromisso é transformar a maneira como você vê o mundo, com atenção plena ao estilo e às suas necessidades e visão. Vamos te valorizar e destacar a qualidade e sua identidade com nosso atendimento!
          </p>

          <Link  href="https://wa.me/5511945647329?text=Olá!%20Gostaria%20de%20saber%20mais">
            <button className="bg-[#0d4a66] text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer hover:bg-[#0d4a99] active:scale-95 active:translate-y-[1px]">
              ENTRE EM CONTATO
            </button>
          </Link>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
     <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="flex justify-center mb-4">
            <Eye className="w-10 h-10 text-[#0d4a66]" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Missão</h3>
          <p className="text-gray-600">
            Oferecer produtos e serviços de alta qualidade para melhorar a saúde visual dos nossos clientes.
          </p>
        </div>
        <div>
          <div className="flex justify-center mb-4">
            <Target className="w-10 h-10 text-[#0d4a66]" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Visão</h3>
          <p className="text-gray-600">
            Ser referência em ótica na nossa região, unindo inovação e excelência.
          </p>
        </div>
        <div>
          <div className="flex justify-center mb-4">
            <HeartHandshake className="w-10 h-10 text-[#0d4a66]" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Valores</h3>
          <p className="text-gray-600">
            Compromisso, transparência, inovação e respeito aos clientes.
          </p>
        </div>
      </div>
    </section>
  );
}

