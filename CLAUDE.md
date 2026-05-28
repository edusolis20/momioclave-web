# MomioClave — Guía del proyecto para Claude Code

> ⚠️ **MODO DISCRETO ACTIVO**: El sitio tiene meta tag noindex y robots.txt bloqueando indexación. Esto es temporal hasta el lanzamiento oficial en Sprint 4. Para activar indexación, remover el meta tag robots en `src/layouts/BaseLayout.astro` y actualizar `public/robots.txt`.

> ⚠️ **DEUDA TÉCNICA — NEWSLETTER**: El form de newsletter en home renderiza el embed de Beehiiv pero las suscripciones no llegan. Pendiente de retomar antes del soft launch (Sprint 4). Solución probable: reemplazar embed por botón CTA que abra `momioclave.beehiiv.com/subscribe` directamente.

> Este archivo es la fuente de verdad sobre el proyecto. Léelo completo al inicio de cada sesión.
> Actualízalo cuando se tomen decisiones importantes (estilo, stack, posicionamiento).

---

## ¿Qué estamos construyendo?

Sitio web bilingüe en español dirigido al mercado mexicano de apuestas deportivas. Combina tres elementos:

1. **Contenido educativo** profundo sobre cómo funcionan las casas de apuestas, momios, mercados, gestión de bankroll y estrategia.
2. **Comparador de momios** entre las principales casas mexicanas (Caliente, Playdoit, Codere, Strendus).
3. **Newsletter semanal** que convierte visitantes en audiencia recurrente.

**Mercado objetivo:** México (con expansión futura a Colombia y Panamá).

**Modelo de negocio:** afiliados de casas de apuestas (mes 5+), newsletter premium (mes 7+), display ads (cuando haya tráfico), productos digitales (mes 12+).

---

## Posicionamiento

**Somos el analista honesto.**

NO somos:
- Un sitio de tipsters que vende pronósticos
- Un sitio que promete ganancias garantizadas
- Un comparador genérico sin alma

SÍ somos:
- Educadores con utilidad práctica
- Transparentes con la matemática detrás de cada concepto
- Defensores del juego responsable como principio, no como obligación legal

**Frase clave que define el tono:**
> "No publicamos pronósticos. Publicamos educación. Entender cómo funcionan los momios es la única ventaja real que puede tener un apostador recreativo."

Esta frase guía todas las decisiones de copy y diseño.

---

## Stack técnico

### Frontend
- **Astro** (última versión estable) como framework principal
- **Tailwind CSS** para estilos
- **TypeScript** habilitado
- **React** solo donde sea necesario para interactividad (comparador interactivo)
- Deploy en **Vercel**

### Backend (cuando se construya, fase 2)
- **FastAPI** en **Railway**
- **PostgreSQL** como base de datos
- **Python con Selenium o Playwright** para scrapers
- Servicios complementarios: **Beehiiv** (newsletter), **Plausible o GA4** (analítica), **Hostinger** (solo dominio)

### Estado actual del código
- ✅ Home con 6 secciones implementada
- ✅ Layout base (header + footer) funcional
- ✅ Datos mock para 15 partidos de Liga MX y 4 casas
- ✅ /aprende — hub educativo con 12 artículos, filtros por cluster (JS vanilla)
- ✅ /aprende/[slug] — template completo: breadcrumb, meta, cuerpo MD tipografiado, artículos relacionados, newsletter
- ✅ /aprende/que-es-un-momio — artículo bandera completo (~1400 palabras)
- ✅ /casas — tabla comparativa rápida + 4 cards expandidas con pros/contras + metodología evaluación
- ✅ /casas/[slug] — template completo: hero con rating/estrellas, tabla resumen, pros/contras, contenido MD, mini tabla momios, sidebar con rating por dimensión
- ✅ /casas/caliente — reseña completa con todos los datos
- ✅ /juego-responsable — 9 secciones: hero, banner ayuda inmediata, info ludopatía, señales de alerta (9 cards), test DSM-5 React interactivo, recursos de ayuda (3 bloques con tel: links), autoexclusión por casa, buenas prácticas, cierre + disclaimer
- ✅ /comparador — comparador completo: filtros sticky (deporte/jornada/mercado/orden), tabla con 15 partidos en 3 jornadas, momio óptimo resaltado en verde, diferencial por fila, badges Clásico/Decisivo/Diferencial alto, banner educativo intercalado, secciones "Cómo usar" y footer legal

