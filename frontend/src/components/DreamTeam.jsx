import { useLang } from '../context/LanguageContext';
import t from '../translations';

const TEAM_IMAGE = 'https://customer-assets.emergentagent.com/job_9f3a9b77-23e8-4a65-b4a7-2e2c2ccb6b8d/artifacts/80p267wd_u2462154512_THE_AGENTS_by_WTF_hero_campaign_visual._Next-gene_c463292a-55b9-4724-8b63-28d867a8d9c8_0%20%281%29.png';

export const DreamTeam = ({ onCTAClick }) => {
  const { lang } = useLang();

  // Parse description with <highlight> and <accent> tags
  const raw = t.dreamTeam.description[lang];
  const parts = raw.split(/(<highlight>.*?<\/highlight>|<accent>.*?<\/accent>)/g);

  return (
    <section id="dream-team" className="py-24 md:py-32 relative overflow-hidden bg-black" data-testid="dream-team-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">{t.dreamTeam.label[lang]}</span>
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase mb-6">
            {t.dreamTeam.title1[lang]}<br />
            <span className="font-thin text-neutral-400">{t.dreamTeam.title2[lang]}</span>
          </h2>
          <p className="font-light text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith('<highlight>')) return <span key={i} className="text-white font-medium">{part.replace(/<\/?highlight>/g, '')}</span>;
              if (part.startsWith('<accent>')) return <span key={i} className="text-[#FFD700]">{part.replace(/<\/?accent>/g, '')}</span>;
              return <span key={i}>{part}</span>;
            })}
          </p>
        </div>
        <div className="mb-12">
          <div className="relative overflow-hidden group">
            <img src={TEAM_IMAGE} alt="Tu equipo de agentes digitales" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-light text-neutral-500 mb-6 text-lg">{t.dreamTeam.ctaQuestion[lang]}</p>
          <button onClick={onCTAClick} className="btn-primary text-lg px-12 py-5" data-testid="dream-team-cta">
            {t.dreamTeam.ctaButton[lang]}
          </button>
        </div>
      </div>
    </section>
  );
};
