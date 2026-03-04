const TEAM_IMAGES = [
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/5mz2fzfl_u2462154512_Prompt_THE_AGENTS_by_WTF_hero_campaign_visual_age_e01577c8-ca48-42d8-ac46-67d0ba948029_0.png',
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/z65jdgdx_u2462154512_Prompt_THE_AGENTS_by_WTF_hero_campaign_visual_age_2eddbadc-5cd7-4694-b45b-7a201925ab18_0.png',
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/8ih76s33_u2462154512_Prompt_THE_AGENTS_by_WTF_hero_campaign_visual_age_ba281ea8-2d95-4348-9f46-af1fb3517bed_2.png',
];

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

        {/* Images Grid */}
        <div className="space-y-6 mb-12">
          {TEAM_IMAGES.map((img, index) => (
            <div 
              key={index}
              className="relative overflow-hidden group"
            >
              <img 
                src={img} 
                alt={`Equipo digital ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
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
