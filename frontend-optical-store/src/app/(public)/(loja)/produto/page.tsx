"use client";

import React, { useState } from "react";

// Subcomponents

const PriceInfo = () => (
  <div>
    <p className="text-green-600 text-3xl font-semibold">R$ 135,00</p>
    <p className="text-sm text-gray-700">em até 10x de R$ 13,50 sem juros</p>
    <p className="text-sm text-gray-700">ou <span className="text-green-600">R$ 135,00</span> via depósito bancário</p>
  </div>
);

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Quantidade</label>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

const Installments = () => {
  const values = [
    "1x de R$ 135,00",
    "2x de R$ 67,50",
    "3x de R$ 45,00",
    "4x de R$ 33,75",
    "5x de R$ 27,00",
    "6x de R$ 22,50",
    "7x de R$ 19,29",
    "8x de R$ 16,88",
    "9x de R$ 15,00",
    "10x de R$ 13,50"
  ];
  return (
    <div className="grid grid-cols-5 gap-2 mt-4 text-sm text-green-600">
      {values.map((v, i) => (
        <div key={i} className="border px-2 py-1 rounded text-center">
          {v} <span className="text-gray-600">sem juros</span>
        </div>
      ))}
    </div>
  );
};

const ProductOptions = () => {
  const options = ["AMARELA", "VERMELHA", "WHITE"];
  return (
    <div className="flex gap-2 my-4">
      {options.map((opt) => (
        <button
          key={opt}
          className="border rounded px-3 py-1 text-sm hover:bg-gray-100"
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

const PurchaseButtons = () => (
  <div className="flex gap-4 my-4">
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      COMPRAR
    </button>
    <button className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50">
      COMPRA EM QUANTIDADE
    </button>
  </div>
);

// Main Component

const ContactLensProduct = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow-md">
      <h1 className="text-xl font-semibold mb-2">
        Lentes de Contato Colorida Solflex Color Hype - Solótica
      </h1>
      <ProductOptions />
      <PriceInfo />
      <QuantitySelector />
      <PurchaseButtons />
      <Installments />
    </div>
  );
};

export default ContactLensProduct;