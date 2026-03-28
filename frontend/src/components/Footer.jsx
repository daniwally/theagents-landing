import { useLang } from '../context/LanguageContext';
import t from '../translations';

export const Footer = ({ onDemoClick }) => {
  const currentYear = new Date().getFullYear();
  const { lang } = useLang();

  return (
    <footer className="relative py-24 md:py-32 bg-[#050505]/80 overflow-hidden" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-thin text-4xl md:text-6xl tracking-tight uppercase mb-6">
            {t.footer.title1[lang]}<br />
            <span className="font-black text-[#FFD700]">{t.footer.title2[lang]}</span>
          </h2>
          <p className="font-light text-neutral-400 mb-8 max-w-lg mx-auto">{t.footer.subtitle[lang]}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onDemoClick} className="btn-primary" data-testid="footer-cta-demo">{t.footer.ctaDemo[lang]}</button>
          </div>
        </div>

        <div className="mb-20 py-16 border-t border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div className="text-center md:text-left">
              <a href="https://www.wtf-agency.com" target="_blank" rel="noopener noreferrer" className="inline-block group" data-testid="wtf-agency-link">
                <img src="https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/tvusoxyn_logo-wtf.png" alt="WTF Agency - Brief Destroyers" className="h-20 md:h-24 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
              </a>
            </div>
            <div>
              <p className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4">{t.footer.wtfLabel[lang]}</p>
              <h3 className="font-black text-2xl md:text-3xl tracking-tight mb-4">
                {t.footer.wtfTitle1[lang]}<br />
                <span className="font-thin text-neutral-400">{t.footer.wtfTitle2[lang]}</span>
              </h3>
              <p className="font-light text-neutral-400 leading-relaxed mb-6">{t.footer.wtfDesc[lang]}</p>
              <a href="https://www.wtf-agency.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#FFD700] font-bold text-sm uppercase tracking-wider hover:text-white transition-colors">
                {t.footer.wtfLink[lang]} <span>&rarr;</span>
              </a>
            </div>
          </div>
          <div className="mt-12">
            <p className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-600 text-center mb-6">{t.footer.clientLogos[lang]}</p>
            <img src="https://customer-assets.emergentagent.com/job_agent-team-demo/artifacts/ypjvloxh_szya9zmc_Screenshot%202026-02-02%20at%2012.03.04%E2%80%AFPM.png" alt="Clientes de WTF Agency" className="w-full max-w-4xl mx-auto opacity-70 hover:opacity-90 transition-opacity duration-500" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-black text-xl tracking-tight">THE AGENTS</span>
                <span className="text-[#FFD700] font-mono text-sm">.wtf</span>
              </div>
              <p className="font-light text-sm text-neutral-500">{t.footer.tagline[lang]}</p>
            </div>
            <div className="flex items-center gap-8">
              <a href="mailto:hello@wtf-agency.com" className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm font-light">hello@wtf-agency.com</a>
              <span className="text-neutral-700">|</span>
              <a href="https://www.wtf-agency.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm font-light">wtf-agency.com</a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-neutral-600 text-xs">&copy; {currentYear} {t.footer.copyright[lang]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
