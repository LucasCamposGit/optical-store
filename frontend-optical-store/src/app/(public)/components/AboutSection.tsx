export default function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row items-start bg-white p-8 gap-8">
      <div className="w-full md:w-1/2 relative">
        <div className="bg-[#3B8BA5] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wider">LOJA</h2>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3B8BA5] font-bold text-sm shadow-md">
            <span>
              Ótica<br />Olhos do Bem
            </span>
          </div>
        </div>
        <img
          src="/path/to/your/image.png"
          alt="Ótica loja"
          className="w-full object-cover h-[300px] md:h-full"
        />
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">A ÓTICA OLHOS DO BEM</h1>
        <p className="text-gray-700 mb-4">
          Nós da Ótica Olhos do Bem, priorizamos as pessoas e o nosso objetivo é levar
          uma melhor qualidade de vida através da boa visão...
        </p>
        <p className="text-gray-700">
          Para isso, contamos com uma equipe de profissionais especialistas qualificados
          no segmento ótico, que podem garantir o máximo de conforto, beleza e tecnologia
          na escolha de armações e lentes.
        </p>
      </div>
    </div>
  );
}


