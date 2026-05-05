import { useState, useMemo, Fragment } from 'react';
import {
  partidos,
  getMejorMomio,
  getDiferencial,
  getMaxDiferencial,
  CASAS_DISPLAY,
} from '../../data/partidos';
import type { Partido, MomiosPorCasa, Casa } from '../../data/partidos';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Jornada = 'all' | '16' | '17' | '18';
type Mercado = '1x2' | 'doble' | 'total' | 'handicap' | 'btts';
type Orden = 'fecha' | 'diferencial' | 'local' | 'empate' | 'visitante';

const MERCADOS: Record<Mercado, string> = {
  '1x2': '1X2 (Resultado final)',
  doble: 'Doble oportunidad',
  total: 'Total goles (over/under)',
  handicap: 'Hándicap asiático',
  btts: 'Ambos equipos anotan',
};

const CASAS: Casa[] = ['caliente', 'playdoit', 'codere', 'strendus'];

const DEPORTES = [
  { key: 'ligamx', label: 'Liga MX', activo: true },
  { key: 'nfl', label: 'NFL', activo: false },
  { key: 'nba', label: 'NBA', activo: false },
  { key: 'ufc', label: 'UFC', activo: false },
  { key: 'ucl', label: 'Champions', activo: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatFecha(fecha: string, hora: string): string {
  const d = new Date(fecha + 'T12:00:00');
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} · ${hora}`;
}

function DifBadge({ diff }: { diff: number }) {
  if (diff >= 5) return (
    <span className="text-xs font-bold text-emerald-700 tabular-nums">{diff.toFixed(1)}%</span>
  );
  if (diff >= 3) return (
    <span className="text-xs font-semibold text-amber-600 tabular-nums">{diff.toFixed(1)}%</span>
  );
  return (
    <span className="text-xs text-gray-400 tabular-nums">{diff.toFixed(1)}%</span>
  );
}

// ─── Celda de momio individual ────────────────────────────────────────────────

function CeldaMomio({ valor, esMejor }: { valor: number; esMejor: boolean }) {
  return (
    <td
      title="Actualizado hace 8 min"
      className={`py-3 px-3 text-center text-sm font-mono tabular-nums whitespace-nowrap ${
        esMejor
          ? 'bg-emerald-50 text-emerald-700 font-bold'
          : 'text-gray-700'
      }`}
    >
      {valor.toFixed(2)}
      {esMejor && (
        <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 align-middle" />
      )}
    </td>
  );
}

// ─── Fila de resultado (Local / Empate / Visitante) ───────────────────────────

type TipoResultado = 'Local' | 'Empate' | 'Visitante';

function FilaResultado({
  tipo,
  momios,
  isFirst,
  isLast,
  partidoId,
}: {
  tipo: TipoResultado;
  momios: MomiosPorCasa;
  isFirst: boolean;
  isLast: boolean;
  partidoId: string;
}) {
  const mejor = getMejorMomio(momios);
  const maxVal = mejor.valor;
  const diff = getDiferencial(momios);

  return (
    <tr
      className={`group transition-colors hover:bg-gray-50/70 ${
        !isLast ? 'border-b border-gray-50' : ''
      }`}
    >
      {/* Tipo de resultado — sticky izquierdo */}
      <td className="py-3 px-4 sticky left-0 z-10 bg-white group-hover:bg-gray-50/70 border-r border-gray-100 transition-colors whitespace-nowrap">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {tipo}
        </span>
      </td>

      {/* Momios por casa */}
      {CASAS.map(casa => (
        <CeldaMomio key={casa} valor={momios[casa]} esMejor={momios[casa] === maxVal} />
      ))}

      {/* Mejor momio */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="font-bold text-emerald-700 text-sm tabular-nums">{maxVal.toFixed(2)}</span>
        <span className="text-gray-400 text-xs ml-1">· {CASAS_DISPLAY[mejor.casa]}</span>
      </td>

      {/* Diferencial */}
      <td className="py-3 px-3 text-center whitespace-nowrap">
        <DifBadge diff={diff} />
      </td>

      {/* Acción — solo en la primera fila del partido */}
      <td className="py-3 px-3 text-center">
        {isFirst && (
          <button
            disabled
            title="Próximamente: enlace directo a la casa"
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-400 cursor-not-allowed select-none"
          >
            Apostar
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── Cabecera de grupo de partido ─────────────────────────────────────────────

function CabeceraPartido({ partido }: { partido: Partido }) {
  const maxDiff = getMaxDiferencial(partido);
  const tieneHighValue = maxDiff >= 5;

  return (
    <tr className="bg-gray-50 border-t-2 border-gray-200">
      <td colSpan={9} className="py-3 px-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {/* Equipos */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm"
              style={{ backgroundColor: '#1e3a8a' }}
              title={`${partido.local} · ${partido.estadio}`}
            >
              {partido.local[0]}
            </div>
            <span className="font-bold text-gray-900 text-sm">
              {partido.local}
              <span className="text-gray-400 font-normal mx-1.5">vs</span>
              {partido.visitante}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm"
              style={{ backgroundColor: '#7c3aed' }}
              title={`${partido.visitante} · ${partido.estadio}`}
            >
              {partido.visitante[0]}
            </div>
          </div>

          {/* Metadata */}
          <span className="text-xs text-gray-400">
            J{partido.jornada} · {formatFecha(partido.fecha, partido.hora)}
          </span>

          {/* Estadio tooltip hint */}
          <span
            className="text-xs text-gray-400 hidden sm:inline"
            title={partido.estadio}
          >
            {partido.estadio}
          </span>

          {/* Badges */}
          <div className="flex gap-1.5 ml-auto">
            {partido.destacado === 'clasico' && (
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Clásico
              </span>
            )}
            {partido.destacado === 'decisivo' && (
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Decisivo
              </span>
            )}
            {tieneHighValue && (
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                ✦ Diferencial alto
              </span>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Banner educativo ─────────────────────────────────────────────────────────

function BannerEducativo() {
  return (
    <tr>
      <td colSpan={9} className="px-0 py-0">
        <div className="mx-4 my-3 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-1">
                ¿Por qué los momios varían entre casas?
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                Cada casa calcula sus momios en base a sus modelos internos, el flujo de apuestas que
                recibe y su margen de ganancia. Comparar te permite encontrar dónde tu apuesta tiene más valor.
              </p>
              <a
                href="/aprende/que-es-un-momio"
                className="text-blue-700 text-sm font-semibold hover:text-emerald-600 transition-colors"
              >
                Aprende más sobre cómo se calculan los momios →
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ComparadorTabla() {
  const [jornada, setJornada] = useState<Jornada>('all');
  const [mercado, setMercado] = useState<Mercado>('1x2');
  const [orden, setOrden] = useState<Orden>('fecha');

  const filtrados = useMemo(
    () => partidos.filter(p => jornada === 'all' || p.jornada === Number(jornada)),
    [jornada],
  );

  const ordenados = useMemo(() => {
    return [...filtrados].sort((a, b) => {
      switch (orden) {
        case 'fecha':
          return (a.fecha + a.hora).localeCompare(b.fecha + b.hora);
        case 'diferencial':
          return getMaxDiferencial(b) - getMaxDiferencial(a);
        case 'local':
          return getMejorMomio(b.momios.local).valor - getMejorMomio(a.momios.local).valor;
        case 'empate':
          return getMejorMomio(b.momios.empate).valor - getMejorMomio(a.momios.empate).valor;
        case 'visitante':
          return getMejorMomio(b.momios.visitante).valor - getMejorMomio(a.momios.visitante).valor;
        default:
          return 0;
      }
    });
  }, [filtrados, orden]);

  return (
    <div>
      {/* ═══ BARRA DE FILTROS (sticky) ════════════════════════════════════════ */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tabs de deporte */}
          <div className="flex gap-1 overflow-x-auto py-3 border-b border-gray-50 scrollbar-hide">
            {DEPORTES.map(d =>
              d.activo ? (
                <button
                  key={d.key}
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-900 text-white"
                >
                  {d.label}
                </button>
              ) : (
                <span
                  key={d.key}
                  title="Próximamente"
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 cursor-not-allowed select-none"
                >
                  {d.label}
                  <span className="ml-1 text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                    Próx.
                  </span>
                </span>
              ),
            )}
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
            {/* Jornada */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-xs font-medium text-gray-400 whitespace-nowrap">Jornada</span>
              <select
                value={jornada}
                onChange={e => setJornada(e.target.value as Jornada)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-blue-400 min-h-[38px]"
              >
                <option value="all">Próximas 2 semanas</option>
                <option value="16">Jornada 16</option>
                <option value="17">Jornada 17</option>
                <option value="18">Jornada 18</option>
              </select>
            </label>

            {/* Mercado */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-xs font-medium text-gray-400 whitespace-nowrap">Mercado</span>
              <select
                value={mercado}
                onChange={e => setMercado(e.target.value as Mercado)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-blue-400 min-h-[38px]"
              >
                {(Object.entries(MERCADOS) as [Mercado, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </label>

            {/* Ordenamiento */}
            <label className="flex items-center gap-2 text-sm text-gray-600 sm:ml-auto">
              <span className="text-xs font-medium text-gray-400 whitespace-nowrap">Ordenar</span>
              <select
                value={orden}
                onChange={e => setOrden(e.target.value as Orden)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-blue-400 min-h-[38px]"
              >
                <option value="fecha">Por fecha del partido</option>
                <option value="diferencial">Por mejor diferencial</option>
                <option value="local">Por mejor momio local</option>
                <option value="empate">Por mejor momio empate</option>
                <option value="visitante">Por mejor momio visitante</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* ═══ CONTENIDO ════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Mercado no disponible */}
        {mercado !== '1x2' && (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-12 text-center">
            <p className="text-3xl mb-3">📊</p>
            <p className="font-bold text-gray-900 mb-2">
              Próximamente: {MERCADOS[mercado]}
            </p>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Por ahora solo mostramos el comparador 1X2 (resultado final). El resto de mercados
              llegará en las próximas semanas.
            </p>
            <button
              onClick={() => setMercado('1x2')}
              className="mt-5 text-sm font-semibold text-blue-900 hover:text-emerald-600 underline underline-offset-2 transition-colors"
            >
              Volver a 1X2
            </button>
          </div>
        )}

        {/* Tabla comparadora */}
        {mercado === '1x2' && (
          <>
            {/* Barra de estado */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{ordenados.length}</span>
                {' '}{ordenados.length === 1 ? 'partido' : 'partidos'} · Liga MX · 1X2
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span className="text-xs text-gray-400">Actualizado hace 12 min</span>
              </div>
            </div>

            {/* Sin resultados */}
            {ordenados.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-base mb-3">Sin partidos para esta jornada</p>
                <button
                  onClick={() => setJornada('all')}
                  className="text-sm font-semibold text-blue-900 hover:text-emerald-600 underline underline-offset-2 transition-colors"
                >
                  Ver todas las jornadas
                </button>
              </div>
            )}

            {/* Tabla */}
            {ordenados.length > 0 && (
              <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" style={{ minWidth: '680px' }}>

                    {/* Encabezados fijos de columna */}
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th
                          scope="col"
                          className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 border-r border-gray-100"
                          style={{ minWidth: '110px' }}
                        >
                          Resultado
                        </th>
                        {CASAS.map(casa => (
                          <th
                            key={casa}
                            scope="col"
                            className="py-3 px-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            style={{ minWidth: '72px' }}
                          >
                            {CASAS_DISPLAY[casa]}
                          </th>
                        ))}
                        <th
                          scope="col"
                          className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                          style={{ minWidth: '140px' }}
                        >
                          Mejor
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
                          style={{ minWidth: '72px' }}
                        >
                          Dif.
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
                          style={{ minWidth: '80px' }}
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ordenados.map((partido, idx) => (
                        <Fragment key={partido.id}>
                          {/* Banner educativo después del 5º partido */}
                          {idx === 5 && <BannerEducativo />}

                          {/* Cabecera de partido */}
                          <CabeceraPartido partido={partido} />

                          {/* Filas Local / Empate / Visitante */}
                          <FilaResultado
                            tipo="Local"
                            momios={partido.momios.local}
                            isFirst={true}
                            isLast={false}
                            partidoId={partido.id}
                          />
                          <FilaResultado
                            tipo="Empate"
                            momios={partido.momios.empate}
                            isFirst={false}
                            isLast={false}
                            partidoId={partido.id}
                          />
                          <FilaResultado
                            tipo="Visitante"
                            momios={partido.momios.visitante}
                            isFirst={false}
                            isLast={true}
                            partidoId={partido.id}
                          />
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
