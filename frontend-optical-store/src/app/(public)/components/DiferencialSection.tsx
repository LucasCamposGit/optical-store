export default function DiferenciaisSection() {
  return (
    <section
      id="diferenciais"
      className="relative z-10 bg-[url('/img/textura.png')] bg-cover bg-center py-32 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Título pequeno */}
        <p className="text-xs uppercase tracking-widest text-black-600">
          Nossos Diferenciais
        </p>

        {/* Título principal */}
        <h2 className="text-3xl font-semibold mt-2 text-black">
          Excelência que você vê e <span className="text-[#0d4a66] font-bold">confia!</span>
        </h2>

        {/* Cards de diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold mb-2">
              Atendimento especializado e humanizado
            </p>
            <p className="text-sm text-gray-700">
              Nossa equipe é treinada para oferecer um atendimento próximo, com empatia e qualidade, criando conexões e soluções sob medida para a sua vida.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold mb-2">
              Variedade de marcas e modelos
            </p>
            <p className="text-sm text-gray-700">
              Trabalhamos com as melhores marcas do mercado, oferecendo uma ampla seleção de armações, lentes e acessórios para atender às suas necessidades.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold mb-2">
              Tecnologia de última geração em lentes oftálmicas
            </p>
            <p className="text-sm text-gray-700">
              Utilizamos tecnologia de ponta para proporcionar o melhor desempenho visual, garantindo praticidade e proteção aos seus olhos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <p className="font-semibold mb-2">
              Condições especiais de pagamento
            </p>
            <p className="text-sm text-gray-700">
              Facilitamos sua compra com opções de pagamento acessíveis e flexíveis, para que você cuide da sua visão sem preocupações.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold mb-2">
              Garantia e suporte pós-venda
            </p>
            <p className="text-sm text-gray-700">
              Oferecemos garantia e suporte dedicado para assegurar a melhor experiência com sua escolha após a compra.
            </p>
          </div>
        </div>

        {/* Botão de contato */}
        <div className="mt-12">
          <a
            href="https://wa.me/5511945647329?text=Olá!%20Gostaria%20de%20saber%20mais"
            className="bg-[#0d4a66] text-white font-medium px-6 py-3 rounded-full hover:bg-[#0d4a99] transition"
          >
            ENTRE EM CONTATO
          </a>
        </div>
      </div>
    </section>
  );
}
