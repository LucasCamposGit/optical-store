'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReceitaPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    telefone: '',
    num_pedido: '',
    descricao: '',
    receita: null as File | null,
    dp: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Aplicar máscara para telefone e whatsapp
    if (name === 'whatsapp' || name === 'telefone') {
      const maskedValue = applyPhoneMask(value);
      setFormData(prev => ({
        ...prev,
        [name]: maskedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const applyPhoneMask = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (DD) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else {
      // Limita a 11 dígitos
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      
      // Verificar se há token de autenticação (opcional para receitas)
      const token = localStorage.getItem("twd");
      
      // Criar FormData para enviar arquivos
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('whatsapp', formData.whatsapp);
      formDataToSend.append('telefone', formData.telefone);
      formDataToSend.append('num_pedido', formData.num_pedido);
      formDataToSend.append('descricao', formData.descricao);
      
      // Adicionar data de criação (data atual)
      const dataAtual = new Date().toISOString();
      formDataToSend.append('data', dataAtual);
      
      // Adicionar status padrão
      formDataToSend.append('status', 'pendente');

      // Adicionar arquivos se existirem
      if (formData.receita) {
        formDataToSend.append('receita', formData.receita);
      }
      if (formData.dp) {
        formDataToSend.append('dp', formData.dp);
      }

      // Configurar headers
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${apiUrl}/api/receitas`, {
        method: 'POST',
        headers,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ao enviar receita - Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess('Receita enviada com sucesso! Entraremos em contato em breve.');
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        telefone: '',
        num_pedido: '',
        descricao: '',
        receita: null,
        dp: null,
      });

      // Limpar os inputs de arquivo
      const receitaInput = document.getElementById('receita-upload') as HTMLInputElement;
      const dpInput = document.getElementById('dp-upload') as HTMLInputElement;
      if (receitaInput) receitaInput.value = '';
      if (dpInput) dpInput.value = '';

    } catch (err) {
      console.error('Erro ao enviar receita:', err);
      setError(err instanceof Error ? err.message : 'Erro ao enviar receita. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200">
      {/* Header com logo */}
      <div className="flex justify-center pt-8 mb-8">
        <div className="bg-white rounded-full p-4">
          <Image
            src="/img/satiko-logo.png"
            alt="Ótica Satiko"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Formulário */}
          <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg relative">
            {/* Botão de voltar */}
            <Link 
              href="/loja" 
              className="absolute top-7 left-7 flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200 shadow-md"
              title="Voltar para a loja"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
              ENVIE SUA RECEITA PARA NÓS!
            </h1>

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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Primeira linha - Nome e Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    required
                  />
                </div>
              </div>

              {/* Segunda linha - WhatsApp e Telefone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="WhatsApp (DD) XXXXX-XXXX"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    maxLength={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone (DD) XXXXX-XXXX"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    maxLength={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              {/* Período */}
              <div>
                <input
                  type="text"
                  name="num_pedido"
                  placeholder="N° Do Pedido"
                  value={formData.num_pedido}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>

              {/* Observações */}
              <div>
                <textarea
                  name="descricao"
                  placeholder="Outras observações sobre a receita"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 resize-none"
                />
              </div>

              {/* Upload de arquivos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selecione sua receita*
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'receita')}
                    className="hidden"
                    id="receita-upload"
                    required
                  />
                  <label
                    htmlFor="receita-upload"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                  >
                    Selecionar Arquivos
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.receita ? formData.receita.name : 'Nenhum Arquivo selecionado'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selecione sua DP*
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'dp')}
                    className="hidden"
                    id="dp-upload"
                    required
                  />
                  <label
                    htmlFor="dp-upload"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                  >
                    Selecionar Arquivo
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.dp ? formData.dp.name : 'Nenhum Arquivo selecionado'}
                  </p>
                </div>
              </div>

              {/* Informações sobre arquivos */}
              <div className="text-xs text-gray-600 space-y-1">
                <p>*Apenas arquivos em Word, PDF ou imagens em PNG/JPG.</p>
                <p>*DP: Tutorial encontra-se abaixo</p>
              </div>

              {/* Botão de envio */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition cursor-pointer duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Receita ➤'}
              </button>
            </form>
          </div>

          {/* Arte abstrata */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-96">
              {/* Formas geométricas abstratas */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Círculo grande azul */}
                <div className="absolute top-4 right-8 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
                
                {/* Círculo médio branco */}
                <div className="absolute top-20 left-12 w-24 h-24 bg-white rounded-full opacity-30"></div>
                
                {/* Triângulo */}
                <div className="absolute bottom-32 right-16 w-0 h-0 border-l-16 border-r-16 border-b-28 border-l-transparent border-r-transparent border-b-blue-600 opacity-25"></div>
                
                {/* Retângulo */}
                <div className="absolute bottom-20 left-8 w-20 h-12 bg-blue-400 opacity-30 transform rotate-12"></div>
                
                {/* Hexágono simulado com div rotacionada */}
                <div className="absolute top-32 right-4 w-16 h-16 bg-blue-300 opacity-40 transform rotate-45"></div>
                
                {/* Círculo pequeno */}
                <div className="absolute bottom-40 left-20 w-8 h-8 bg-white rounded-full opacity-50"></div>
                
                {/* Elipse */}
                <div className="absolute top-16 left-4 w-12 h-20 bg-blue-200 rounded-full opacity-35 transform rotate-12"></div>
                
                {/* Losango */}
                <div className="absolute bottom-12 right-32 w-12 h-12 bg-blue-500 opacity-30 transform rotate-45"></div>
                
                {/* Linhas decorativas */}
                <div className="absolute top-40 left-16 w-20 h-0.5 bg-blue-600 opacity-20 transform rotate-45"></div>
                <div className="absolute bottom-28 right-12 w-16 h-0.5 bg-white opacity-40 transform -rotate-12"></div>
              </div>
              
              {/* Elemento central decorativo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 border-4 border-white border-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 border-2 border-blue-500 border-opacity-30 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-400 opacity-40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Como calcular a DP - Abaixo do formulário */}
        <div className="max-w-7xl mx-auto mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Como calcular a DP?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Primeiro Passo */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2,4A2,2 0 0,0 0,6V18A2,2 0 0,0 2,20H22A2,2 0 0,0 24,18V6A2,2 0 0,0 22,4H2M2,6H22V8H2V6M2,10H8V12H2V10M2,14H12V16H2V14Z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Primeiro Passo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Segure um cartão do tamanho de um cartão de banco, carteirinha do convênio ou cartão do ônibus em frente a sua boca
              </p>
            </div>

            {/* Segundo Passo */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Segundo passo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tire uma foto do tipo "selfie", com o braço bem esticado.
              </p>
            </div>

            {/* Terceiro Passo */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Terceiro Passo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tire uma foto em um local bem iluminado e mantenha os olhos abertos e postura reta.
              </p>
            </div>

            {/* Quarto Passo */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,12V19H10V12H7L12,7L17,12M19,21H5C3.89,21 3,20.1 3,19V15H5V19H19V15H21V19A2,2 0 0,1 19,21Z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Quarto Passo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Encaminhe para nós sua foto nos seguintes formatos: PNG/JPG ou PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
