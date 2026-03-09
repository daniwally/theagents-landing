import { Building2, ShoppingBag, Stethoscope, Zap, Check } from 'lucide-react';

const packs = [
  {
    id: 'agency',
    name: 'Pack Agencia',
    icon: Building2,
    agents: ['Milo', 'Nora', 'Otto'],
    idealFor: 'Agencias creativas, estudios de diseño, consultoras',
    features: [
      'Gestión de proyectos automatizada',
      'Content strategy 24/7',
      'Analytics y reporting',
      'Coordinación de equipos'
    ]
  },
  {
    id: 'ecommerce',
    name: 'Pack E-commerce',
    icon: ShoppingBag,
    agents: ['Rock', 'Lena', 'Vera'],
    idealFor: 'Tiendas online, marketplaces, D2C brands',
    features: [
      'Atención al cliente 24/7',
      'Procesamiento de pedidos',
      'Creación de assets visuales',
      'Seguimiento de ventas'
    ]
  },
  {
    id: 'professional',
    name: 'Pack Profesionales',
    icon: Stethoscope,
    agents: ['Otto', 'Lena'],
    idealFor: 'Médicos, abogados, contadores, consultores',
    features: [
      'Gestión de agenda',
      'Facturación automática',
      'Organización de documentos',
      'Seguimiento de pacientes/clientes'
    ]
  },
  {
    id: 'full',
    name: 'Pack Full',
    icon: Zap,
    agents: ['Los 6 agentes'],
    idealFor: 'Empresas que quieren escalar rápido',
    features: [
      'Equipo completo integrado',
      'Máxima automatización',
      'Personalización total',
      'Soporte prioritario'
    ],
    featured: true
  }
];

export const Packs = ({ onSelectPack }) => {
  return (
    <section 
      id="packs" 
      className="py-24 md:py-32"
      data-testid="packs-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">
            Soluciones
          </span>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight uppercase">
            Packs por<br />
            <span className="font-thin">industria.</span>
          </h2>
        </div>

        {/* Packs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packs.map((pack, index) => {
            const Icon = pack.icon;
            return (
              <div 
                key={pack.id}
                className={`group relative p-8 border transition-all duration-300 animate-fade-in-up ${
                  pack.featured 
                    ? 'bg-[#FFD700]/5 border-[#FFD700]/30 hover:border-[#FFD700]' 
                    : 'bg-[#050505] border-white/10 hover:border-[#FFD700]/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`pack-${pack.id}`}
              >
                {/* Featured badge */}
                {pack.featured && (
                  <div className="absolute top-0 right-0 bg-[#FFD700] text-black font-bold text-xs tracking-widest uppercase px-4 py-2">
                    Recomendado
                  </div>
                )}

                {/* Icon */}
                <Icon 
                  className={`mb-6 ${pack.featured ? 'text-[#FFD700]' : 'text-white/60 group-hover:text-[#FFD700]'} transition-colors`} 
                  size={36} 
                />

                {/* Name */}
                <h3 className="font-black text-2xl tracking-tight mb-2">
                  {pack.name}
                </h3>

                {/* Agents included */}
                <p className="font-mono text-[#FFD700] text-sm mb-4">
                  {pack.agents.join(' + ')}
                </p>

                {/* Ideal for */}
                <p className="font-light text-neutral-400 mb-6">
                  Ideal para: {pack.idealFor}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="text-[#FFD700] flex-shrink-0 mt-0.5" size={16} />
                      <span className="font-light text-sm text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button 
                  onClick={() => onSelectPack(pack)}
                  className={`w-full text-sm ${pack.featured ? 'btn-primary' : 'btn-secondary'}`}
                  data-testid={`pack-cta-${pack.id}`}
                >
                  Elegir este pack
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
