// export default function AboutSection() {
//   return (
//     <div className="flex flex-col md:flex-row items-start bg-white p-8 gap-8" id="sobre-nos">
//       <div className="w-full md:w-1/2 relative">
//         <div className="bg-[#3B8BA5] text-white p-4 flex items-center justify-between">
//           <h2 className="text-xl font-bold tracking-wider">LOJA</h2>
//           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3B8BA5] font-bold text-sm shadow-md">
//             <span>
//               Ótica<br />Olhos do Bem
//             </span>
//           </div>
//         </div>
//         <img
//           src="/path/to/your/image.png"
//           alt="Ótica loja"
//           className="w-full object-cover h-[300px] md:h-full"
//         />
//       </div>

//       <div className="w-full md:w-1/2">
//         <h1 className="text-3xl font-bold mb-4">A ÓTICA SATIKO</h1>
//         <p className="text-gray-700 mb-4">
//           Nós da Ótica Satiko, priorizamos as pessoas e o nosso objetivo é levar
//           uma melhor qualidade de vida através da boa visão...
//         </p>
//         <p className="text-gray-700">
//           Para isso, contamos com uma equipe de profissionais especialistas qualificados
//           no segmento ótico, que podem garantir o máximo de conforto, beleza e tecnologia
//           na escolha de armações e lentes.
//         </p>
//       </div>
//     </div>
//   );
// }

export default function AboutSection() {
  return (
    <section id="sobre-nos" className="bg-white-100 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Imagem com selo */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="/img/modeloAbout.png"
            alt="Ótica Satiko"
            className="rounded-xl shadow-lg object-cover w-full h-full max-h-[400px]"
          />
          <div className="absolute bottom-4 left-4 bg-white text-sm text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md">
            + 4 ANOS DE EXPERIÊNCIA
          </div>
        </div>

        {/* Texto */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Somos mais que uma Ótica
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-justify">
            A Ótica Satiko é dedicada em oferecer produtos de qualidade. A Ótica Satiko traz um atendimento personalizado com foco no conforto e estilo dos nossos clientes. Trabalhamos com as melhores lentes e as melhores armações do mercado óptico, utilizando tecnologia de ponta para maximizar a sua experiência visual. Nosso compromisso é transformar a maneira como você vê o mundo, com atenção plena ao estilo e às suas necessidades e visão. Vamos te valorizar e destacar a qualidade e sua identidade com nosso atendimento!
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer hover:bg-blue-700 active:scale-95 active:translate-y-[1px]">
            ENTRE EM CONTATO
          </button>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Missão</h3>
          <p className="text-gray-600">
            Oferecer produtos e serviços de alta qualidade para melhorar a saúde visual dos nossos clientes.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Visão</h3>
          <p className="text-gray-600">
            Ser referência em ótica na nossa região, unindo inovação e excelência.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Valores</h3>
          <p className="text-gray-600">
            Compromisso, transparência, inovação e respeito aos clientes.
          </p>
        </div>
      </div>
    </section>
  );
}

