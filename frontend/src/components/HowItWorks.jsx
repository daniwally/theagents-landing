import { UserCheck, Settings, Plug, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserCheck,
    title: 'Elegís',
    description: 'Seleccioná los agentes que necesita tu empresa o elegí un pack según tu industria.'
  },
  {
    number: '02',
    icon: Settings,
    title: 'Personalizamos',
    description: 'Configuramos cada agente con la voz de tu marca, tus procesos y tus preferencias.'
  },
  {
    number: '03',
    icon: Plug,
    title: 'Se integran',
    description: 'Los conectamos con tus herramientas: Slack, email, CRM, lo que uses.'
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Arrancan a trabajar',
    description: 'En menos de 48hs tu equipo de agentes está operativo y produciendo resultados.'
  }
];

export const HowItWorks = () => {
  return (
    <section 
      id="how-it-works" 
      className="py-24 md:py-32 bg-[#050505]"
      data-testid="how-it-works-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">
            El proceso
          </span>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight uppercase">
            4 pasos.<br />
            <span className="font-thin">Sin complicaciones.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="group border-l border-white/20 pl-6 py-4 hover:border-[#FFD700] transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
                data-testid={`step-${step.number}`}
              >
                {/* Number */}
                <span className="font-mono text-[#FFD700] text-sm mb-4 block">
                  {step.number}
                </span>

                {/* Icon */}
                <Icon 
                  className="text-white/40 group-hover:text-[#FFD700] transition-colors mb-4" 
                  size={28} 
                />

                {/* Title */}
                <h3 className="font-black text-2xl tracking-tight mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-light text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="font-light text-neutral-400 mb-6">
            Tu competencia ya lo tiene. ¿Vas a esperar?
          </p>
        </div>
      </div>
    </section>
  );
};
