"use client";

import { useState, useEffect, useCallback } from "react";

type Suporte = {
  id: number;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  data: string;
  status?: string;
};

export default function SuportePage() {
  const [suportes, setSuportes] = useState<Suporte[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuporte, setSelectedSuporte] = useState<Suporte | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todas");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  
  const fetchSuportes = useCallback(async () => {
    try {
      const token = localStorage.getItem("twd");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch(`${apiUrl}/api/suportes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar solicitações de suporte");
      }

      const data = await response.json();
      // O backend pode retornar um objeto com a propriedade 'suportes' ou um array direto
      const suportesArray = data.suportes || data;
      // Garantir que seja sempre um array
      setSuportes(Array.isArray(suportesArray) ? suportesArray : []);
    } catch (err) {
      setError("Erro ao carregar solicitações de suporte");
      console.error(err);
      // Em caso de erro, garantir que suportes seja um array vazio
      setSuportes([]);
    }
  }, [apiUrl]);

  // Fetch suportes on component mount
  useEffect(() => {
    fetchSuportes();
  }, [fetchSuportes]);

  const openModal = (suporte: Suporte) => {
    setSelectedSuporte(suporte);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSuporte(null);
  };

  const updateStatus = async (suporteId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("twd");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch(`${apiUrl}/api/suportes/${suporteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao atualizar status");
      }

      setSuccess("Status atualizado com sucesso!");
      fetchSuportes(); // Refresh the list
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar status");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (suporteId: number) => {
    if (!confirm("Tem certeza que deseja excluir esta solicitação de suporte?")) {
      return;
    }

    try {
      const token = localStorage.getItem("twd");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch(`${apiUrl}/api/suporte/${suporteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao excluir solicitação");
      }

      setSuccess("Solicitação de suporte excluída com sucesso!");
      fetchSuportes(); // Refresh the list
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir solicitação");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch (status.toLowerCase()) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "em andamento":
        return "bg-blue-100 text-blue-800";
      case "concluido":
        return "bg-green-100 text-green-800";
      case "fechado":
        return "bg-gray-100 text-gray-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status?: string) => {
    if (!status) return "Indefinido";
    
    switch (status.toLowerCase()) {
      case "pendente":
        return "Pendente";
      case "em andamento":
        return "Em Andamento";
      case "concluido":
        return "Concluído";
      case "fechado":
        return "Fechado";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  const filteredSuportes = suportes.filter(suporte => {
    if (statusFilter === "todas") return true;
    if (!suporte.status) return statusFilter === "indefinido";
    return suporte.status.toLowerCase() === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard - Gerenciar Suporte</h1>
              <p className="text-gray-600 mt-2">Visualize e gerencie as solicitações de suporte dos clientes</p>
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todas">Todas</option>
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
                <option value="indefinido">Indefinido</option>
              </select>
            </div>
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

        {/* Suportes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredSuportes) && filteredSuportes.map((suporte) => (
            <div key={suporte.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{suporte.nome}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(suporte.status)}`}>
                    {getStatusText(suporte.status)}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Email:</strong> {suporte.email}</p>
                  <p><strong>Assunto:</strong> {suporte.assunto}</p>
                  <p><strong>Data:</strong> {new Date(suporte.data).toLocaleDateString('pt-BR')}</p>
                </div>

                {suporte.mensagem && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    <strong>Mensagem:</strong> {suporte.mensagem}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(suporte)}
                    className="flex-1 bg-blue-500 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 text-sm"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleDelete(suporte.id)}
                    className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!Array.isArray(filteredSuportes) || filteredSuportes.length === 0) && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              {statusFilter === "todas" ? "Nenhuma solicitação de suporte encontrada" : `Nenhuma solicitação com status "${getStatusText(statusFilter)}" encontrada`}
            </p>
            <p className="text-gray-400 text-sm mt-2">As solicitações de suporte enviadas pelos clientes aparecerão aqui</p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedSuporte && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Detalhes da Solicitação de Suporte</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <p className="text-gray-900">{selectedSuporte.nome}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedSuporte.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                    <p className="text-gray-900">{selectedSuporte.assunto}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Envio</label>
                    <p className="text-gray-900">{new Date(selectedSuporte.data).toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={selectedSuporte.status}
                      onChange={(e) => updateStatus(selectedSuporte.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="em andamento">Em Andamento</option>
                      <option value="concluido">Concluído</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>

              {selectedSuporte.mensagem && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <div className="text-gray-900 bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                    {selectedSuporte.mensagem}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
