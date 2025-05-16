"use client";

import Header from "./components/Header";
import ContactBar from "./components/ContactBar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ContactBar />
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
