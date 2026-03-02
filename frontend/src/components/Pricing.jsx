import { Check, Zap, Crown, Building2 } from 'lucide-react';

const tiers = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '$3K',
    period: '/mes',
    icon: Zap,
    description: 'Para empresas que quieren empezar',
    features: [
      '1 agente personalizado',
      'Integración básica',
      'Soporte por email',
      '1.000 interacciones/mes',
      'Dashboard básico',
      'Onboarding guiado'
    ],
    cta: 'AGENDAR DEMO',
    featured: false
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '$6K',
    period: '/mes',
    icon: Crown,
    description: 'Para empresas en crecimiento',
    features: [
      '3 agentes personalizados',
      'Integraciones avanzadas',
      'Soporte prioritario 24/7',
      '10.000 interacciones/mes',
      'Analytics completo',
      'API access',
      'Custom workflows',
      'Training dedicado'
    ],
    cta: 'AGENDAR DEMO',
    featured: true
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: '$12K',
    period: '/mes',
    icon: Building2,
    description: 'Para empresas que quieren dominar',
    features: [
      'Agentes ilimitados',
      'Integraciones enterprise',
      'Account manager dedicado',
      'Interacciones ilimitadas',
      'White-label disponible',
      'SLA garantizado',
      'On-premise opcional',
      'Custom AI training',
      'Compliance & security'
    ],
    cta: 'AGENDAR DEMO',
    featured: false
  }
];

export const Pricing = ({ onDemoClick }) => {
  return (
    <section 
      id="pricing" 
      className="py-24 md:py-32 relative overflow-hidden"
      data-testid="pricing-section"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block mb-6">
            <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 border border-neutral-800 px-4 py-2">
              AI AGENTS — 2026
            </span>
          </div>
          
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase mb-6">
            Tu propio agente<br />
            <span className="font-thin text-[#FFD700]">inteligente</span>
          </h2>
          
          <p className="font-light text-neutral-400 max-w-2xl mx-auto text-lg">
            Elegí el plan que mejor se adapte a tu empresa. Sin contratos largos, sin letra chica.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-16">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div 
                key={tier.id}
                className={`relative group ${
                  tier.featured 
                    ? 'md:-mt-4 md:mb-4' 
                    : ''
                }`}
                data-testid={`pricing-tier-${tier.id}`}
              >
                {/* Featured badge */}
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[#FFD700] text-black font-bold text-xs tracking-widest uppercase px-4 py-1">
                      Más popular
                    </span>
                  </div>
                )}
                
                <div 
                  className={`h-full p-8 border transition-all duration-500 ${
                    tier.featured 
                      ? 'bg-[#0f0f0f] border-[#FFD700]/50 hover:border-[#FFD700]' 
                      : 'bg-[#080808] border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Icon */}
                  <Icon 
                    className={`mb-6 ${tier.featured ? 'text-[#FFD700]' : 'text-white/40'}`} 
                    size={32} 
                  />
                  
                  {/* Tier name */}
                  <h3 className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">
                    {tier.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className={`font-black text-5xl tracking-tight ${
                      tier.featured ? 'text-[#FFD700]' : 'text-white'
                    }`}>
                      {tier.price}
                    </span>
                    <span className="text-neutral-500 font-light">{tier.period}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="font-light text-neutral-400 mb-8">
                    {tier.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check 
                          className={`flex-shrink-0 mt-0.5 ${
                            tier.featured ? 'text-[#FFD700]' : 'text-neutral-600'
                          }`} 
                          size={16} 
                        />
                        <span className="font-light text-sm text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <button 
                    onClick={onDemoClick}
                    className={`w-full py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                      tier.featured 
                        ? 'bg-[#FFD700] text-black hover:bg-white' 
                        : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'
                    }`}
                    data-testid={`pricing-cta-${tier.id}`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-block border-t border-b border-white/10 py-6 px-12">
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-600 uppercase">
              WTF Agency — Brief Destroyers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
