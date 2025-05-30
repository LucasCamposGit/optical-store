// src/app/login/page.tsx
'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuth, useAuthDispatch } from "@/context/LoginContext";
import { AUTH_ACTION } from "@/types/action";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authDispatch = useAuthDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao fazer login");
      }

      const data = await response.json();
      
      // Atualiza o contexto de autenticação
      authDispatch({
        type: AUTH_ACTION.LOGIN_SUCCESS,
        payload: {
          accessToken: data.token,
          refreshToken: data.refreshToken,
        },
      });

      // Redireciona para a página principal
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Entrar na Conta</h2>
          <p className="text-gray-500 mt-2">Bem-vindo à Ótica Satiko</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#0d4a66] text-white py-2 cursor-pointer rounded-md hover:bg-[#0d4a99] font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-1/3 bg-gray-300" />
          <span className="text-sm text-gray-500">ou entre com</span>
          <div className="h-px w-1/3 bg-gray-300" />
        </div>

        <div className="flex justify-center">
          <button
            className="flex items-center justify-center w-12 h-12 cursor-pointer border border-gray-300 rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => alert("Autenticar com o Google")}
            disabled={loading}
          >
            <Image
              src="/img/google-logo.png"
              alt="Google Login"
              width={24}
              height={24}
            />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link href="/cadastro" className="text-[#0d4a66] hover:underline font-semibold">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
