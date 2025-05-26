export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511942656386?text=Olá!%20Gostaria%20de%20saber%20mais"
      className="fixed bottom-6 right-6 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition z-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.5 3.5A11.8 11.8 0 0012 1a11.9 11.9 0 00-9.4 19.2l-1.6 4.6 4.7-1.6A11.9 11.9 0 0012 23a11.8 11.8 0 008.5-19.5zm-8.5 17a9.7 9.7 0 01-5.1-1.4l-.4-.2-2.8.9.9-2.7-.2-.4A9.7 9.7 0 1112 20.5zm5.3-7.8l-2.2-1c-.3-.1-.6-.1-.8.1l-.7.9c-.2.3-.6.4-.9.2a7.2 7.2 0 01-3.5-3.5c-.1-.3 0-.6.2-.8l.9-.7c.2-.2.3-.5.2-.8l-1-2.2c-.2-.5-.7-.7-1.2-.5-1.2.6-2 2-1.7 3.3a10.6 10.6 0 004.8 6.3c1.3.7 2.7.9 4 .4 1.3-.4 2.7-1.5 3.3-2.7.2-.5 0-1-.5-1.2z" />
      </svg>
    </a>
  );
}

