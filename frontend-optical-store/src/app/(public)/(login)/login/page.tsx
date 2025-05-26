// src/app/login/page.tsx
'use client'

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Entrar na Conta</h2>
          <p className="text-gray-500 mt-2">Bem-vindo à Ótica Satiko</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded-md hover:bg-blue-700 font-semibold transition duration-200"
          >
            Entrar
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-1/3 bg-gray-300" />
          <span className="text-sm text-gray-500">ou entre com</span>
          <div className="h-px w-1/3 bg-gray-300" />
        </div>

        <div className="flex justify-center">
          <button
            className="flex items-center justify-center w-12 h-12 cursor-pointer border border-gray-300 rounded-full hover:bg-gray-100 transition"
            onClick={() => alert("Autenticar com o Google")} // substitua depois com lógica real
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
          <Link href="/cadastro" className="text-blue-600 hover:underline font-semibold">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
