export const Footer = ({ onDemoClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative py-24 md:py-32 bg-[#050505]/80 overflow-hidden"
      data-testid="footer"
    >
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

        {/* Supported by WTF Agency */}
        <div className="mb-16">
          <p className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-600 text-center mb-8">
            Supported by
          </p>
          <div className="flex justify-center">
            <a 
              href="https://www.wtf-agency.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-6 p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300"
              data-testid="wtf-agency-link"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/tvusoxyn_logo-wtf.png" 
                alt="WTF Agency - Brief Destroyers"
                className="h-16 md:h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </a>
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
                href="mailto:hello@wtf-agency.com" 
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm font-light"
              >
                hello@wtf-agency.com
              </a>
              <span className="text-neutral-700">|</span>
              <a 
                href="https://www.wtf-agency.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm font-light"
              >
                wtf-agency.com
              </a>
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
