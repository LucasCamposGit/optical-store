import React from 'react';

// Placeholder SVGs for icons - replace with actual SVGs or an icon library
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.001 2C5.583 2 2 5.582 2 9.999c0 1.666.506 3.205 1.367 4.526L2.066 18l3.604-1.3A7.943 7.943 0 0010.001 18c4.418 0 8-3.582 8-8.001S14.418 2 10.001 2zM8.988 14.943h-.032c-.447 0-.885-.119-1.268-.349l-.09-.053-2.991.886.902-2.925-.063-.098a5.907 5.907 0 01-.482-1.36V9.99c0-3.036 2.466-5.501 5.502-5.501 1.49 0 2.86.574 3.89 1.603s1.604 2.4 1.604 3.89c0 3.034-2.467 5.501-5.502 5.501a5.47 5.47 0 01-1.57-.243zm3.966-3.358l-.07-.123c-.037-.063-.148-.102-.28-.168-.132-.066-1.01-.498-1.167-.555-.157-.057-.271-.087-.386.087-.114.174-.44.555-.54.669-.1.114-.199.129-.372.043s-.726-.267-1.381-.852c-.511-.454-.855-.99-.954-1.164s-.011-.255.076-.341c.078-.078.174-.199.261-.298.087-.1.114-.174.171-.288.057-.114.029-.216-.014-.302s-.386-.929-.529-1.27c-.137-.328-.279-.282-.386-.288-.1-.006-.215 0-.329 0s-.302.043-.459.216c-.156.174-.599.582-.599 1.42 0 .838.613 1.648.699 1.762.087.114 1.201 1.833 2.909 2.56.404.171.72.273.966.349.309.097.588.084.81-.009.252-.104.732-.298.835-.585.102-.288.102-.534.07-.585l-.001-.001z" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);
const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
const YouTubeIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;
const TikTokIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 0 .14.02.2.04.19.07.35.16.5.27.27.19.5.43.69.71.19.28.34.59.45.91.11.32.19.65.23.99.04.33.05.67.05 1v1.32c0 .05-.01.1-.02.15-.01.05-.02.1-.04.15s-.04.1-.07.14c-.03.04-.06.08-.09.11-.19.19-.43.34-.69.45-.26.11-.55.18-.85.22-.3.04-.6.05-1 .05h-1.23v6.37c0 .23-.03.45-.08.66s-.13.4-.23.57c-.1.17-.22.32-.37.45s-.32.23-.5.3c-.18.07-.38.11-.59.12-.21.01-.43 0-.66-.03-.22-.03-.44-.08-.64-.15-.21-.07-.4-.16-.58-.27-.18-.11-.35-.24-.49-.39-.14-.15-.27-.32-.37-.51s-.18-.39-.23-.6c-.05-.21-.07-.43-.07-.66v-7.5c0-.05.01-.1.02-.15.01-.05.02-.1.04-.15s.04-.1.07-.14c.03-.04.06-.08.09-.11.19-.19.43-.34.69-.45.26-.11.55-.18.85-.22.3-.04.6-.05 1-.05h1.23v-3.17c0-.05.01-.1.02-.15.01-.05.02-.1.04-.15s.04-.1.07-.14c.03-.04.06-.08.09-.11.19-.19.43-.34.69-.45.26-.11.55-.18.85-.22.3-.04.6-.05 1-.05zM10.685 7.65H7.502v3.046h3.183V7.65zm6.37 0h-3.183v3.046h3.183V7.65z" /></svg>;
const LinkedInIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.979v16h4.979v-8.399c0-2.199 1.158-4.133 3.419-4.133s2.581 1.934 2.581 4.133v8.399h4.984v-8.668c0-4.073-2.463-6.926-6.023-6.926-2.587 0-4.209 1.482-4.961 2.789v-2.395z" /></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.728-.666 1.581-.666 2.477 0 1.61.823 3.027 2.071 3.858-.766-.024-1.483-.234-2.11-.583v.06c0 2.254 1.603 4.135 3.734 4.564-.39.106-.803.164-1.227.164-.3 0-.593-.028-.875-.082.593 1.846 2.313 3.193 4.352 3.231-1.592 1.247-3.6 1.989-5.782 1.989-.377 0-.748-.022-1.112-.065 2.062 1.323 4.513 2.094 7.14 2.094 8.568 0 13.255-7.099 13.255-13.254 0-.202-.005-.403-.014-.604.91-.658 1.7-1.479 2.323-2.41z" /></svg>;


