import { defineCollection, z } from 'astro:content';

const articulosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    cluster: z.enum(['fundamentos', 'mercados', 'estrategia', 'psicologia']),
    tiempoLectura: z.number(),
    fecha: z.string(),
    destacado: z.boolean().optional().default(false),
  }),
});

const casasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    nombre: z.string(),
    logoColor: z.string(),
    rating: z.number(),
    bonoBienvenida: z.string(),
    mejorPara: z.string(),
    añoFundacion: z.number(),
    permisoSEGOB: z.string(),
    deportes: z.number(),
    depositoMinimo: z.string(),
    metodosPago: z.array(z.string()),
    pros: z.array(z.string()),
    contras: z.array(z.string()),
    ratingDetallado: z.object({
      momios: z.number(),
      retiros: z.number(),
      mercados: z.number(),
      ux: z.number(),
    }),
  }),
});

export const collections = {
  articulos: articulosCollection,
  casas: casasCollection,
};
