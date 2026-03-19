import { UserCheck, Settings, Plug, Rocket } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import t from '../translations';

const STEP_ICONS = [UserCheck, Settings, Plug, Rocket];

export const HowItWorks = () => {
  const { lang } = useLang();

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#050505]" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">{t.howItWorks.sectionLabel[lang]}</span>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight uppercase">
            {t.howItWorks.sectionTitle1[lang]}<br />
            <span className="font-thin">{t.howItWorks.sectionTitle2[lang]}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {t.howItWorks.steps.map((step, index) => {
            const Icon = STEP_ICONS[index];
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={num}
                className="group border-l border-white/20 pl-6 py-4 hover:border-[#FFD700] transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
                data-testid={`step-${num}`}
              >
                <span className="font-mono text-[#FFD700] text-sm mb-4 block">{num}</span>
                <Icon className="text-white/40 group-hover:text-[#FFD700] transition-colors mb-4" size={28} />
                <h3 className="font-black text-2xl tracking-tight mb-3">{step.title[lang]}</h3>
                <p className="font-light text-neutral-400 leading-relaxed">{step.description[lang]}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 md:mt-32 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
          <div className="relative bg-[#050505] py-12 text-center">
            <p className="font-black text-3xl md:text-5xl lg:text-6xl tracking-tight uppercase mb-6">
              {t.howItWorks.ctaLine1[lang]}<br className="md:hidden" />{' '}
              <span className="text-[#FFD700]">{t.howItWorks.ctaHighlight[lang]}</span>
            </p>
            <p className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase">
              <span className="text-white/30">{t.howItWorks.ctaLine2Start[lang]}</span>{' '}
              <span className="relative inline-block">
                <span className="text-[#FFD700]">{t.howItWorks.ctaLine2Highlight[lang]}</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FFD700]"></span>
              </span>
              <span className="text-white/30">{t.howItWorks.ctaLine2End[lang]}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
