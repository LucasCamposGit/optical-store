'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();


  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: senha,
          role: "user", 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErro(errorText || "Erro ao registrar");
        return;
      }

      const data = await response.json();
      router.push("/login");

    } catch (err) {
      console.error(err);
      setErro("Erro de rede ou servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Criar Conta</h2>
          <p className="text-gray-500 mt-2">Cadastre-se na Ótica Satiko</p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0d4a66] text-white py-2 cursor-pointer rounded-md hover:bg-[#0d4a99] font-semibold transition duration-200"
          >
            Criar Conta
          </button>

          {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}
        </form>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-1/3 bg-gray-300" />
          <span className="text-sm text-gray-500">ou entre com</span>
          <div className="h-px w-1/3 bg-gray-300" />
        </div>

        <div className="flex justify-center">
          <button
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 transition"
            onClick={() => alert("Autenticar com o Google")}
          >
            <Image src="/img/google-logo.png" alt="Google Login" width={24} height={24} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#0d4a66] hover:underline font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
