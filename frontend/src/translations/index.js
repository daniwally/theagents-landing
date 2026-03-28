const t = {
  // ── Header ──
  header: {
    agents: { es: 'Agentes', en: 'Agents', pt: 'Agentes' },
    howItWorks: { es: 'Cómo funciona', en: 'How it works', pt: 'Como funciona' },
  },

  // ── Hero ──
  hero: {
    poweredBy: { es: 'Powered by WTF Agency', en: 'Powered by WTF Agency', pt: 'Powered by WTF Agency' },
    headline1: { es: 'Tu próximo', en: 'Your next', pt: 'Sua próxima' },
    headline2: { es: 'equipo no tiene', en: 'team has no', pt: 'equipe não tem' },
    headline3: { es: 'LinkedIn.', en: 'LinkedIn.', pt: 'LinkedIn.' },
    subtitle: {
      es: 'Agentes IA especializados que trabajan 24/7 para tu empresa o para vos. Cada uno con personalidad, skills y experiencia única.',
      en: 'Specialized AI agents working 24/7 for your company or for you. Each one with its own personality, skills, and unique experience.',
      pt: 'Agentes de IA especializados que trabalham 24/7 para sua empresa ou para você. Cada um com personalidade, skills e experiência única.',
    },
    ctaPrimary: { es: 'Conocé tu equipo', en: 'Meet your team', pt: 'Conheça seu time' },
    ctaSecondary: { es: 'Agendar demo', en: 'Book a demo', pt: 'Agendar demo' },
  },

  // ── Agents ──
  agents: {
    sectionLabel: { es: 'El equipo', en: 'The team', pt: 'O time' },
    sectionTitle1: { es: 'Múltiples Agentes.', en: 'Multiple Agents.', pt: 'Múltiplos Agentes.' },
    sectionTitle2: { es: 'Infinitas posibilidades.', en: 'Infinite possibilities.', pt: 'Possibilidades infinitas.' },
    sectionDesc: {
      es: 'Armá tu propio equipo de expertos en cada área, que trabajan juntos y se comunican entre ellos.',
      en: 'Build your own team of experts in every area, working together and communicating with each other.',
      pt: 'Monte seu próprio time de especialistas em cada área, que trabalham juntos e se comunicam entre si.',
    },
    sectionDescHighlight: {
      es: 'Ahorrá costos de manera inmediata',
      en: 'Cut costs immediately',
      pt: 'Reduza custos imediatamente',
    },
    sectionDescEnd: {
      es: ' sin perder calidad ni capacidad de respuesta.',
      en: ' without losing quality or responsiveness.',
      pt: ' sem perder qualidade nem capacidade de resposta.',
    },
    clickMore: { es: 'Click para ver más →', en: 'Click to see more →', pt: 'Clique para ver mais →' },
    skills: { es: 'Skills', en: 'Skills', pt: 'Skills' },
    list: [
      {
        id: 'vera', name: 'VERA',
        role: { es: 'Agente de Diseño', en: 'Design Agent', pt: 'Agente de Design' },
        tagline: { es: 'Tu directora de arte que nunca duerme', en: 'Your art director that never sleeps', pt: 'Sua diretora de arte que nunca dorme' },
        description: {
          es: 'Vera transforma ideas en visuales impactantes. Domina las tendencias, entiende tu marca y produce assets de alta calidad en tiempo récord.',
          en: 'Vera transforms ideas into stunning visuals. She masters trends, understands your brand, and produces high-quality assets in record time.',
          pt: 'Vera transforma ideias em visuais impactantes. Domina as tendências, entende sua marca e produz assets de alta qualidade em tempo recorde.',
        },
      },
      {
        id: 'milo', name: 'MILO',
        role: { es: 'Agente de Comunicación', en: 'Communications Agent', pt: 'Agente de Comunicação' },
        tagline: { es: 'Tu community manager con cerebro de estratega', en: 'Your community manager with a strategist\'s brain', pt: 'Seu community manager com cérebro de estrategista' },
        description: {
          es: 'Milo no solo postea, piensa. Construye comunidades, genera conversaciones y convierte followers en fans.',
          en: 'Milo doesn\'t just post, he thinks. Builds communities, sparks conversations, and turns followers into fans.',
          pt: 'Milo não só posta, pensa. Constrói comunidades, gera conversas e transforma seguidores em fãs.',
        },
      },
      {
        id: 'nora', name: 'NORA',
        role: { es: 'Agente de Marketing', en: 'Marketing Agent', pt: 'Agente de Marketing' },
        tagline: { es: 'Tu CMO fraccionada que analiza todo', en: 'Your fractional CMO that analyzes everything', pt: 'Sua CMO fracionada que analisa tudo' },
        description: {
          es: 'Nora ve patterns donde otros ven datos. Optimiza campañas, encuentra oportunidades y maximiza tu ROI.',
          en: 'Nora sees patterns where others see data. Optimizes campaigns, finds opportunities, and maximizes your ROI.',
          pt: 'Nora vê padrões onde outros veem dados. Otimiza campanhas, encontra oportunidades e maximiza seu ROI.',
        },
      },
      {
        id: 'otto', name: 'OTTO',
        role: { es: 'Agente de Gestión', en: 'Management Agent', pt: 'Agente de Gestão' },
        tagline: { es: 'Tu project manager que no se olvida de nada', en: 'Your project manager that never forgets a thing', pt: 'Seu gerente de projetos que não esquece de nada' },
        description: {
          es: 'Otto mantiene todo en orden. Coordina equipos, trackea deadlines y asegura que nada se caiga entre las grietas.',
          en: 'Otto keeps everything in order. Coordinates teams, tracks deadlines, and makes sure nothing falls through the cracks.',
          pt: 'Otto mantém tudo em ordem. Coordena equipes, rastreia prazos e garante que nada passe despercebido.',
        },
      },
      {
        id: 'lena', name: 'LENA',
        role: { es: 'Agente de Administración', en: 'Admin Agent', pt: 'Agente de Administração' },
        tagline: { es: 'Tu back-office que procesa todo sin quejarse', en: 'Your back-office that handles everything without complaints', pt: 'Seu back-office que processa tudo sem reclamar' },
        description: {
          es: 'Lena se encarga de todo lo que te quita tiempo. Procesa, organiza y sistematiza para que vos te enfoques en crecer.',
          en: 'Lena handles everything that takes up your time. Processes, organizes, and systematizes so you can focus on growing.',
          pt: 'Lena cuida de tudo que toma seu tempo. Processa, organiza e sistematiza para que você foque em crescer.',
        },
      },
      {
        id: 'rock', name: 'ROCK',
        role: { es: 'Agente de Ventas', en: 'Sales Agent', pt: 'Agente de Vendas' },
        tagline: { es: 'Tu closer que trabaja 24/7', en: 'Your closer that works 24/7', pt: 'Seu closer que trabalha 24/7' },
        description: {
          es: 'Rock no descansa hasta cerrar. Califica leads, hace follow-ups y convierte prospectos en clientes.',
          en: 'Rock doesn\'t rest until the deal is closed. Qualifies leads, follows up, and converts prospects into clients.',
          pt: 'Rock não descansa até fechar. Qualifica leads, faz follow-ups e converte prospects em clientes.',
        },
      },
      {
        id: 'sofia', name: 'SOFIA',
        role: { es: 'Agente de Soporte', en: 'Support Agent', pt: 'Agente de Suporte' },
        tagline: { es: 'Tu customer success que enamora clientes', en: 'Your customer success that wins hearts', pt: 'Seu customer success que encanta clientes' },
        description: {
          es: 'Sofia convierte problemas en oportunidades. Responde consultas, resuelve tickets y mantiene a tus clientes felices 24/7.',
          en: 'Sofia turns problems into opportunities. Answers queries, resolves tickets, and keeps your clients happy 24/7.',
          pt: 'Sofia transforma problemas em oportunidades. Responde consultas, resolve tickets e mantém seus clientes felizes 24/7.',
        },
      },
      {
        id: 'hugo', name: 'HUGO',
        role: { es: 'Agente de RRHH', en: 'HR Agent', pt: 'Agente de RH' },
        tagline: { es: 'Tu people manager que cuida el equipo', en: 'Your people manager that takes care of the team', pt: 'Seu people manager que cuida do time' },
        description: {
          es: 'Hugo gestiona el talento como nadie. Desde screening de CVs hasta onboarding, mantiene tu equipo humano en forma.',
          en: 'Hugo manages talent like no one else. From CV screening to onboarding, he keeps your human team in top shape.',
          pt: 'Hugo gerencia talentos como ninguém. Do screening de CVs ao onboarding, mantém seu time humano em forma.',
        },
      },
      {
        id: 'tina', name: 'TINA',
        role: { es: 'Agente de Finanzas', en: 'Finance Agent', pt: 'Agente de Finanças' },
        tagline: { es: 'Tu CFO que no deja pasar un número', en: 'Your CFO that never misses a number', pt: 'Sua CFO que não deixa passar nenhum número' },
        description: {
          es: 'Tina mantiene tus finanzas en orden. Procesa facturas, trackea gastos y genera reportes para que tomes mejores decisiones.',
          en: 'Tina keeps your finances in order. Processes invoices, tracks expenses, and generates reports for better decisions.',
          pt: 'Tina mantém suas finanças em ordem. Processa faturas, rastreia gastos e gera relatórios para melhores decisões.',
        },
      },
    ],
  },

  // ── How it Works ──
  howItWorks: {
    sectionLabel: { es: 'El proceso', en: 'The process', pt: 'O processo' },
    sectionTitle1: { es: '4 pasos.', en: '4 steps.', pt: '4 passos.' },
    sectionTitle2: { es: 'Sin complicaciones.', en: 'No complications.', pt: 'Sem complicações.' },
    steps: [
      {
        title: { es: 'Elegís', en: 'Choose', pt: 'Escolha' },
        description: {
          es: 'Seleccioná los agentes que necesita tu empresa o elegí un pack según tu industria.',
          en: 'Select the agents your company needs or choose a pack based on your industry.',
          pt: 'Selecione os agentes que sua empresa precisa ou escolha um pacote por indústria.',
        },
      },
      {
        title: { es: 'Personalizamos', en: 'We customize', pt: 'Personalizamos' },
        description: {
          es: 'Configuramos cada agente con la voz de tu marca, tus procesos y tus preferencias.',
          en: 'We configure each agent with your brand voice, processes, and preferences.',
          pt: 'Configuramos cada agente com a voz da sua marca, seus processos e preferências.',
        },
      },
      {
        title: { es: 'Se integran', en: 'They integrate', pt: 'Integração' },
        description: {
          es: 'Los conectamos con tus herramientas: Slack, email, CRM, lo que uses.',
          en: 'We connect them to your tools: Slack, email, CRM, whatever you use.',
          pt: 'Conectamos com suas ferramentas: Slack, email, CRM, o que você usar.',
        },
      },
      {
        title: { es: 'Arrancan a trabajar', en: 'They start working', pt: 'Começam a trabalhar' },
        description: {
          es: 'En menos de 48hs tu equipo de agentes está operativo y produciendo resultados.',
          en: 'In less than 48h your agent team is operational and producing results.',
          pt: 'Em menos de 48h seu time de agentes está operacional e produzindo resultados.',
        },
      },
    ],
    ctaLine1: { es: 'Tu competencia', en: 'Your competitors', pt: 'Sua concorrência' },
    ctaHighlight: { es: 'ya lo tiene.', en: 'already have it.', pt: 'já tem isso.' },
    ctaLine2Start: { es: '¿Vas a', en: 'Are you going to', pt: 'Vai' },
    ctaLine2Highlight: { es: 'esperar', en: 'wait', pt: 'esperar' },
    ctaLine2End: { es: '?', en: '?', pt: '?' },
  },

  // ── Why Us ──
  whyUs: {
    yearsLabel: { es: 'Años de experiencia', en: 'Years of experience', pt: 'Anos de experiência' },
    title1: { es: 'No somos una startup de IA.', en: 'We\'re not an AI startup.', pt: 'Não somos uma startup de IA.' },
    title2: { es: 'Somos una agencia que evolucionó.', en: 'We\'re an agency that evolved.', pt: 'Somos uma agência que evoluiu.' },
    p1: {
      es: 'Durante 15 años construimos marcas, estrategias y equipos creativos para las empresas más exigentes de Latinoamérica. Aprendimos qué funciona, qué no, y sobre todo: ',
      en: 'For 15 years we\'ve built brands, strategies, and creative teams for the most demanding companies in Latin America. We learned what works, what doesn\'t, and above all: ',
      pt: 'Durante 15 anos construímos marcas, estratégias e equipes criativas para as empresas mais exigentes da América Latina. Aprendemos o que funciona, o que não, e sobretudo: ',
    },
    p1Highlight: {
      es: 'qué necesitan realmente los negocios para crecer.',
      en: 'what businesses really need to grow.',
      pt: 'o que os negócios realmente precisam para crescer.',
    },
    p2Start: { es: 'Esa experiencia es la que hoy ponemos en cada agente. No son bots genéricos. Son ', en: 'That experience is what we put into every agent today. They\'re not generic bots. They\'re ', pt: 'Essa experiência é o que colocamos em cada agente hoje. Não são bots genéricos. São ' },
    p2Highlight: { es: 'especialistas digitales', en: 'digital specialists', pt: 'especialistas digitais' },
    p2End: { es: ' entrenados con el mismo criterio que usamos para formar equipos humanos de alto rendimiento.', en: ' trained with the same criteria we use to build high-performance human teams.', pt: ' treinados com o mesmo critério que usamos para formar equipes humanas de alto desempenho.' },
    p3Start: { es: 'Entendemos de branding, de comunicación, de ventas, de procesos. Por eso nuestros agentes no solo ejecutan tareas: ', en: 'We understand branding, communication, sales, and processes. That\'s why our agents don\'t just execute tasks: ', pt: 'Entendemos de branding, comunicação, vendas, processos. Por isso nossos agentes não só executam tarefas: ' },
    p3Highlight: { es: 'entienden el contexto, cuidan tu marca y piensan como parte de tu equipo.', en: 'they understand context, protect your brand, and think as part of your team.', pt: 'entendem o contexto, cuidam da sua marca e pensam como parte do seu time.' },
    stat1: { es: 'Oficinas en Latam', en: 'Offices in Latam', pt: 'Escritórios na Latam' },
    stat2: { es: 'Marcas creadas', en: 'Brands created', pt: 'Marcas criadas' },
    stat3: { es: 'Horas trabajadas', en: 'Hours worked', pt: 'Horas trabalhadas' },
  },

  // ── Pricing ──
  pricing: {
    badge: { es: 'AI AGENTS — 2026', en: 'AI AGENTS — 2026', pt: 'AI AGENTS — 2026' },
    title1: { es: 'Tu propio agente', en: 'Your own', pt: 'Seu próprio agente' },
    title2: { es: 'inteligente', en: 'intelligent agent', pt: 'inteligente' },
    subtitle: { es: 'Setup único + mantenimiento mensual. Sin sorpresas, sin letra chica.', en: 'One-time setup + monthly maintenance. No surprises, no fine print.', pt: 'Setup único + manutenção mensal. Sem surpresas, sem letras miúdas.' },
    popular: { es: 'Más popular', en: 'Most popular', pt: 'Mais popular' },
    maintenance: { es: 'Mantenimiento', en: 'Maintenance', pt: 'Manutenção' },
    maintenanceIncludes: { es: 'Incluye soporte, AWS y licencias IA', en: 'Includes support, AWS & AI licenses', pt: 'Inclui suporte, AWS e licenças IA' },
    integrationTitle: { es: '+500 integraciones', en: '+500 integrations', pt: '+500 integrações' },
    integrationDesc: {
      es: 'Tus nuevos empleados ya conocen todas tus herramientas.',
      en: 'Your new employees already know all your tools.',
      pt: 'Seus novos funcionários já conhecem todas as suas ferramentas.',
    },
    integrationHighlight: {
      es: 'Se conectan al instante y empiezan a trabajar.',
      en: 'They connect instantly and start working.',
      pt: 'Conectam-se instantaneamente e começam a trabalhar.',
    },
    hundredsMore: { es: '+ cientos más', en: '+ hundreds more', pt: '+ centenas mais' },
    tiers: [
      {
        name: 'STARTER',
        priceType: { es: 'setup único', en: 'one-time setup', pt: 'setup único' },
        maintenanceDetail: { es: '/mes por agente', en: '/mo per agent', pt: '/mês por agente' },
        agents: { es: '1 agente', en: '1 agent', pt: '1 agente' },
        description: { es: 'Para empresas que quieren empezar', en: 'For companies that want to start', pt: 'Para empresas que querem começar' },
        features: {
          es: ['1 agente personalizado', 'Integración básica', 'Soporte incluido', 'AWS hosting incluido', 'Licencias IA incluidas', 'Onboarding guiado'],
          en: ['1 custom agent', 'Basic integration', 'Support included', 'AWS hosting included', 'AI licenses included', 'Guided onboarding'],
          pt: ['1 agente personalizado', 'Integração básica', 'Suporte incluído', 'AWS hosting incluído', 'Licenças IA incluídas', 'Onboarding guiado'],
        },
        cta: { es: 'AGENDAR DEMO', en: 'BOOK DEMO', pt: 'AGENDAR DEMO' },
      },
      {
        name: 'PRO',
        priceType: { es: 'setup único', en: 'one-time setup', pt: 'setup único' },
        maintenanceDetail: { es: '/mes por agente', en: '/mo per agent', pt: '/mês por agente' },
        agents: { es: '2 agentes', en: '2 agents', pt: '2 agentes' },
        description: { es: 'Para empresas en crecimiento', en: 'For growing companies', pt: 'Para empresas em crescimento' },
        features: {
          es: ['2 agentes personalizados', 'Integraciones avanzadas', 'Soporte prioritario 24/7', 'AWS hosting incluido', 'Licencias IA incluidas', 'Analytics completo', 'API access', 'Training dedicado'],
          en: ['2 custom agents', 'Advanced integrations', 'Priority support 24/7', 'AWS hosting included', 'AI licenses included', 'Full analytics', 'API access', 'Dedicated training'],
          pt: ['2 agentes personalizados', 'Integrações avançadas', 'Suporte prioritário 24/7', 'AWS hosting incluído', 'Licenças IA incluídas', 'Analytics completo', 'API access', 'Treinamento dedicado'],
        },
        cta: { es: 'AGENDAR DEMO', en: 'BOOK DEMO', pt: 'AGENDAR DEMO' },
      },
      {
        name: 'ENTERPRISE',
        priceType: { es: 'setup único', en: 'one-time setup', pt: 'setup único' },
        maintenanceDetail: { es: '/mes por agente', en: '/mo per agent', pt: '/mês por agente' },
        agents: { es: 'Hasta 3 agentes', en: 'Up to 3 agents', pt: 'Até 3 agentes' },
        description: { es: 'Para empresas que quieren dominar', en: 'For companies that want to dominate', pt: 'Para empresas que querem dominar' },
        features: {
          es: ['Hasta 3 agentes personalizados', 'Integraciones enterprise', 'Account manager dedicado', 'AWS hosting incluido', 'Licencias IA incluidas', 'White-label disponible', 'SLA garantizado', 'Custom AI training'],
          en: ['Up to 3 custom agents', 'Enterprise integrations', 'Dedicated account manager', 'AWS hosting included', 'AI licenses included', 'White-label available', 'Guaranteed SLA', 'Custom AI training'],
          pt: ['Até 3 agentes personalizados', 'Integrações enterprise', 'Account manager dedicado', 'AWS hosting incluído', 'Licenças IA incluídas', 'White-label disponível', 'SLA garantido', 'Custom AI training'],
        },
        cta: { es: 'AGENDAR DEMO', en: 'BOOK DEMO', pt: 'AGENDAR DEMO' },
      },
    ],
  },

  // ── Dream Team ──
  dreamTeam: {
    label: { es: 'Tu nuevo equipo', en: 'Your new team', pt: 'Seu novo time' },
    title1: { es: 'El equipo que', en: 'The team you', pt: 'O time que você' },
    title2: { es: 'siempre soñaste.', en: 'always dreamed of.', pt: 'sempre sonhou.' },
    description: {
      es: 'Imaginá tener un equipo de especialistas senior trabajando para vos las 24 horas del día, los 365 días del año. <highlight>Sin reuniones innecesarias. Sin licencias. Sin rotación. Sin excusas.</highlight> Cada agente domina su área como un director con 15 años de experiencia: tu diseñadora entrega campañas a las 3AM, tu CFO analiza números mientras dormís, tu closer cierra ventas en feriados. <accent>Es el equipo que las Fortune 500 tienen, pero al alcance de tu empresa.</accent>',
      en: 'Imagine having a team of senior specialists working for you 24 hours a day, 365 days a year. <highlight>No unnecessary meetings. No leaves. No turnover. No excuses.</highlight> Each agent masters their area like a director with 15 years of experience: your designer delivers campaigns at 3AM, your CFO crunches numbers while you sleep, your closer seals deals on holidays. <accent>It\'s the team Fortune 500 companies have, but within your company\'s reach.</accent>',
      pt: 'Imagine ter um time de especialistas seniores trabalhando para você 24 horas por dia, 365 dias por ano. <highlight>Sem reuniões desnecessárias. Sem licenças. Sem rotatividade. Sem desculpas.</highlight> Cada agente domina sua área como um diretor com 15 anos de experiência: sua designer entrega campanhas às 3AM, seu CFO analisa números enquanto você dorme, seu closer fecha vendas em feriados. <accent>É o time que as Fortune 500 têm, mas ao alcance da sua empresa.</accent>',
    },
    ctaQuestion: { es: '¿Listo para conocerlos?', en: 'Ready to meet them?', pt: 'Pronto para conhecê-los?' },
    ctaButton: { es: 'Quiero mi equipo', en: 'I want my team', pt: 'Quero meu time' },
  },

  // ── Footer ──
  footer: {
    title1: { es: '¿Listo para', en: 'Ready to', pt: 'Pronto para' },
    title2: { es: 'escalar?', en: 'scale?', pt: 'escalar?' },
    subtitle: {
      es: 'Tu competencia ya lo tiene. Cada día que esperás es un día que perdés.',
      en: 'Your competitors already have it. Every day you wait is a day you lose.',
      pt: 'Sua concorrência já tem. Cada dia que espera é um dia que perde.',
    },
    ctaDemo: { es: 'Agendar demo', en: 'Book a demo', pt: 'Agendar demo' },
    wtfLabel: { es: 'Una empresa de WTF Agency', en: 'A WTF Agency company', pt: 'Uma empresa da WTF Agency' },
    wtfTitle1: { es: '15 años creando marcas.', en: '15 years building brands.', pt: '15 anos criando marcas.' },
    wtfTitle2: { es: 'Ahora creamos equipos.', en: 'Now we build teams.', pt: 'Agora criamos equipes.' },
    wtfDesc: {
      es: 'The Agents nace de la experiencia de WTF Agency trabajando con las marcas más exigentes de Latinoamérica. Cada agente está diseñado con el mismo nivel de estrategia y creatividad que aplicamos a nuestros clientes.',
      en: 'The Agents is born from WTF Agency\'s experience working with the most demanding brands in Latin America. Each agent is designed with the same level of strategy and creativity we apply to our clients.',
      pt: 'The Agents nasce da experiência da WTF Agency trabalhando com as marcas mais exigentes da América Latina. Cada agente é desenhado com o mesmo nível de estratégia e criatividade que aplicamos aos nossos clientes.',
    },
    wtfLink: { es: 'Conocé WTF Agency', en: 'Discover WTF Agency', pt: 'Conheça a WTF Agency' },
    clientLogos: { es: 'Marcas que confían en WTF Agency', en: 'Brands that trust WTF Agency', pt: 'Marcas que confiam na WTF Agency' },
    tagline: { es: 'Powered by WTF Agency — 15 años creando marcas. Ahora creamos equipos.', en: 'Powered by WTF Agency — 15 years building brands. Now we build teams.', pt: 'Powered by WTF Agency — 15 anos criando marcas. Agora criamos equipes.' },
    copyright: {
      es: 'The Agents. Todos los derechos reservados.',
      en: 'The Agents. All rights reserved.',
      pt: 'The Agents. Todos os direitos reservados.',
    },
  },

  // ── Chat Demo ──
  chat: {
    greeting: {
      es: '¡Hola! Soy Rock, tu agente de ventas. Estoy acá para mostrarte cómo puedo ayudar a tu empresa a vender más. ¿Qué te gustaría saber?',
      en: 'Hi! I\'m Rock, your sales agent. I\'m here to show you how I can help your company sell more. What would you like to know?',
      pt: 'Olá! Sou Rock, seu agente de vendas. Estou aqui para mostrar como posso ajudar sua empresa a vender mais. O que gostaria de saber?',
    },
    status: { es: 'Agente de Ventas • Online', en: 'Sales Agent • Online', pt: 'Agente de Vendas • Online' },
    placeholder: { es: 'Escribí tu mensaje...', en: 'Type your message...', pt: 'Digite sua mensagem...' },
    error: { es: 'Ups, parece que tuve un problema técnico. ¿Podés intentar de nuevo?', en: 'Oops, seems I had a technical issue. Can you try again?', pt: 'Ops, parece que tive um problema técnico. Pode tentar de novo?' },
  },

  // ── Trial Form ──
  trial: {
    label: { es: 'Trial gratuito 7 días', en: 'Free 7-day trial', pt: 'Trial gratuito 7 dias' },
    title: { es: 'Empezá ahora', en: 'Start now', pt: 'Comece agora' },
    subtitle: { es: 'Completá tus datos y te contactamos para activar tu equipo de agentes.', en: 'Fill in your details and we\'ll contact you to activate your agent team.', pt: 'Preencha seus dados e entraremos em contato para ativar seu time de agentes.' },
    packSelected: { es: 'Pack seleccionado:', en: 'Selected pack:', pt: 'Pacote selecionado:' },
    nameInput: { es: 'Nombre completo', en: 'Full name', pt: 'Nome completo' },
    emailInput: { es: 'Email de trabajo', en: 'Work email', pt: 'Email profissional' },
    companyInput: { es: 'Empresa', en: 'Company', pt: 'Empresa' },
    phoneInput: { es: 'Teléfono', en: 'Phone', pt: 'Telefone' },
    submit: { es: 'Activar trial gratuito', en: 'Activate free trial', pt: 'Ativar trial gratuito' },
    sending: { es: 'Enviando...', en: 'Sending...', pt: 'Enviando...' },
    footnote: { es: 'Sin tarjeta de crédito. Sin compromiso. Sin letra chica.', en: 'No credit card. No commitment. No fine print.', pt: 'Sem cartão de crédito. Sem compromisso. Sem letras miúdas.' },
    successTitle: { es: '¡Listo!', en: 'Done!', pt: 'Pronto!' },
    successMsg: { es: 'Te contactamos en las próximas 24hs para activar tu trial.', en: 'We\'ll contact you within 24h to activate your trial.', pt: 'Entraremos em contato em 24h para ativar seu trial.' },
    successClose: { es: 'Cerrar', en: 'Close', pt: 'Fechar' },
    errorMsg: { es: 'Hubo un error. Intentá de nuevo.', en: 'There was an error. Try again.', pt: 'Houve um erro. Tente novamente.' },
  },
};

export default t;
