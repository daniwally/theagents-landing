export const Footer = ({ onDemoClick }) => {
  const currentYear = new Date().getFullYear();
  
  // Placeholder logos - rectangles representing client logos
  const clientLogos = [
    { name: 'Cliente 1' },
    { name: 'Cliente 2' },
    { name: 'Cliente 3' },
    { name: 'Cliente 4' },
    { name: 'Cliente 5' },
  ];

  return (
    <footer 
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden"
      data-testid="footer"
    >
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1771790193799-2ee0163f2e87?crop=entropy&cs=srgb&fm=jpg&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-24">
          <h2 className="font-thin text-4xl md:text-6xl tracking-tight uppercase mb-6">
            ¿Listo para<br />
            <span className="font-black text-[#FFD700]">escalar?</span>
          </h2>
          <p className="font-light text-neutral-400 mb-8 max-w-lg mx-auto">
            Tu competencia ya lo tiene. Cada día que esperás es un día que perdés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onDemoClick}
              className="btn-primary"
              data-testid="footer-cta-demo"
            >
              Agendar demo
            </button>
            <a 
              href="https://calendly.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
              data-testid="footer-cta-calendly"
            >
              Ver en Calendly
            </a>
          </div>
        </div>

        {/* Client logos */}
        <div className="mb-16">
          <p className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-600 text-center mb-8">
            Confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {clientLogos.map((logo, i) => (
              <div 
                key={i}
                className="w-24 h-8 bg-white/20 flex items-center justify-center"
                data-testid={`client-logo-${i}`}
              >
                <span className="text-xs font-mono text-neutral-500">LOGO</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & tagline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-black text-xl tracking-tight">THE AGENTS</span>
                <span className="text-[#FFD700] font-mono text-sm">.wtf</span>
              </div>
              <p className="font-light text-sm text-neutral-500">
                Powered by WTF Agency — 15 años creando marcas. Ahora creamos equipos.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8">
              <a 
                href="mailto:hola@theagents.wtf" 
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm font-light"
              >
                hola@theagents.wtf
              </a>
              <span className="text-neutral-700">|</span>
              <span className="text-neutral-500 text-sm font-light">
                6 oficinas en Latam
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600 text-xs">
              © {currentYear} The Agents. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
