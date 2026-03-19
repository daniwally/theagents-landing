import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang, LANGUAGES } from '../context/LanguageContext';
import t from '../translations';

export const Header = ({ onTrialClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang } = useLang();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLangSelect = (code) => {
    setLang(code);
    setIsLangOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" data-testid="header">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex flex-col group" data-testid="logo-link">
            <span className="font-black text-xl tracking-tight leading-none">THE AGENTS</span>
            <span className="flex items-center gap-1 mt-0.5">
              <span className="text-neutral-500 font-light text-xs">by</span>
              <span className="text-[#FFD700] font-black text-sm tracking-tight">WTF Agency</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            <button
              onClick={() => scrollTo('agents')}
              className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest"
            >
              {t.header.agents[lang]}
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest"
            >
              {t.header.howItWorks[lang]}
            </button>
            {/* Language Selector */}
            <div className="relative" data-testid="lang-selector">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest"
              >
                {currentLang.label}
                <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#0a0a0a] border border-white/10 min-w-[140px] py-1 z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${l.code === lang ? 'text-[#FFD700] bg-white/5' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
                      data-testid={`lang-option-${l.code}`}
                    >
                      <span className="font-bold mr-2">{l.label}</span>
                      <span className="font-light">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-white/10 animate-fade-in" data-testid="mobile-nav">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollTo('agents')}
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest text-left py-2"
              >
                {t.header.agents[lang]}
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest text-left py-2"
              >
                {t.header.howItWorks[lang]}
              </button>
              {/* Mobile Language Selector */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-3 py-1.5 text-sm font-bold transition-colors ${l.code === lang ? 'bg-[#FFD700] text-black' : 'text-neutral-400 border border-white/10 hover:text-white'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
