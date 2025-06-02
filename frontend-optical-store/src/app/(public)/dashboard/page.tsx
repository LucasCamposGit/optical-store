"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const token = localStorage.getItem("twd"); // Obtém o token do localStorage

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("base_price", basePrice);
      formData.append("category_id", categoryId);
      formData.append("image", image || new Blob());

      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao criar produto");
      }

      setSuccess("Produto criado com sucesso!");
      setName("");
      setDescription("");
      setBasePrice("");
      setCategoryId("");
      setImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar produto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Dashboard</h2>
        <p className="text-gray-500 text-center">Crie novos produtos para a loja</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
              Preço Base
            </label>
            <input
              type="number"
              id="basePrice"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              ID da Categoria
            </label>
            <input
              type="text"
              id="categoryId"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Imagem
            </label>
            <input
              type="file"
              id="image"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-[#0d4a66] text-white py-2 cursor-pointer rounded-md hover:bg-[#0d4a99] font-semibold transition duration-200"
          >
            Criar Produto
          </button>
        </form>
      </div>
    </div>
  );
}
