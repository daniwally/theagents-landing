import { useLang } from '../context/LanguageContext';
import t from '../translations';

export const WhyUs = () => {
  const { lang } = useLang();

  return (
    <section id="why-us" className="py-24 md:py-32 relative overflow-hidden" data-testid="why-us-section">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#FFD700]" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 text-center md:text-left">
            <span className="font-black text-8xl md:text-9xl tracking-tighter text-[#FFD700]">15</span>
            <p className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-500 mt-2">{t.whyUs.yearsLabel[lang]}</p>
          </div>
          
          <div className="md:col-span-8">
            <h2 className="font-black text-3xl md:text-4xl tracking-tight uppercase mb-6">
              {t.whyUs.title1[lang]}<br />
              <span className="font-thin text-neutral-400">{t.whyUs.title2[lang]}</span>
            </h2>
            
            <div className="space-y-6 text-neutral-300 font-light leading-relaxed">
              <p>{t.whyUs.p1[lang]}<span className="text-white font-normal">{t.whyUs.p1Highlight[lang]}</span></p>
              <p>{t.whyUs.p2Start[lang]}<span className="text-[#FFD700] font-normal">{t.whyUs.p2Highlight[lang]}</span>{t.whyUs.p2End[lang]}</p>
              <p>{t.whyUs.p3Start[lang]}<span className="text-white font-normal">{t.whyUs.p3Highlight[lang]}</span></p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
              <div>
                <p className="font-black text-2xl md:text-3xl text-white">6</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{t.whyUs.stat1[lang]}</p>
              </div>
              <div>
                <p className="font-black text-2xl md:text-3xl text-white">200+</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{t.whyUs.stat2[lang]}</p>
              </div>
              <div>
                <p className="font-black text-2xl md:text-3xl text-[#FFD700]">&#8734;</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{t.whyUs.stat3[lang]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
