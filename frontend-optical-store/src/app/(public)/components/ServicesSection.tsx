import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section id="servicos" className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Nossos Serviços</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Cuidando da sua Visão com <span className="text-blue-600">Excelência e Dedicação!</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Serviço 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <Image src="/img/service1.png" alt="Exames de Vista" width={400} height={224} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Exames de Vista</h3>
              <p className="text-gray-600">
                Contamos com profissionais especializados para avaliar sua visão e recomendar a melhor solução.
              </p>
            </div>
          </div>

          {/* Serviço 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <Image src="/img/service2.png" alt="Ajustes e Manutenção" width={400} height={224} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ajustes e Manutenção</h3>
              <p className="text-gray-600">
                Nossos especialistas garantem que seus óculos estejam sempre confortáveis e ajustados.
              </p>
            </div>
          </div>

          {/* Serviço 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <Image src="/img/service3.png" alt="Consultoria Personalizada" width={400} height={224} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Consultoria Personalizada</h3>
              <p className="text-gray-600">
                Ajudamos você a escolher as melhores lentes e armações para seu estilo e necessidade.
              </p>
            </div>
          </div>
        </div>

        {/* Botão */}
        <div className="mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-blue-700 transition active:scale-95 active:translate-y-[1px]">
            ENTRE EM CONTATO
          </button>
        </div>
      </div>
    </section>
  );
}
