import Header from "./components/Header";
import ContactBar from "./components/ContactBar";
import Navbar from "./components/Navbar";
import Image from 'next/image';
import Footer from "./components/Footer";

export default function Store() {
  return (
    <div>
      <ContactBar />
      <Header />
      <Navbar />
      <section className="bg-blue-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Armações a partir de R$ 89,00</h2>
          <p className="text-lg">Confira nossas promoções especiais!</p>
        </div>
      </section>

      <section className="container mx-auto py-8 px-6">
        <h2 className="text-3xl font-semibold mb-6">Destaques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Image src="" alt="Lentes de Contato Colorida Solflex Color Hype" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
              <h3 className="text-lg font-medium">Lentes de Contato Colorida Solflex Color Hype</h3>
              <p className="text-blue-600 font-bold mt-2">R$ 135,00</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
          </div>

          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Image src="" alt="Óculos de Grau Atitude AT7133" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
              <h3 className="text-lg font-medium">Óculos de Grau Atitude AT7133</h3>
              <p className="text-blue-600 font-bold mt-2">R$ 240,00</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
          </div>

          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Image src="" alt="Lentes de Contato Incolor Acuvue Oasys" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
              <h3 className="text-lg font-medium">Lentes de Contato Incolor Acuvue Oasys</h3>
              <p className="text-blue-600 font-bold mt-2">R$ 264,90</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
          </div>

          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Image src="" alt="Óculos de Grau Carolina Herrera CH0038 RHL" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
              <h3 className="text-lg font-medium">Óculos de Grau Carolina Herrera CH0038 RHL</h3>
              <p className="text-blue-600 font-bold mt-2">R$ 1.480,00</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
          </div>
        </div>
      </section>
      
      <Footer />

    </div>
  );
}
