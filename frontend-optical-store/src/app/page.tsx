import Header from "./components/header"
export default function Home() {
  return (
    <div>
      <Header />
      <div
        className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/img/bg-hero.png')" }} // coloque sua imagem aqui
      >
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest">
            ÓTICA OLHOS DO BEM
          </h1>
          <p className="text-2xl md:text-3xl mt-4 font-medium">
            Cuidando da sua Visão
          </p>

          <button className="mt-8 px-6 py-3 bg-white bg-opacity-20 text-white font-semibold rounded-full shadow-lg hover:bg-opacity-30 transition">
            Compre Agora
          </button>
        </div>
        {/* Ícone de scroll para baixo */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Botão WhatsApp flutuante */}
        <a
          href="https://wa.me/seunumerowhatsapp"
          className="fixed bottom-6 right-6 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.5 3.5A11.8 11.8 0 0012 1a11.9 11.9 0 00-9.4 19.2l-1.6 4.6 4.7-1.6A11.9 11.9 0 0012 23a11.8 11.8 0 008.5-19.5zm-8.5 17a9.7 9.7 0 01-5.1-1.4l-.4-.2-2.8.9.9-2.7-.2-.4A9.7 9.7 0 1112 20.5zm5.3-7.8l-2.2-1c-.3-.1-.6-.1-.8.1l-.7.9c-.2.3-.6.4-.9.2a7.2 7.2 0 01-3.5-3.5c-.1-.3 0-.6.2-.8l.9-.7c.2-.2.3-.5.2-.8l-1-2.2c-.2-.5-.7-.7-1.2-.5-1.2.6-2 2-1.7 3.3a10.6 10.6 0 004.8 6.3c1.3.7 2.7.9 4 .4 1.3-.4 2.7-1.5 3.3-2.7.2-.5 0-1-.5-1.2z" />
          </svg>
        </a>
      </div>
      <div className="flex flex-col md:flex-row items-start bg-white p-8 gap-8">
      {/* another section */}
        {/* Left Panel */}
        <div className="w-full md:w-1/2 relative">
          <div className="bg-[#3B8BA5] text-white p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-wider">LOJA</h2>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3B8BA5] font-bold text-sm shadow-md">
              <span>Ótica<br />Olhos do Bem</span>
            </div>
          </div>
          <img
            src="/path/to/your/image.png"
            alt="Ótica loja"
            className="w-full object-cover h-[300px] md:h-full"
          />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">A ÓTICA OLHOS DO BEM</h1>
          <p className="text-gray-700 mb-4">
            Nós da Ótica Olhos do Bem, priorizamos as pessoas e o nosso objetivo é levar
            uma melhor qualidade de vida através da boa visão. Considerando as mudanças
            habituais das últimas gerações, sabemos o grande impacto que a tecnologia dos
            computadores, celulares, tablets e as longas jornadas de trabalho podem causar
            ao sistema visual.
          </p>
          <p className="text-gray-700">
            Para isso, contamos com uma equipe de profissionais especialistas qualificados
            no segmento ótico, que podem garantir o máximo de conforto, beleza e tecnologia
            na escolha de armações e lentes.
          </p>
        </div>
      </div>

      {/* another section */}
      <div className="flex flex-wrap justify-center gap-8 py-10 bg-white">
      
      {/* Item 1 */}
      <div className="flex flex-col items-center text-center max-w-[150px]">
        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M9 20v-2a3 3 0 013-3h0a3 3 0 013 3v2M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="mt-2 text-gray-700 font-medium text-sm">Priorizamos as Pessoas</p>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col items-center text-center max-w-[150px]">
        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 10h4.764a1 1 0 01.832 1.555l-5.528 8.06a1 1 0 01-1.696 0l-5.528-8.06A1 1 0 017.236 10H12" />
        </svg>
        <p className="mt-2 text-gray-700 font-medium text-sm">Qualidade de Vida</p>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col items-center text-center max-w-[150px]">
        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2l8 4v6c0 5.25-3.15 10.74-8 12-4.85-1.26-8-6.75-8-12V6l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <p className="mt-2 text-gray-700 font-medium text-sm">Produtos de Qualidade</p>
      </div>

      {/* Item 4 */}
      <div className="flex flex-col items-center text-center max-w-[150px]">
        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2a7 7 0 00-7 7c0 4.5 7 11 7 11s7-6.5 7-11a7 7 0 00-7-7z" />
          <path d="M12 8v.01" />
          <path d="M12 10h.01" />
        </svg>
        <p className="mt-2 text-gray-700 font-medium text-sm">Profissionais Especialistas</p>
      </div>
    </div>

    </div>
  );
}
