export type Casa = 'caliente' | 'playdoit' | 'codere' | 'strendus';

export interface MomiosPorCasa {
  caliente: number;
  playdoit: number;
  codere: number;
  strendus: number;
}

export interface Partido {
  id: string;
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  liga: string;
  jornada: number;
  estadio: string;
  destacado?: 'clasico' | 'decisivo';
  momios: {
    local: MomiosPorCasa;
    empate: MomiosPorCasa;
    visitante: MomiosPorCasa;
  };
}

export function getMejorMomio(momios: MomiosPorCasa): { casa: Casa; valor: number } {
  const entries = Object.entries(momios) as [Casa, number][];
  const mejor = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
  return { casa: mejor[0], valor: mejor[1] };
}

export function getDiferencial(momios: MomiosPorCasa): number {
  const vals = [momios.caliente, momios.playdoit, momios.codere, momios.strendus];
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  return ((max - min) / min) * 100;
}

export function getMaxDiferencial(partido: Partido): number {
  return Math.max(
    getDiferencial(partido.momios.local),
    getDiferencial(partido.momios.empate),
    getDiferencial(partido.momios.visitante),
  );
}

export const CASAS_DISPLAY: Record<Casa, string> = {
  caliente: 'Caliente',
  playdoit: 'Playdoit',
  codere: 'Codere',
  strendus: 'Strendus',
};

// ─── Jornada 16 (2 – 4 Mayo 2026) ────────────────────────────────────────────

// ─── Jornada 17 (9 – 11 Mayo 2026) ───────────────────────────────────────────

// ─── Jornada 18 (16 – 18 Mayo 2026) ──────────────────────────────────────────

