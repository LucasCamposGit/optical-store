"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  image: string;
};

type ProductFormData = {
  name: string;
  description: string;
  base_price: string;
  category_id: string;
  image: File | null;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    base_price: "",
    category_id: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const imageUrl = apiUrl ? `${apiUrl}/api/uploads/` : "";
  
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`);
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProducts(data || []);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error(err);
    }
  }, [apiUrl]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      base_price: "",
      category_id: "",
      image: null,
    });
    setEditingProduct(null);
    setError("");
    setSuccess("");
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        base_price: product.base_price.toString(),
        category_id: product.category_id.toString(),
        image: null,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("twd");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("base_price", formData.base_price);
      formDataToSend.append("category_id", formData.category_id);
      
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const url = editingProduct 
        ? `${apiUrl}/api/products/${editingProduct.id}`
        : `${apiUrl}/api/products`;
      
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ao ${editingProduct ? "atualizar" : "criar"} produto`);
      }

      setSuccess(`Produto ${editingProduct ? "atualizado" : "criado"} com sucesso!`);
      fetchProducts(); // Refresh the list
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao ${editingProduct ? "atualizar" : "criar"} produto`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      const token = localStorage.getItem("twd");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao excluir produto");
      }

      setSuccess("Produto excluído com sucesso!");
      fetchProducts(); // Refresh the list
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir produto");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard - Gerenciar Produtos</h1>
              <p className="text-gray-600 mt-2">Gerencie os produtos da sua loja</p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-[#0d4a66] text-white px-6 py-3 rounded-lg hover:bg-[#0d4a99] font-semibold transition duration-200"
            >
              Adicionar Produto
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {product.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={`${imageUrl}${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized={apiUrl.startsWith("http://localhost")}
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-[#0d4a66] mb-4">
                  R$ {product.base_price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-400 text-sm mt-2">Clique em &quot;Adicionar Produto&quot; para começar</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? "Editar Produto" : "Adicionar Produto"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição *
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Preço Base *
                    </label>
                    <input
                      type="number"
                      id="basePrice"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                      value={formData.base_price}
                      onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                      ID da Categoria *
                    </label>
                    <input
                      type="number"
                      id="categoryId"
                      min="1"
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Imagem {!editingProduct && "*"}
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    required={!editingProduct}
                  />
                  {editingProduct && (
                    <p className="text-sm text-gray-500 mt-1">
                      Deixe em branco para manter a imagem atual
                    </p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#0d4a66] text-white py-2 px-4 rounded-md hover:bg-[#0d4a99] font-semibold transition duration-200 disabled:opacity-50"
                  >
                    {loading ? "Salvando..." : editingProduct ? "Atualizar" : "Criar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
