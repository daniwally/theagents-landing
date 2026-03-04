import { Check, Zap, Crown, Building2 } from 'lucide-react';

const tiers = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '$3K',
    priceType: 'setup único',
    maintenance: '$350',
    maintenanceDetail: '/mes por agente',
    agents: '1 agente',
    icon: Zap,
    description: 'Para empresas que quieren empezar',
    features: [
      '1 agente personalizado',
      'Integración básica',
      'Soporte incluido',
      'AWS hosting incluido',
      'Licencias IA incluidas',
      'Onboarding guiado'
    ],
    cta: 'AGENDAR DEMO',
    featured: false
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '$6K',
    priceType: 'setup único',
    maintenance: '$350',
    maintenanceDetail: '/mes por agente',
    agents: '2 agentes',
    icon: Crown,
    description: 'Para empresas en crecimiento',
    features: [
      '2 agentes personalizados',
      'Integraciones avanzadas',
      'Soporte prioritario 24/7',
      'AWS hosting incluido',
      'Licencias IA incluidas',
      'Analytics completo',
      'API access',
      'Training dedicado'
    ],
    cta: 'AGENDAR DEMO',
    featured: true
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: '$12K',
    priceType: 'setup único',
    maintenance: '$350',
    maintenanceDetail: '/mes por agente',
    agents: 'Hasta 3 agentes',
    icon: Building2,
    description: 'Para empresas que quieren dominar',
    features: [
      'Hasta 3 agentes personalizados',
      'Integraciones enterprise',
      'Account manager dedicado',
      'AWS hosting incluido',
      'Licencias IA incluidas',
      'White-label disponible',
      'SLA garantizado',
      'Custom AI training'
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
            Setup único + mantenimiento mensual. Sin sorpresas, sin letra chica.
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
                  
                  {/* Setup Price */}
                  <div className="mb-2">
                    <span className={`font-black text-5xl tracking-tight ${
                      tier.featured ? 'text-[#FFD700]' : 'text-white'
                    }`}>
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
                    {tier.priceType} • {tier.agents}
                  </p>
                  
                  {/* Maintenance */}
                  <div className="bg-white/5 border border-white/10 p-4 mb-6">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                      Mantenimiento
                    </p>
                    <p className="text-white">
                      <span className="font-bold text-xl">{tier.maintenance}</span>
                      <span className="text-neutral-400 text-sm">{tier.maintenanceDetail}</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Incluye soporte, AWS y licencias IA
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="font-light text-neutral-400 mb-6">
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

        {/* Integrations banner */}
        <div className="mb-16 p-8 md:p-12 border border-white/10 bg-[#080808]">
          <div className="text-center mb-8">
            <h3 className="font-black text-3xl md:text-4xl tracking-tight mb-3">
              +500 integraciones
            </h3>
            <p className="font-light text-lg text-neutral-400 max-w-2xl mx-auto">
              Tus nuevos empleados ya conocen todas tus herramientas.{' '}
              <span className="text-white">Se conectan al instante y empiezan a trabajar.</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Gmail
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Google Calendar
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Odoo
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Slack
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              HubSpot
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Notion
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              WhatsApp
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Salesforce
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Trello
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Asana
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Shopify
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              WooCommerce
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Zapier
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Stripe
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              MercadoLibre
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Instagram
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Facebook
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              LinkedIn
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Mailchimp
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">
              Zoom
            </div>
            <div className="px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 text-sm font-bold text-[#FFD700]">
              + cientos más
            </div>
          </div>
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