export const partidos: Partido[] = [
  // ── Jornada 16 ──────────────────────────────────────────────────────────────
  {
    id: 'ame-crz',
    local: 'América',
    visitante: 'Cruz Azul',
    fecha: '2026-05-02',
    hora: '20:00',
    liga: 'Liga MX',
    jornada: 16,
    estadio: 'Estadio Azteca',
    destacado: 'clasico',
    momios: {
      local:     { caliente: 2.10, playdoit: 2.18, codere: 2.04, strendus: 2.22 },
      empate:    { caliente: 3.30, playdoit: 3.25, codere: 3.40, strendus: 3.20 },
      visitante: { caliente: 3.20, playdoit: 3.32, codere: 3.15, strendus: 3.28 },
    },
  },
  {
    id: 'chv-tig',
    local: 'Chivas',
    visitante: 'Tigres',
    fecha: '2026-05-02',
    hora: '17:00',
    liga: 'Liga MX',
    jornada: 16,
    estadio: 'Estadio Akron',
    momios: {
      local:     { caliente: 2.50, playdoit: 2.58, codere: 2.44, strendus: 2.62 },
      empate:    { caliente: 3.10, playdoit: 3.15, codere: 3.20, strendus: 3.05 },
      visitante: { caliente: 2.80, playdoit: 2.74, codere: 2.88, strendus: 2.70 },
    },
  },
  {
    id: 'mty-pum',
    local: 'Monterrey',
    visitante: 'Pumas',
    fecha: '2026-05-03',
    hora: '19:00',
    liga: 'Liga MX',
    jornada: 16,
    estadio: 'Estadio BBVA',
    momios: {
      local:     { caliente: 1.75, playdoit: 1.79, codere: 1.72, strendus: 1.78 },
      empate:    { caliente: 3.50, playdoit: 3.45, codere: 3.55, strendus: 3.40 },
      visitante: { caliente: 3.95, playdoit: 4.05, codere: 3.88, strendus: 3.98 },
    },
  },
  {
    id: 'tol-leo',
    local: 'Toluca',
    visitante: 'León',
    fecha: '2026-05-03',
    hora: '21:00',
    liga: 'Liga MX',
    jornada: 16,
    estadio: 'Estadio Nemesio Diez',
    momios: {
      local:     { caliente: 2.20, playdoit: 2.25, codere: 2.15, strendus: 2.28 },
      empate:    { caliente: 3.20, playdoit: 3.15, codere: 3.25, strendus: 3.10 },
      visitante: { caliente: 3.00, playdoit: 3.12, codere: 2.94, strendus: 3.06 },
    },
  },
  {
    id: 'san-atl',
    local: 'Santos',
    visitante: 'Atlas',
    fecha: '2026-05-04',
    hora: '20:00',
    liga: 'Liga MX',
    jornada: 16,
    estadio: 'Estadio Corona',
    momios: {
      local:     { caliente: 2.40, playdoit: 2.35, codere: 2.46, strendus: 2.38 },
      empate:    { caliente: 3.15, playdoit: 3.22, codere: 3.10, strendus: 3.25 },
      visitante: { caliente: 2.75, playdoit: 2.82, codere: 2.68, strendus: 2.86 },
    },
  },

  // ── Jornada 17 ──────────────────────────────────────────────────────────────
  {
    id: 'nec-pac',
    local: 'Necaxa',
    visitante: 'Pachuca',
    fecha: '2026-05-09',
    hora: '19:00',
    liga: 'Liga MX',
    jornada: 17,
    estadio: 'Estadio Victoria',
    destacado: 'decisivo',
    momios: {
      local:     { caliente: 3.10, playdoit: 3.22, codere: 3.04, strendus: 3.18 },
      empate:    { caliente: 3.25, playdoit: 3.20, codere: 3.30, strendus: 3.15 },
      visitante: { caliente: 2.00, playdoit: 1.94, codere: 2.06, strendus: 1.97 },
    },
  },
  {
    id: 'que-tij',
    local: 'Querétaro',
    visitante: 'Tijuana',
    fecha: '2026-05-09',
    hora: '20:00',
    liga: 'Liga MX',
    jornada: 17,
    estadio: 'Estadio La Corregidora',
    momios: {
      local:     { caliente: 2.60, playdoit: 2.66, codere: 2.54, strendus: 2.70 },
      empate:    { caliente: 3.05, playdoit: 3.10, codere: 3.00, strendus: 3.15 },
      visitante: { caliente: 2.55, playdoit: 2.50, codere: 2.61, strendus: 2.45 },
    },
  },
  {
    id: 'maz-ame',
    local: 'Mazatlán',
    visitante: 'América',
    fecha: '2026-05-10',
    hora: '17:00',
    liga: 'Liga MX',
    jornada: 17,
    estadio: 'Estadio El Kraken',
    momios: {
      local:     { caliente: 3.80, playdoit: 4.05, codere: 3.68, strendus: 3.95 },
      empate:    { caliente: 3.40, playdoit: 3.35, codere: 3.46, strendus: 3.30 },
      visitante: { caliente: 1.80, playdoit: 1.86, codere: 1.77, strendus: 1.82 },
    },
  },
  {
    id: 'crz-chv',
    local: 'Cruz Azul',
    visitante: 'Chivas',
    fecha: '2026-05-10',
    hora: '20:00',
    liga: 'Liga MX',
    jornada: 17,
    estadio: 'Estadio Azteca',
    destacado: 'clasico',
    momios: {
      local:     { caliente: 2.30, playdoit: 2.36, codere: 2.24, strendus: 2.40 },
      empate:    { caliente: 3.20, playdoit: 3.15, codere: 3.26, strendus: 3.10 },
      visitante: { caliente: 2.90, playdoit: 2.96, codere: 2.84, strendus: 3.02 },
    },
  },
  {
    id: 'tig-mty',
    local: 'Tigres',
    visitante: 'Monterrey',
    fecha: '2026-05-11',
    hora: '21:06',
    liga: 'Liga MX',
    jornada: 17,
    estadio: 'Estadio Universitario',
    destacado: 'clasico',
    momios: {
      local:     { caliente: 2.05, playdoit: 2.12, codere: 2.00, strendus: 2.14 },
      empate:    { caliente: 3.40, playdoit: 3.35, codere: 3.46, strendus: 3.30 },
      visitante: { caliente: 3.30, playdoit: 3.42, codere: 3.24, strendus: 3.36 },
    },
  },

  // ── Jornada 18 ──────────────────────────────────────────────────────────────
  {
    id: 'pum-tol',
    local: 'Pumas',
    visitante: 'Toluca',
    fecha: '2026-05-16',
    hora: '19:00',
    liga: 'Liga MX',
    jornada: 18,
    estadio: 'Estadio Olímpico Universitario',
    momios: {
      local:     { caliente: 2.70, playdoit: 2.76, codere: 2.64, strendus: 2.80 },
      empate:    { caliente: 3.10, playdoit: 3.05, codere: 3.16, strendus: 3.00 },
      visitante: { caliente: 2.45, playdoit: 2.52, codere: 2.38, strendus: 2.56 },
    },
  },
  {
    id: 'leo-san',
    local: 'León',
    visitante: 'Santos',
    fecha: '2026-05-16',
    hora: '21:00',
    liga: 'Liga MX',
    jornada: 18,
    estadio: 'Estadio León',
    momios: {
      local:     { caliente: 2.15, playdoit: 2.20, codere: 2.10, strendus: 2.24 },
      empate:    { caliente: 3.30, playdoit: 3.25, codere: 3.36, strendus: 3.20 },
      visitante: { caliente: 3.10, playdoit: 3.16, codere: 3.04, strendus: 3.20 },
    },
  },
  {
    id: 'atl-nec',
    local: 'Atlas',
    visitante: 'Necaxa',
    fecha: '2026-05-17',
    hora: '20:00',
    liga: 'Liga MX',
    jornada: 18,
    estadio: 'Estadio Jalisco',
    momios: {
      local:     { caliente: 2.00, playdoit: 2.06, codere: 1.97, strendus: 2.10 },
      empate:    { caliente: 3.20, playdoit: 3.26, codere: 3.14, strendus: 3.30 },
      visitante: { caliente: 3.50, playdoit: 3.56, codere: 3.44, strendus: 3.62 },
    },
  },
  {
    id: 'pac-que',
    local: 'Pachuca',
    visitante: 'Querétaro',
    fecha: '2026-05-17',
    hora: '19:00',
    liga: 'Liga MX',
    jornada: 18,
    estadio: 'Estadio Hidalgo',
    destacado: 'decisivo',
    momios: {
      local:     { caliente: 1.65, playdoit: 1.70, codere: 1.62, strendus: 1.68 },
      empate:    { caliente: 3.60, playdoit: 3.55, codere: 3.66, strendus: 3.50 },
      visitante: { caliente: 4.00, playdoit: 3.94, codere: 4.06, strendus: 3.88 },
    },
  },
  {
    id: 'tij-maz',
    local: 'Tijuana',
    visitante: 'Mazatlán',
    fecha: '2026-05-18',
    hora: '20:00',
    liga: 'Liga MX',
    jornada: 18,
    estadio: 'Estadio Caliente',
    momios: {
      local:     { caliente: 2.25, playdoit: 2.30, codere: 2.20, strendus: 2.35 },
      empate:    { caliente: 3.10, playdoit: 3.16, codere: 3.04, strendus: 3.20 },
      visitante: { caliente: 2.80, playdoit: 2.86, codere: 2.74, strendus: 2.90 },
    },
  },
];
