// ----------------------------------------------------------------------

const LICENSES = ['Free', 'Pro', 'Enterprise'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['Gestão de clientes e agenda', 'Controle financeiro', 'Acesso via web e mobile'],
  options: [
    'Automação de mensagens',
    'Relatórios e estatísticas',
    'Integração com WhatsApp e e-mail',
    'Exportação de dados',
  ],
  icons: [
    '/assets/icons/platforms/ic_web.svg',
    '/assets/icons/platforms/ic_whatsapp.svg',
    '/assets/icons/platforms/ic_mail.svg',
    '/assets/icons/platforms/ic_stats.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'free',
    price: 0,
    caption: 'plano anual com desconto',
    lists: [
      { text: 'Gestão de clientes e agendamentos', isAvailable: true },
      { text: 'Controle financeiro', isAvailable: true },
      { text: 'Automação de mensagens e lembretes', isAvailable: false },
      { text: 'Integração com WhatsApp Business', isAvailable: false },
      { text: 'Suporte técnico prioritário', isAvailable: false },
    ],
    labelAction: 'escolher Free',
  },
  {
    subscription: 'pro',
    price: 249,
    caption: 'plano anual – recursos avançados',
    lists: [
      { text: 'Gestão de clientes e agendamentos', isAvailable: true },
      { text: 'Controle financeiro completo', isAvailable: true },
      { text: 'Automação de mensagens e campanhas', isAvailable: true },
      { text: 'Integração com WhatsApp Business', isAvailable: true },
      { text: 'Relatórios e gráficos personalizados', isAvailable: true },
      { text: 'Suporte técnico prioritário', isAvailable: false },
    ],
    labelAction: 'escolher pro',
  },
  {
    subscription: 'enterprise',
    price: 0,
    caption: 'valor sob consulta',
    lists: [
      { text: 'Todos os recursos do Pro', isAvailable: true },
      { text: 'Integrações personalizadas (API / NFS-e / CRM)', isAvailable: true },
      { text: 'Assinatura digital e automações complexas', isAvailable: true },
      { text: 'Suporte dedicado e SLA empresarial', isAvailable: true },
      { text: 'Customização de módulos e branding', isAvailable: true },
    ],
    labelAction: 'fale com vendas',
  },
];
// ----------------------------------------------------------------------

const LICENSES2 = ['Free', 'Pro', 'Enterprise'];

export const _homePlans2 = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['Gestão de clientes e agenda', 'Controle financeiro', 'Acesso via web e mobile'],
  options: [
    'Automação de mensagens',
    'Relatórios e estatísticas',
    'Integração com WhatsApp e e-mail',
    'Exportação de dados',
  ],
}));

export const _pricingPlans2 = [
  {
    tier: 'Free',
    price: 63.2,
    billingPeriod: 'plano anual com desconto',
    includedFeatures: [
      'Gestão de clientes e agenda',
      'Controle financeiro',
      'Acesso via web e mobile',
    ],

    features: [
      { text: 'Gestão de clientes e agendamentos', isAvailable: true },
      { text: 'Controle financeiro completo', isAvailable: true },
      { text: 'Relatórios e gráficos personalizados', isAvailable: true },
      { text: 'Automação de mensagens e campanhas', isAvailable: false },
      { text: 'Integração com WhatsApp Business', isAvailable: false },
      { text: 'Suporte técnico prioritário', isAvailable: false },
    ],
    ctaLabel: 'escolher Free',
  },
  {
    tier: 'Pro',
    price: 249,
    billingPeriod: 'plano anual – recursos avançados',
    includedFeatures: [
      'Gestão de clientes e agenda',
      'Controle financeiro',
      'Acesso via web e mobile',
    ],

    features: [
      { text: 'Gestão de clientes e agendamentos', isAvailable: true },
      { text: 'Controle financeiro completo', isAvailable: true },
      { text: 'Integração com WhatsApp Business', isAvailable: true },
      { text: 'Relatórios e gráficos personalizados', isAvailable: true },
      { text: 'Suporte técnico prioritário', isAvailable: true },
      { text: 'Automação de mensagens e campanhas', isAvailable: false },
    ],
    ctaLabel: 'escolher pro',
  },
  {
    tier: 'Enterprise',
    price: 0,
    billingPeriod: 'valor sob consulta',
    includedFeatures: [
      'Gestão de clientes e agenda',
      'Controle financeiro',
      'Acesso via web e mobile',
    ],

    features: [
      { text: 'Todos os recursos do Pro', isAvailable: true },
      { text: 'Assinatura digital e automações complexas', isAvailable: true },
      { text: 'Suporte dedicado e SLA empresarial', isAvailable: true },
      { text: 'Customização de módulos e branding', isAvailable: true },
    ],
    ctaLabel: 'fale com vendas',
  },
];
