export const WhyUs = () => {
  return (
    <section 
      id="why-us" 
      className="py-24 md:py-32 relative overflow-hidden"
      data-testid="why-us-section"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#FFD700]" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left - Number */}
          <div className="md:col-span-4 text-center md:text-left">
            <span className="font-black text-8xl md:text-9xl tracking-tighter text-[#FFD700]">
              15
            </span>
            <p className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-500 mt-2">
              Años de experiencia
            </p>
          </div>
          
          {/* Right - Content */}
          <div className="md:col-span-8">
            <h2 className="font-black text-3xl md:text-4xl tracking-tight uppercase mb-6">
              No somos una startup de IA.<br />
              <span className="font-thin text-neutral-400">Somos una agencia que evolucionó.</span>
            </h2>
            
            <div className="space-y-6 text-neutral-300 font-light leading-relaxed">
              <p>
                Durante 15 años construimos marcas, estrategias y equipos creativos para las empresas más exigentes de Latinoamérica. Aprendimos qué funciona, qué no, y sobre todo: <span className="text-white font-normal">qué necesitan realmente los negocios para crecer.</span>
              </p>
              
              <p>
                Esa experiencia es la que hoy ponemos en cada agente. No son bots genéricos. Son <span className="text-[#FFD700] font-normal">especialistas digitales</span> entrenados con el mismo criterio que usamos para formar equipos humanos de alto rendimiento.
              </p>
              
              <p>
                Entendemos de branding, de comunicación, de ventas, de procesos. Por eso nuestros agentes no solo ejecutan tareas: <span className="text-white font-normal">entienden el contexto, cuidan tu marca y piensan como parte de tu equipo.</span>
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
              <div>
                <p className="font-black text-2xl md:text-3xl text-white">6</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Oficinas en Latam</p>
              </div>
              <div>
                <p className="font-black text-2xl md:text-3xl text-white">200+</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Marcas creadas</p>
              </div>
              <div>
                <p className="font-black text-2xl md:text-3xl text-[#FFD700]">∞</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Horas trabajadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
