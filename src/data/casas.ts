export interface Casa {
  id: string;
  nombre: string;
  slug: string;
  logoColor: string;
  bono: string;
  rating: number;
  descripcion: string;
  pros: string[];
  contras: string[];
  momiosCalidad: string;
  depositoMinimo: string;
  metodosPago: string[];
  tieneApp: boolean;
  añoFundacion: number;
  licencia: string;
}

export const casas: Casa[] = [
  {
    id: 'caliente',
    nombre: 'Caliente',
    slug: 'caliente',
    logoColor: '#DC2626',
    bono: 'Hasta $3,000 MXN en tu primer depósito',
    rating: 4.4,
    descripcion: 'La casa de apuestas más grande de México. Amplia cobertura de deportes y la mejor red de sucursales físicas del país.',
    pros: [
      'Mayor cobertura de mercados en Liga MX',
      'App móvil muy completa',
      'Retiros rápidos con SPEI',
      'Transmisión en vivo de muchos eventos',
    ],
    contras: [
      'Momios ligeramente por debajo del promedio',
      'Proceso de verificación puede ser lento',
    ],
    momiosCalidad: '3.8/5',
    depositoMinimo: '$100 MXN',
    metodosPago: ['SPEI', 'OXXO', 'Tarjeta de crédito', 'PayPal'],
    tieneApp: true,
    añoFundacion: 1991,
    licencia: 'SEGOB México',
  },
  {
    id: 'playdoit',
    nombre: 'Playdoit',
    slug: 'playdoit',
    logoColor: '#1E40AF',
    bono: 'Bono de Bienvenida 100% hasta $2,000 MXN',
    rating: 4.2,
    descripcion: 'Operador con fuerte enfoque en fútbol mexicano. Conocida por sus momios competitivos en Liga MX y Copa MX.',
    pros: [
      'Momios muy competitivos en fútbol mexicano',
      'Interfaz simple y fácil de usar',
      'Atención al cliente en español 24/7',
    ],
    contras: [
      'Menor variedad de deportes que competidores',
      'App móvil con funciones limitadas',
    ],
    momiosCalidad: '4.1/5',
    depositoMinimo: '$50 MXN',
    metodosPago: ['SPEI', 'OXXO', 'Tarjeta de débito'],
    tieneApp: true,
    añoFundacion: 2008,
    licencia: 'SEGOB México',
  },
  {
    id: 'codere',
    nombre: 'Codere',
    slug: 'codere',
    logoColor: '#15803D',
    bono: 'Primer apuesta sin riesgo hasta $1,500 MXN',
    rating: 4.3,
    descripcion: 'Operador europeo con gran experiencia. Ofrece una plataforma robusta con mercados avanzados y apuestas en vivo de calidad.',
    pros: [
      'Plataforma de apuestas en vivo muy completa',
      'Gran variedad de mercados alternativos',
      'Momios competitivos en Champions League',
      'Casino integrado si te interesa',
    ],
    contras: [
      'Bonos con requisitos de apuesta altos',
      'Soporte por teléfono no disponible',
    ],
    momiosCalidad: '4.0/5',
    depositoMinimo: '$100 MXN',
    metodosPago: ['SPEI', 'Tarjeta de crédito', 'Tarjeta de débito', 'Neteller'],
    tieneApp: true,
    añoFundacion: 1984,
    licencia: 'SEGOB México',
  },
  {
    id: 'strendus',
    nombre: 'Strendus',
    slug: 'strendus',
    logoColor: '#EA580C',
    bono: 'Doble tu primer depósito hasta $4,000 MXN',
    rating: 4.1,
    descripcion: 'Operador 100% mexicano con presencia física. Fuerte en Liga MX y deportes nacionales, con cashout disponible en los principales mercados.',
    pros: [
      'Bono de bienvenida de los más grandes del mercado',
      'Cashout disponible en partidos de Liga MX',
      'Muy buenas cuotas en deportes americanos',
    ],
    contras: [
      'Momios en fútbol europeo por debajo del promedio',
      'Proceso KYC puede tardar 48-72 horas',
    ],
    momiosCalidad: '3.9/5',
    depositoMinimo: '$100 MXN',
    metodosPago: ['SPEI', 'OXXO Pay', 'Tarjeta de crédito'],
    tieneApp: true,
    añoFundacion: 2003,
    licencia: 'SEGOB México',
  },
];
