export default function LojaSection() {
  return (
    <section id="loja" className="py-20 px-4 text-center bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Título e subtítulo */}
        <p className="text-xs font-medium uppercase tracking-wide text-black-500">
          Nossa Loja
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-black mt-2">
            Seu novo óculos <span className="text-blue-600 font-bold">ideal</span> está aqui.
        </h2>



        {/* Botão para a loja */}
        <a
          href="/loja"
          className="inline-block mt-2 text-blue-600 text-sm font-medium hover:underline transition"
        >
          Ir para a loja &rarr;
        </a>

        {/* Card da loja */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
            <img
              src="/img/oculos-card.png"
              alt="Loja de Óculos"
              className="w-full h-64 object-cover"
            />
            {/* Texto sobreposto */}
            <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end text-left">
              <h3 className="text-white text-xl font-semibold mb-2">
                Descubra a coleção perfeita para você
              </h3>
              <a
                href="/loja"
                className="text-white text-sm underline hover:text-blue-300 transition"
              >
                Ver produtos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
