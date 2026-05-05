# MomioClave

> Antes de apostar, encuentra la clave.

Sitio web educativo y comparador de momios para el mercado mexicano de apuestas deportivas.

## Status

En desarrollo activo · Sprint 1 (mayo 2026)

## Stack técnico

### Frontend
- Astro (framework)
- Tailwind CSS (estilos)
- TypeScript
- React (componentes interactivos)
- Vercel (hosting - próximamente)

### Backend (próximamente, Sprint 2-3)
- FastAPI
- PostgreSQL
- Railway (hosting)
- Python para scrapers

## Setup local

```bash
npm install
npm run dev
```

El sitio se ejecuta en http://localhost:4321

## Estructura del proyecto

```
src/
├── components/        Componentes reutilizables (UI, layout, home, comparador)
├── content/           Artículos y reseñas en Markdown (Astro Content Collections)
│   ├── articulos/     12 artículos educativos sobre momios y estrategia
│   └── casas/         4 reseñas de casas de apuestas mexicanas
├── data/              Mock data de momios y configuración global
├── layouts/           BaseLayout con header y footer
├── pages/             Rutas del sitio
│   ├── aprende/       Hub educativo y artículos individuales
│   ├── casas/         Comparador de casas y reseñas individuales
│   ├── comparador/    Comparador de momios en tiempo real (mock)
│   └── juego-responsable.astro
└── styles/            CSS global
```

## Páginas implementadas

- `/` — Home con 6 secciones
- `/aprende` — Hub educativo con 12 artículos y filtros
- `/aprende/[slug]` — Template de artículo completo
- `/casas` — Tabla comparativa de casas de apuestas
- `/casas/[slug]` — Reseña individual por casa
- `/comparador` — Comparador de momios (datos mock Liga MX)
- `/juego-responsable` — Recursos, test DSM-5 y autoexclusión

## Filosofía editorial

- Honestidad matemática sobre las casas de apuestas
- Profundidad sobre frecuencia
- Voz humana, no SEO genérico
- Respeto a la audiencia y al juego responsable