### Arquitectura de contenido (decisión importante)
Los artículos y reseñas de casas usan **Astro Content Collections** (src/content/):
- `src/content/articulos/*.md` — 12 artículos con frontmatter tipado
- `src/content/casas/*.md` — 4 reseñas con frontmatter tipado + contenido narrative en markdown
- `src/content/config.ts` — schemas Zod para ambas colecciones
- `src/data/articulos.ts` — solo exporta CLUSTERS (display config)
- `src/data/casas.ts` — ya no se usa (datos migrados a content collections)
- `src/data/partidos.ts` — mock data de momios (permanece en data/)
- `src/data/config.ts` — constantes globales (TORNEO_ACTUAL, etc.)

---

## Estética y diseño

### Estilo general
Limpio, profesional, similar a sitios financieros serios (Bloomberg, FT.com). **NO estilo casino** con neón, gradientes intensos, ni efectos visuales agresivos.

### Paleta de colores
- **Base:** blanco (#FFFFFF) y blanco cálido para fondos secundarios
- **Texto primario:** gris muy oscuro (casi negro)
- **Texto secundario:** gris medio
- **Acento positivo:** verde esmeralda (#10B981) — usado para "mejor momio", CTAs principales, indicadores de éxito
- **Acento secundario:** azul oscuro (#1E3A8A) — usado para enlaces, headers, CTA secundario
- **Alertas:** rojo (#DC2626) solo para warnings de juego responsable

### Tipografía
- Sans-serif moderna (Inter, recomendada)
- Jerarquía clara: H1 grande y con peso, H2 más sutil, body legible (mínimo 16px)
- Sentence case en headings (no Title Case, no ALL CAPS)

### Principios de diseño
- Mucho espacio en blanco
- Mobile-first responsive
- Modo claro únicamente por ahora (modo oscuro se evalúa en fase 2)
- Sin gradientes innecesarios, sin sombras pesadas
- Componentes reutilizables (cards, botones, inputs)

---

## Estructura de carpetas

```
src/
├── components/
│   ├── ui/              (botones, cards, inputs reutilizables)
│   ├── home/            (Hero, ComparadorPreview, SeccionEducativa, SeccionCasas, NewsletterCapture)
│   ├── comparador/      (ComparadorTabla.tsx — React, filtros + tabla 15 partidos, sticky filters)
│   ├── juego-responsable/  (TestAutoevaluacion.tsx — React, 10 preguntas DSM-5, 3 rangos de resultado)
│   └── layout/          (Header, Footer)
├── content/             (Astro Content Collections)
│   ├── config.ts        (schemas Zod para articulos y casas)
│   ├── articulos/       (12 archivos .md)
│   └── casas/           (4 archivos .md)
├── data/
│   ├── partidos.ts      (mock data 15 partidos Liga MX)
│   ├── articulos.ts     (solo CLUSTERS display config)
│   └── config.ts        (TORNEO_ACTUAL y constantes globales)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── aprende/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── casas/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── juego-responsable.astro  (✅ completa)
└── styles/
    └── global.css
```

---

## Decisiones tomadas (NO cambiar sin discutir)

1. **Bootstrapping puro durante 6 meses** — no hay inversionistas. Decisiones rápidas, sin necesidad de aprobación externa.
2. **Empezar con Liga MX y NFL** — escalamos a NBA, UFC, Champions League en meses 3-6. NO agregar todos los deportes desde el inicio.
3. **4 casas de apuestas comparadas:** Caliente, Playdoit, Codere, Strendus. Solo operadores con permiso vigente en México.
4. **Newsletter gratis los primeros 3 meses** — no introducir paywall hasta tener +500 suscriptores activos.
5. **Frecuencia editorial: 1 artículo por semana** — mejor calidad que volumen.

---

## Reglas estrictas de contenido

### Lo que SÍ se publica
- Artículos educativos con matemática transparente
- Reseñas honestas de casas (incluyendo lo malo, no solo lo bueno)
- Análisis de mercado y movimientos de líneas
- Conceptos de gestión de bankroll y estrategia

### Lo que NUNCA se publica
- Pronósticos como "tips ganadores"
- Promesas de ganancias garantizadas
- Contenido patrocinado disfrazado de editorial
- Recomendaciones de casas sin permiso vigente en México

### Disclaimers obligatorios en todas las páginas
- "+18 · Solo mayores de 18 años"
- Aviso de juego responsable con link a /juego-responsable
- Declaración de afiliación cuando aplique
- Aclaración de que MomioClave no opera juegos de azar, solo provee información

---

## Datos mock actuales

Los datos hardcodeados están en `src/data/`. Equipos de Liga MX usados:
Cruz Azul, América, Tigres, Monterrey, Chivas, Pumas, Toluca, León, Santos, Atlas, Necaxa, Pachuca, Querétaro, Tijuana, Mazatlán.

Momios mock varían realísticamente entre 1.50 y 4.00 en formato decimal.

---

## Recursos legales obligatorios en /juego-responsable

- **CONADIC:** 800-911-2000 (Línea de la Vida)
- **Centros de Integración Juvenil:** 55-5212-1212
- **Jugadores Anónimos México:** información en jugadoresanonimos.org.mx
- Test de autoevaluación basado en criterios DSM-5 / OMS
- Información sobre herramientas de autoexclusión que ofrecen las casas

---

## Roadmap a 6 meses (resumen)

- **Meses 1-2:** lanzamiento blando, primeros 10 artículos, 200 suscriptores
- **Meses 3-4:** sumar NFL, 4 reseñas profundas de casas, 30 artículos totales
- **Meses 5-6:** activar afiliados, monetización inicial ($3,000-8,000 MXN/mes meta)

**Métricas objetivo a 6 meses:**
- 30+ artículos publicados
- 3,000-5,000 visitantes orgánicos mensuales
- 400-700 suscriptores en newsletter
- 3-4 deportes en el comparador

---

## Cómo trabajar conmigo (Claude Code)

1. **Antes de hacer cambios grandes,** muéstrame el plan o el diff y espera confirmación
2. **Itera por página, no por proyecto completo.** Termina una página, muéstrala, recibe feedback, sigue
3. **Si algo se desvía del plan,** dilo explícitamente y propón la alternativa, no me lo cueles
4. **Mantén componentes reutilizables.** Si vas a crear el tercer botón con el mismo estilo, refactoriza a un componente UI compartido
5. **Cuando agregues una decisión importante** (cambio de paleta, librería nueva, ajuste de estructura), actualiza este archivo CLAUDE.md

---

## Contexto del fundador

- Eduardo, basado en Guadalajara, Jalisco
- Background técnico: QA Analyst + Data Analyst en Sportium (casa de apuestas)
- Stack que ya domina: Python, FastAPI, Streamlit, scrapers con Selenium, análisis de datos
- Aprendiendo Astro y frontend moderno en este proyecto
- Disponibilidad: 10-15 hrs/semana en paralelo a trabajo full-time
- Metodología de trabajo: The 12 Week Year

Cuando expliques cosas técnicas frontend, asume que sabe programar pero está aprendiendo Astro/React. Sé claro pero no condescendiente.
