import { useState } from 'react';
import { Palette, Megaphone, BarChart3, Settings, Briefcase, ShoppingCart, X, Headphones, Users, Calculator } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import t from '../translations';

const ICONS = [Palette, Megaphone, BarChart3, Settings, Briefcase, ShoppingCart, Headphones, Users, Calculator];
const IMAGES = [
  'https://images.unsplash.com/photo-1752074211295-332a3cde530d?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1742473716788-72ec6df8a830?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1744963129109-3f3fdf8d0b8d?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1630649740072-90a21393545d?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1669388178278-442a9f305f97?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1769636929231-3cd7f853d038?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1764545973653-94c40d993495?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=srgb&fm=jpg&q=85',
];
const SKILLS = [
  ['Branding', 'UI/UX', 'Social Media Graphics', 'Presentaciones', 'Packaging'],
  ['Content Strategy', 'Copywriting', 'Social Listening', 'Crisis Management', 'Engagement'],
  ['Analytics', 'Campaign Planning', 'SEO/SEM', 'Growth Hacking', 'Marketing Automation'],
  ['Project Planning', 'Task Management', 'Team Coordination', 'Deadline Tracking', 'Resource Allocation'],
  ['Data Entry', 'Invoice Processing', 'Email Management', 'Scheduling', 'Document Organization'],
  ['Lead Qualification', 'Sales Outreach', 'Follow-ups', 'Objection Handling', 'CRM Management'],
  ['Customer Support', 'Ticket Management', 'Live Chat', 'FAQ Automation', 'NPS Tracking'],
  ['Recruiting', 'Onboarding', 'Employee Experience', 'HR Admin', 'Culture Building'],
  ['Bookkeeping', 'Expense Tracking', 'Financial Reports', 'Invoicing', 'Budget Control'],
];

const AgentCard = ({ agent, icon: Icon, image, onClick, index, lang }) => (
  <div
    className="group relative bg-[#050505] border border-white/5 hover:border-[#FFD700]/50 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in-up"
    onClick={() => onClick(index)}
    data-testid={`agent-card-${agent.id}`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute inset-0">
      <img src={image} alt={agent.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 img-grayscale group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end min-h-[340px] md:min-h-[380px]">
      <div className="mb-3"><Icon className="text-[#FFD700] group-hover:scale-110 transition-transform duration-300" size={28} /></div>
      <h3 className="font-black text-xl md:text-2xl tracking-tight mb-1">{agent.name}</h3>
      <p className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-2">{agent.role[lang]}</p>
      <p className="font-light text-sm text-neutral-300 leading-relaxed">{agent.tagline[lang]}</p>
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[#FFD700] font-mono text-xs">{t.agents.clickMore[lang]}</span>
      </div>
    </div>
  </div>
);

const AgentModal = ({ agentIndex, onClose, lang }) => {
  if (agentIndex === null) return null;
  const agent = t.agents.list[agentIndex];
  const Icon = ICONS[agentIndex];
  const image = IMAGES[agentIndex];
  const skills = SKILLS[agentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} data-testid="agent-modal">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative bg-[#0a0a0a] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10" data-testid="modal-close-button"><X size={24} /></button>
        <div className="relative h-64 md:h-80">
          <img src={image} alt={agent.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
        <div className="p-8 -mt-20 relative z-10">
          <Icon className="text-[#FFD700] mb-4" size={40} />
          <h2 className="font-black text-4xl tracking-tight mb-2">{agent.name}</h2>
          <p className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4">{agent.role[lang]}</p>
          <p className="font-light text-lg text-neutral-300 mb-8 leading-relaxed">{agent.description[lang]}</p>
          <div className="mb-8">
            <h4 className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">{t.agents.skills[lang]}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-[#111] border border-white/10 text-sm font-light">{skill}</span>
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
  const { lang } = useLang();

  return (
    <section id="agents" className="py-24 md:py-32" data-testid="agents-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">{t.agents.sectionLabel[lang]}</span>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight uppercase">
            {t.agents.sectionTitle1[lang]}<br />
            <span className="font-thin">{t.agents.sectionTitle2[lang]}</span>
          </h2>
          <p className="font-light text-lg md:text-xl text-neutral-400 mt-6 max-w-3xl leading-relaxed">
            {t.agents.sectionDesc[lang]}{' '}
            <span className="text-white font-normal">{t.agents.sectionDescHighlight[lang]}</span>
            {t.agents.sectionDescEnd[lang]}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[380px]" data-testid="agents-grid">
          {t.agents.list.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} icon={ICONS[index]} image={IMAGES[index]} index={index} onClick={setSelectedAgent} lang={lang} />
          ))}
        </div>
      </div>
      {selectedAgent !== null && <AgentModal agentIndex={selectedAgent} onClose={() => setSelectedAgent(null)} lang={lang} />}
    </section>
  );
};
