import { ArrowDown } from 'lucide-react';

export const Hero = ({ onCTAClick }) => {
  const scrollToAgents = () => {
    const element = document.getElementById('agents');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="min-h-screen flex flex-col justify-center relative pt-20 pb-12 overflow-hidden"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-8">
            {/* Label */}
            <div className="mb-8 animate-fade-in-up">
              <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700]">
                Powered by WTF Agency
              </span>
            </div>

            {/* Main headline */}
            <h1 
              className="font-thin text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.85] mb-8 animate-fade-in-up delay-100"
              data-testid="hero-headline"
            >
              Tu próximo<br />
              equipo no tiene<br />
              <span className="font-black text-[#FFD700]">LinkedIn.</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="font-light text-base md:text-lg text-neutral-400 max-w-xl mb-12 animate-fade-in-up delay-200 leading-relaxed"
              data-testid="hero-subtitle"
            >
              Agentes IA especializados que trabajan 24/7 para tu empresa. 
              Cada uno con personalidad, skills y experiencia única.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button 
                onClick={scrollToAgents}
                className="btn-primary"
                data-testid="hero-cta-primary"
              >
                Conocé tu equipo
              </button>
              <button 
                onClick={onCTAClick}
                className="btn-secondary"
                data-testid="hero-cta-secondary"
              >
                Agendar demo
              </button>
            </div>
          </div>

          {/* Right decorative element */}
          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-48 h-48 border border-white/10 flex items-center justify-center">
                <div className="text-[#FFD700] font-mono text-sm text-center">
                  <div className="mb-2">6 AGENTES</div>
                  <div className="text-4xl font-black">24/7</div>
                  <div className="mt-2">ACTIVOS</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-48 h-48 border border-[#FFD700]/20" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToAgents}
        >
          <ArrowDown className="text-neutral-600 hover:text-[#FFD700] transition-colors" size={24} />
        </div>
      </div>
    </section>
  );
};
