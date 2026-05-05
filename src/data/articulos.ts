// Los artículos completos viven en src/content/articulos/ como Content Collections.
// Este archivo solo exporta la configuración de display de clusters.

export type Cluster = 'fundamentos' | 'mercados' | 'estrategia' | 'psicologia';

export const CLUSTERS: Record<Cluster, { nombre: string; descripcion: string; icono: string }> = {
  fundamentos: {
    nombre: 'Fundamentos',
    descripcion: 'Todo lo que necesitas saber antes de hacer tu primera apuesta.',
    icono: '📚',
  },
  mercados: {
    nombre: 'Mercados',
    descripcion: 'Entiende los diferentes tipos de apuesta y cómo funcionan.',
    icono: '📊',
  },
  estrategia: {
    nombre: 'Estrategia',
    descripcion: 'Métodos y sistemas para apostar con criterio y disciplina.',
    icono: '🎯',
  },
  psicologia: {
    nombre: 'Psicología',
    descripcion: 'El factor mental: cómo controlar emociones y sesgos cognitivos.',
    icono: '🧠',
  },
};
