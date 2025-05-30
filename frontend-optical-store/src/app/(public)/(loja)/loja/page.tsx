// import Image from 'next/image';

// export default function Store() {
//   return (
//     <div>
//       <section className="bg-blue-100 py-8">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-semibold mb-4">Armações a partir de R$ 89,00</h2>
//           <p className="text-lg">Confira nossas promoções especiais!</p>
//         </div>
//       </section>

//       <section className="container mx-auto py-8 px-6">
//         <h2 className="text-3xl font-semibold mb-6">Destaques</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <Image src="" alt="Lentes de Contato Colorida Solflex Color Hype" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
//               <h3 className="text-lg font-medium">Lentes de Contato Colorida Solflex Color Hype</h3>
//               <p className="text-blue-600 font-bold mt-2">R$ 135,00</p>
//               <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
//           </div>

//           <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <Image src="" alt="Óculos de Grau Atitude AT7133" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
//               <h3 className="text-lg font-medium">Óculos de Grau Atitude AT7133</h3>
//               <p className="text-blue-600 font-bold mt-2">R$ 240,00</p>
//               <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
//           </div>

//           <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <Image src="" alt="Lentes de Contato Incolor Acuvue Oasys" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
//               <h3 className="text-lg font-medium">Lentes de Contato Incolor Acuvue Oasys</h3>
//               <p className="text-blue-600 font-bold mt-2">R$ 264,90</p>
//               <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
//           </div>

//           <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <Image src="" alt="Óculos de Grau Carolina Herrera CH0038 RHL" width={300} height={200} className="w-full h-48 object-cover mb-4"/>
//               <h3 className="text-lg font-medium">Óculos de Grau Carolina Herrera CH0038 RHL</h3>
//               <p className="text-blue-600 font-bold mt-2">R$ 1.480,00</p>
//               <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Adicionar ao Carrinho</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  image: string;
  variants: string[];
};

export default function TesteAPI() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  // Corrige urlImage para evitar localhost em produção
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const urlImage = apiUrl ? `${apiUrl}/api/uploads/` : "";

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const data = await res.json();
        setProdutos(data);      } catch {
        setErro("Erro ao conectar com a API");
      }
    };

    fetchProdutos();
  }, []);

  if (erro) {
    return <div className="p-4 text-red-500">{erro}</div>;
  }

  return (
    <div>
       <section className="bg-blue-100 py-8">
         <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-semibold mb-4">Armações a partir de R$ 89,00</h2>
           <p className="text-lg">Confira nossas promoções especiais!</p>
         </div>
      </section>
        <div className="p-8">
         <h2 className="text-3xl font-semibold mb-6">Destaques</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="p-4 border rounded shadow">
                {produto.image && (
                  <Image
                    src={urlImage + produto.image}
                    alt={produto.name}
                    width={400}
                    height={300}
                    className="w-full h-40 object-cover mb-4 rounded"
                    unoptimized={apiUrl.startsWith("http://localhost")}
                  />
                )}
                <h2 className="text-xl font-semibold">{produto.name}</h2>
                <p className="text-gray-600">{produto.description}</p>
                <p className="mt-2 font-bold text-[#0d4a66]">
                  R$ {produto.base_price.toFixed(2)}
                </p>
                <button className="mt-4 w-full bg-[#0d4a66] text-white py-2 cursor-pointer rounded hover:bg-[#0d4a99]">Adicionar ao Carrinho</button>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
