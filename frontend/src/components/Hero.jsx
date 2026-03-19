import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import t from '../translations';

const HERO_IMAGES = [
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/vz1tin0o_u2462154512_woman_modern_model_about_to_looking_on_a_vert_ram_bcb620c8-9935-4cd2-9411-6261f4d1c979_3%20%281%29.png',
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/1b4vz4ol_u2462154512_woman_blonde_modern_model_about_to_looking_on_a_v_69767286-611b-4d34-b76f-e0932459286a_0.png',
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/pz4a0246_u2462154512_woman_modern_model_about_to_looking_on_a_vert_ram_746021fc-e5da-4958-8e7d-66ab9b60d8ab_1.png',
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/hobchh69_u2462154512_Low-angle_close-up_of_a_person__snowflakes_caught_401be9d9-3c87-429f-a3ad-12c005df5ee7_0.png',
  'https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/4rnhs0kd_u2462154512_Low-angle_close-up_of_a_person_holding_a_transpar_98891fd1-56d2-4f49-9a89-e0f9a2d9ae83_0%20%281%29.png',
];

export const Hero = ({ onCTAClick }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAgents = () => {
    const element = document.getElementById('agents');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-20 pb-12 overflow-hidden" data-testid="hero-section">
      {/* Background images carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 right-0 w-full lg:w-3/5 h-full transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="mb-8 animate-fade-in-up">
              <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700]">
                {t.hero.poweredBy[lang]}
              </span>
            </div>
            <h1 className="font-thin text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.85] mb-8 animate-fade-in-up delay-100" data-testid="hero-headline">
              {t.hero.headline1[lang]}<br />
              {t.hero.headline2[lang]}<br />
              <span className="font-black text-[#FFD700]">{t.hero.headline3[lang]}</span>
            </h1>
            <div className="max-w-xl mb-12 animate-fade-in-up delay-200" data-testid="hero-subtitle">
              <span className="text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                {t.hero.subtitle[lang]}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button onClick={scrollToAgents} className="btn-primary" data-testid="hero-cta-primary">
                {t.hero.ctaPrimary[lang]}
              </button>
              <button onClick={onCTAClick} className="btn-secondary" data-testid="hero-cta-secondary">
                {t.hero.ctaSecondary[lang]}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToAgents}>
          <ArrowDown className="text-neutral-600 hover:text-[#FFD700] transition-colors" size={24} />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden lg:flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 transition-all duration-300 ${index === currentImage ? 'bg-[#FFD700] w-6' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};
