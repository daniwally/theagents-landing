const TEAM_IMAGE = 'https://customer-assets.emergentagent.com/job_9f3a9b77-23e8-4a65-b4a7-2e2c2ccb6b8d/artifacts/80p267wd_u2462154512_THE_AGENTS_by_WTF_hero_campaign_visual._Next-gene_c463292a-55b9-4724-8b63-28d867a8d9c8_0%20%281%29.png';

export const DreamTeam = ({ onCTAClick }) => {
  return (
    <section 
      id="dream-team" 
      className="py-24 md:py-32 relative overflow-hidden bg-black"
      data-testid="dream-team-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">
            Tu nuevo equipo
          </span>
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase mb-6">
            El equipo que<br />
            <span className="font-thin text-neutral-400">siempre soñaste.</span>
          </h2>
          <p className="font-light text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Imaginá tener un equipo de especialistas senior trabajando para vos las 24 horas del día, los 365 días del año.{' '}
            <span className="text-white font-medium">Sin reuniones innecesarias. Sin licencias. Sin rotación. Sin excusas.</span>{' '}
            Cada agente domina su área como un director con 15 años de experiencia: tu diseñadora entrega campañas a las 3AM, tu CFO analiza números mientras dormís, tu closer cierra ventas en feriados.{' '}
            <span className="text-[#FFD700]">Es el equipo que las Fortune 500 tienen, pero al alcance de tu empresa.</span>
          </p>
        </div>

        {/* Single Image */}
        <div className="mb-12">
          <div className="relative overflow-hidden group">
            <img 
              src={TEAM_IMAGE} 
              alt="Tu equipo de agentes digitales"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-light text-neutral-500 mb-6 text-lg">
            ¿Listo para conocerlos?
          </p>
          <button 
            onClick={onCTAClick}
            className="btn-primary text-lg px-12 py-5"
            data-testid="dream-team-cta"
          >
            Quiero mi equipo
          </button>
        </div>
      </div>
    </section>
  );
};
