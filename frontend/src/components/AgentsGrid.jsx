import { useState } from 'react';
import { Palette, Megaphone, BarChart3, Settings, Briefcase, ShoppingCart, X, Headphones, Users, Calculator, Code, FileText, TrendingUp } from 'lucide-react';

const agents = [
  {
    id: 'vera',
    name: 'VERA',
    role: 'Agente de Diseño',
    tagline: 'Tu directora de arte que nunca duerme',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1752074211295-332a3cde530d?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Branding', 'UI/UX', 'Social Media Graphics', 'Presentaciones', 'Packaging'],
    description: 'Vera transforma ideas en visuales impactantes. Domina las tendencias, entiende tu marca y produce assets de alta calidad en tiempo récord.'
  },
  {
    id: 'milo',
    name: 'MILO',
    role: 'Agente de Comunicación',
    tagline: 'Tu community manager con cerebro de estratega',
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Content Strategy', 'Copywriting', 'Social Listening', 'Crisis Management', 'Engagement'],
    description: 'Milo no solo postea, piensa. Construye comunidades, genera conversaciones y convierte followers en fans.'
  },
  {
    id: 'nora',
    name: 'NORA',
    role: 'Agente de Marketing',
    tagline: 'Tu CMO fraccionada que analiza todo',
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1742473716788-72ec6df8a830?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Analytics', 'Campaign Planning', 'SEO/SEM', 'Growth Hacking', 'Marketing Automation'],
    description: 'Nora ve patterns donde otros ven datos. Optimiza campañas, encuentra oportunidades y maximiza tu ROI.'
  },
  {
    id: 'otto',
    name: 'OTTO',
    role: 'Agente de Gestión',
    tagline: 'Tu project manager que no se olvida de nada',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1744963129109-3f3fdf8d0b8d?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Project Planning', 'Task Management', 'Team Coordination', 'Deadline Tracking', 'Resource Allocation'],
    description: 'Otto mantiene todo en orden. Coordina equipos, trackea deadlines y asegura que nada se caiga entre las grietas.'
  },
  {
    id: 'lena',
    name: 'LENA',
    role: 'Agente de Administración',
    tagline: 'Tu back-office que procesa todo sin quejarse',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1630649740072-90a21393545d?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Data Entry', 'Invoice Processing', 'Email Management', 'Scheduling', 'Document Organization'],
    description: 'Lena se encarga de todo lo que te quita tiempo. Procesa, organiza y sistematiza para que vos te enfoques en crecer.'
  },
  {
    id: 'rock',
    name: 'ROCK',
    role: 'Agente de Ventas',
    tagline: 'Tu closer que trabaja 24/7',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1669388178278-442a9f305f97?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Lead Qualification', 'Sales Outreach', 'Follow-ups', 'Objection Handling', 'CRM Management'],
    description: 'Rock no descansa hasta cerrar. Califica leads, hace follow-ups y convierte prospectos en clientes.'
  },
  {
    id: 'sofia',
    name: 'SOFIA',
    role: 'Agente de Soporte',
    tagline: 'Tu customer success que enamora clientes',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1769636929231-3cd7f853d038?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Customer Support', 'Ticket Management', 'Live Chat', 'FAQ Automation', 'NPS Tracking'],
    description: 'Sofia convierte problemas en oportunidades. Responde consultas, resuelve tickets y mantiene a tus clientes felices 24/7.'
  },
  {
    id: 'hugo',
    name: 'HUGO',
    role: 'Agente de RRHH',
    tagline: 'Tu people manager que cuida el equipo',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1764545973653-94c40d993495?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Recruiting', 'Onboarding', 'Employee Experience', 'HR Admin', 'Culture Building'],
    description: 'Hugo gestiona el talento como nadie. Desde screening de CVs hasta onboarding, mantiene tu equipo humano en forma.'
  },
  {
    id: 'tina',
    name: 'TINA',
    role: 'Agente de Finanzas',
    tagline: 'Tu CFO que no deja pasar un número',
    icon: Calculator,
    image: 'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=srgb&fm=jpg&q=85',
    skills: ['Bookkeeping', 'Expense Tracking', 'Financial Reports', 'Invoicing', 'Budget Control'],
    description: 'Tina mantiene tus finanzas en orden. Procesa facturas, trackea gastos y genera reportes para que tomes mejores decisiones.'
  }
];

const AgentCard = ({ agent, onClick, index }) => {
  const Icon = agent.icon;
  
  return (
    <div 
      className={`group relative bg-[#050505] border border-white/5 hover:border-[#FFD700]/50 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in-up`}
      onClick={() => onClick(agent)}
      data-testid={`agent-card-${agent.id}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img 
          src={agent.image} 
          alt={agent.name}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 img-grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end min-h-[340px] md:min-h-[380px]">
        {/* Icon */}
        <div className="mb-3">
          <Icon className="text-[#FFD700] group-hover:scale-110 transition-transform duration-300" size={28} />
        </div>

        {/* Name & Role */}
        <h3 className="font-black text-xl md:text-2xl tracking-tight mb-1">
          {agent.name}
        </h3>
        <p className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-2">
          {agent.role}
        </p>

        {/* Tagline */}
        <p className="font-light text-sm text-neutral-300 leading-relaxed">
          {agent.tagline}
        </p>

        {/* View more indicator */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[#FFD700] font-mono text-xs">
            Click para ver más →
          </span>
        </div>
      </div>
    </div>
  );
};

const AgentModal = ({ agent, onClose }) => {
  if (!agent) return null;
  
  const Icon = agent.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      data-testid="agent-modal"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <div 
        className="relative bg-[#0a0a0a] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10"
          data-testid="modal-close-button"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80">
          <img 
            src={agent.image} 
            alt={agent.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 -mt-20 relative z-10">
          <Icon className="text-[#FFD700] mb-4" size={40} />
          
          <h2 className="font-black text-4xl tracking-tight mb-2">
            {agent.name}
          </h2>
          <p className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4">
            {agent.role}
          </p>
          
          <p className="font-light text-lg text-neutral-300 mb-8 leading-relaxed">
            {agent.description}
          </p>

          {/* Skills */}
          <div className="mb-8">
            <h4 className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {agent.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-[#111] border border-white/10 text-sm font-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentsGrid = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <section id="agents" className="py-24 md:py-32" data-testid="agents-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">
            El equipo
          </span>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight uppercase">
            Múltiples Agentes.<br />
            <span className="font-thin">Infinitas posibilidades.</span>
          </h2>
          <p className="font-light text-lg md:text-xl text-neutral-400 mt-6 max-w-3xl leading-relaxed">
            Armá tu propio equipo de expertos en cada área, que trabajan juntos y se comunican entre ellos.{' '}
            <span className="text-white font-normal">Ahorrá costos de manera inmediata</span> sin perder calidad ni capacidad de respuesta.
          </p>
        </div>

        {/* Bento Grid - 3x3 */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[380px]"
          data-testid="agents-grid"
        >
          {agents.map((agent, index) => (
            <AgentCard 
              key={agent.id}
              agent={agent}
              index={index}
              onClick={setSelectedAgent}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedAgent && (
        <AgentModal 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}
    </section>
  );
};
