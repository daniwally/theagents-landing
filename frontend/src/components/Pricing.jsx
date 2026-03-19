import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import t from '../translations';

const TIER_ICONS = [Zap, Crown, Building2];
const TIER_PRICES = ['$3K', '$6K', '$12K'];
const TIER_MAINTENANCE = '$350';
const TIER_IDS = ['starter', 'pro', 'enterprise'];

export const Pricing = ({ onDemoClick }) => {
  const { lang } = useLang();

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden" data-testid="pricing-section">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block mb-6">
            <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 border border-neutral-800 px-4 py-2">{t.pricing.badge[lang]}</span>
          </div>
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase mb-6">
            {t.pricing.title1[lang]}<br />
            <span className="font-thin text-[#FFD700]">{t.pricing.title2[lang]}</span>
          </h2>
          <p className="font-light text-neutral-400 max-w-2xl mx-auto text-lg">{t.pricing.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-16">
          {t.pricing.tiers.map((tier, index) => {
            const Icon = TIER_ICONS[index];
            const featured = index === 1;
            return (
              <div key={TIER_IDS[index]} className={`relative group ${featured ? 'md:-mt-4 md:mb-4' : ''}`} data-testid={`pricing-tier-${TIER_IDS[index]}`}>
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[#FFD700] text-black font-bold text-xs tracking-widest uppercase px-4 py-1">{t.pricing.popular[lang]}</span>
                  </div>
                )}
                <div className={`h-full p-8 border transition-all duration-500 ${featured ? 'bg-[#0f0f0f] border-[#FFD700]/50 hover:border-[#FFD700]' : 'bg-[#080808] border-white/10 hover:border-white/30'}`}>
                  <Icon className={`mb-6 ${featured ? 'text-[#FFD700]' : 'text-white/40'}`} size={32} />
                  <h3 className="font-bold text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">{tier.name}</h3>
                  <div className="mb-2">
                    <span className={`font-black text-5xl tracking-tight ${featured ? 'text-[#FFD700]' : 'text-white'}`}>{TIER_PRICES[index]}</span>
                  </div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">{tier.priceType[lang]} &bull; {tier.agents[lang]}</p>
                  <div className="bg-white/5 border border-white/10 p-4 mb-6">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{t.pricing.maintenance[lang]}</p>
                    <p className="text-white">
                      <span className="font-bold text-xl">{TIER_MAINTENANCE}</span>
                      <span className="text-neutral-400 text-sm">{tier.maintenanceDetail[lang]}</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{t.pricing.maintenanceIncludes[lang]}</p>
                  </div>
                  <p className="font-light text-neutral-400 mb-6">{tier.description[lang]}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features[lang].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`flex-shrink-0 mt-0.5 ${featured ? 'text-[#FFD700]' : 'text-neutral-600'}`} size={16} />
                        <span className="font-light text-sm text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onDemoClick} className={`w-full py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 ${featured ? 'bg-[#FFD700] text-black hover:bg-white' : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'}`} data-testid={`pricing-cta-${TIER_IDS[index]}`}>
                    {tier.cta[lang]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrations banner */}
        <div className="mb-16 p-8 md:p-12 border border-white/10 bg-[#080808]">
          <div className="text-center mb-8">
            <h3 className="font-black text-3xl md:text-4xl tracking-tight mb-3">{t.pricing.integrationTitle[lang]}</h3>
            <p className="font-light text-lg text-neutral-400 max-w-2xl mx-auto">
              {t.pricing.integrationDesc[lang]}{' '}
              <span className="text-white">{t.pricing.integrationHighlight[lang]}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Gmail', 'Odoo', 'Slack', 'HubSpot', 'Notion', 'WhatsApp', 'Salesforce', 'Trello', 'Asana', 'Shopify', 'WooCommerce', 'Zapier', 'Stripe', 'MercadoLibre', 'Instagram', 'Facebook', 'LinkedIn', 'Mailchimp', 'Zoom'].map(name => (
              <div key={name} className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light text-neutral-300">{name}</div>
            ))}
            <div className="px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 text-sm font-bold text-[#FFD700]">{t.pricing.hundredsMore[lang]}</div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block border-t border-b border-white/10 py-6 px-12">
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-600 uppercase">WTF Agency — Brief Destroyers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
