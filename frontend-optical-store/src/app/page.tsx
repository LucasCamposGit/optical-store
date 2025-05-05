import Header from "./components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div
        className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/bg-hero.png')" }} // coloque sua imagem aqui
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
    </div>
  );
}