const Footer: React.FC = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-white text-gray-700 border-t-4 border-blue-600 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-y-12 gap-x-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-12">
          {/* Column 1: Fale com a gente! */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Alguma dúvida?</p>
            <h3 className="text-2xl font-bold text-gray-800">Fale com a gente!</h3>

            <div className="flex items-center gap-2">
              <WhatsAppIcon />
              <span className="text-sm">(11) 99677-5541</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon />
              <span className="text-sm">(11) 4326-7997</span>
            </div>

            <a href="mailto:contato@oticaolhosdobem.com.br" className="block pt-2 font-semibold text-gray-800 hover:underline">
              contato@oticaolhosdobem.com.br
            </a>

            <div>
              <p className="text-sm text-gray-600 pt-3">Atendimento na Loja:</p>
              <div className="mt-1 flex items-start gap-2">
                <ClockIcon />
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">Seg a Sex das 09h00 às 20h00</p>
                  <p className="text-sm font-semibold">Sábado das 09h00 às 17h00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Informações */}
          <nav aria-labelledby="info-heading" className="space-y-4">
            <h4 id="info-heading" className="text-lg font-bold text-gray-800">
              Informações
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Quem somos",
                "Prazos de entrega",
                "Troca & devolução",
                "Segurança na compra",
                "Sobre pagamento",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-blue-700 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Acesso Rápido */}
          <nav aria-labelledby="quick-heading" className="space-y-4">
            <h4 id="quick-heading" className="text-lg font-bold text-gray-800">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Minhas compras",
                "Meus pedidos",
                "Rastrear pedido",
                "Painel do cliente",
                "Fale conosco",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-blue-700 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Onde Estamos */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-800">Onde Estamos</h4>
            <address className="not-italic space-y-6 text-sm">
              <div>
                <p>Avenida Calil Mohamed Rahal, 56, Loja 01.</p>
                <p className="text-xs text-gray-500">(dentro do supermercado Lopes)</p>
                <p>Vila São Silvestre - Barueri - SP</p>
              </div>
              <div>
                <p>Estrada dos Romeiros, 448, Loja 06.</p>
                <p className="text-xs text-gray-500">(dentro do supermercado São Vicente)</p>
                <p>Boa Vista - Barueri - SP</p>
              </div>
            </address>
          </div>

          {/* Column 5: Siga-nos */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">Siga-nos em nossas redes sociais</p>
              <h3 className="text-2xl font-bold text-gray-800">@oticaolhosdobem</h3>
            </div>
            <div className="flex flex-wrap gap-4 lg:gap-3" aria-label="Redes sociais">
              <a href="#" aria-label="Facebook" className="transition-transform hover:-translate-y-1">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram" className="transition-transform hover:-translate-y-1">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="YouTube" className="transition-transform hover:-translate-y-1">
                <YouTubeIcon />
              </a>
              <a href="#" aria-label="TikTok" className="transition-transform hover:-translate-y-1">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition-transform hover:-translate-y-1">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="Twitter" className="transition-transform hover:-translate-y-1">
                <TwitterIcon />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200">
              <a href="#" aria-label="Revendedor Autorizado Ray-Ban" className="block">
                {/* Replace the src with your actual image URL */}
                <img
                  src="YOUR_RAYBAN_BANNER_IMAGE_URL"
                  alt="Revendedor Autorizado Ray-Ban"
                  className="w-full h-auto max-w-[260px]"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>);
};

export default Footer;
