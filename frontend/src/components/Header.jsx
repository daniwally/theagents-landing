import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = ({ onTrialClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" data-testid="header">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="/" 
            className="flex flex-col group"
            data-testid="logo-link"
          >
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
              Agentes
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')}
              className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest"
            >
              Cómo funciona
            </button>
            <button 
              onClick={onTrialClick}
              className="btn-primary text-sm"
              data-testid="header-cta-trial"
            >
              Probá gratis
            </button>
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
          <nav 
            className="md:hidden py-6 border-t border-white/10 animate-fade-in"
            data-testid="mobile-nav"
          >
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollTo('agents')}
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest text-left py-2"
              >
                Agentes
              </button>
              <button 
                onClick={() => scrollTo('how-it-works')}
                className="text-neutral-400 hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest text-left py-2"
              >
                Cómo funciona
              </button>
              <button 
                onClick={onTrialClick}
                className="btn-primary text-sm mt-4"
                data-testid="mobile-cta-trial"
              >
                Probá gratis
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
