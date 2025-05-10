import ScrollIndicator from "./ScrollIndicator";

export default function HeroSection() {
  return (
    <div
      className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('/img/bg-hero.png')" }}
    >
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest">
          ÓTICA SATIKO
        </h1>
        <p className="text-2xl md:text-3xl mt-4 font-medium">
          Cuidando da sua Visão
        </p>
        <button className="mt-8 px-6 py-3 bg-white bg-opacity-20 text-black font-semibold rounded-full shadow-lg 
          hover:bg-opacity-30 hover:scale-105 active:scale-95 transition transform duration-150 cursor-pointer">
          Compre Agora
        </button>
      </div>
      <ScrollIndicator />
    </div>
  );
}
