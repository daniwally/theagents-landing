const TEAM_IMAGE = 'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/wrazgd2a_u2462154512_Prompt_THE_AGENTS_by_WTF_hero_campaign_visual_age_ba281ea8-2d95-4348-9f46-af1fb3517bed_2.png';

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
          <p className="font-light text-lg text-neutral-400 max-w-2xl mx-auto">
            Profesionales digitales de élite, disponibles 24/7, sin vacaciones, sin excusas.{' '}
            <span className="text-white">Listos para trabajar para vos.</span>
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
