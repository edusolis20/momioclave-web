import { useState } from 'react';

const PREGUNTAS = [
  '¿Has intentado controlar, reducir o detener tus apuestas y no has podido?',
  '¿Has mentido a familiares, amigos o profesionales sobre cuánto apuestas?',
  '¿Apuestas cuando te sientes ansioso, deprimido o culpable?',
  '¿Después de perder, sientes que tienes que volver a apostar pronto para recuperar lo perdido?',
  '¿Has pedido dinero prestado o vendido cosas para poder apostar?',
  '¿Tu juego ha causado problemas en tu trabajo, estudios o relaciones personales?',
  '¿Necesitas apostar cantidades cada vez mayores para sentir la misma emoción?',
  '¿Te sientes inquieto o irritable cuando tratas de reducir tus apuestas?',
  '¿Has apostado dinero que estaba destinado a otras necesidades (renta, comida, deudas)?',
  '¿Has considerado o cometido actos ilegales para financiar tus apuestas?',
];

type Respuesta = boolean | null;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

function Resultado({ score, onReset }: { score: number; onReset: () => void }) {
  if (score <= 2) {
    return (
      <div className="mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 overflow-hidden">
        <div className="px-6 py-5 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-bold text-gray-900 text-base leading-snug">
              Tu relación con el juego parece estar dentro de lo recreativo
            </p>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-5">
            Las respuestas sugieren que el juego es para ti una forma de entretenimiento manejable. Esto no
            significa ausencia de riesgo: revisa estos hábitos cada cierto tiempo, especialmente si pasas por
            momentos de estrés o cambios importantes en tu vida.
          </p>
          <button
            onClick={() => scrollTo('buenas-practicas')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            Ver buenas prácticas para apostadores recreativos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (score <= 4) {
    return (
      <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
        <div className="px-6 py-5 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-bold text-gray-900 text-base leading-snug">
              Hay señales que vale la pena observar de cerca
            </p>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-5">
            Algunas de tus respuestas indican patrones que pueden estar afectándote sin que lo notes del todo.
            Esto no es un diagnóstico — es una señal para detenerte a reflexionar. Hablar con un profesional
            de salud mental, aunque sea de forma orientativa, puede ayudarte a clarificar el panorama.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:8009112000"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <PhoneIcon />
              Llamar a Línea de la Vida (gratuita)
            </a>
            <button
              onClick={() => scrollTo('recursos-ayuda')}
              className="inline-flex items-center gap-2 bg-white border border-amber-200 hover:border-amber-400 text-amber-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Ver opciones de ayuda profesional
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5+
  return (
    <div className="mt-2 rounded-2xl border border-red-200 bg-red-50 overflow-hidden">
      <div className="px-6 py-5 border-b border-red-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-red-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="font-bold text-gray-900 text-base leading-snug">
            Los resultados sugieren un patrón que merece atención profesional
          </p>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="text-gray-700 text-sm leading-relaxed mb-5">
          Tus respuestas son consistentes con lo que clínicamente se identifica como juego problemático.
          Esto no es un juicio sobre ti — es una condición tratable que afecta a millones de personas en
          el mundo. Buscar ayuda ahora puede evitar consecuencias mayores. La Línea de la Vida es un buen
          primer paso: gratuita, confidencial, sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:8009112000"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-3 rounded-lg transition-colors"
          >
            <PhoneIcon />
            Llamar a Línea de la Vida ahora
          </a>
          <button
            onClick={() => scrollTo('recursos-ayuda')}
            className="inline-flex items-center gap-2 bg-white border border-red-200 hover:border-red-400 text-red-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            Ver todos los recursos de ayuda
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">800 911 2000 · Gratuita · Confidencial · 24/7</p>
      </div>
    </div>
  );
}

export default function TestAutoevaluacion() {
  const [respuestas, setRespuestas] = useState<Respuesta[]>(Array(10).fill(null));
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const respondidas = respuestas.filter(r => r !== null).length;
  const todasRespondidas = respondidas === 10;

  function seleccionar(index: number, valor: boolean) {
    const nuevas = [...respuestas];
    nuevas[index] = nuevas[index] === valor ? null : valor;
    setRespuestas(nuevas);
    setMostrarResultado(false);
    setIntentoEnviar(false);
  }

  function verResultado() {
    if (!todasRespondidas) {
      setIntentoEnviar(true);
      return;
    }
    setMostrarResultado(true);
  }

  function reiniciar() {
    setRespuestas(Array(10).fill(null));
    setMostrarResultado(false);
    setIntentoEnviar(false);
  }

  const score = respuestas.filter(r => r === true).length;

  return (
    <div>
      {/* Progreso */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-400">
          {respondidas} de 10 preguntas respondidas
        </p>
        {todasRespondidas && !mostrarResultado && (
          <span className="text-xs text-emerald-600 font-medium">Listo para ver resultado</span>
        )}
      </div>

      {/* Preguntas */}
      {!mostrarResultado && (
        <div className="space-y-3">
          {PREGUNTAS.map((pregunta, i) => (
            <div
              key={i}
              className={`border rounded-xl p-4 transition-colors ${
                respuestas[i] !== null
                  ? 'border-gray-200 bg-white'
                  : 'border-gray-100 bg-white'
              }`}
            >
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                <span className="font-semibold text-gray-400 mr-2 select-none">{i + 1}.</span>
                {pregunta}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => seleccionar(i, true)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    respuestas[i] === true
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => seleccionar(i, false)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    respuestas[i] === false
                      ? 'bg-gray-700 text-white border-gray-700'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botón enviar */}
      {!mostrarResultado && (
        <div className="mt-6">
          <button
            onClick={verResultado}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              todasRespondidas
                ? 'bg-blue-900 hover:bg-blue-800 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Ver mi resultado
          </button>
          {intentoEnviar && !todasRespondidas && (
            <p className="mt-2 text-xs text-amber-600">
              Responde todas las preguntas para ver tu resultado.
            </p>
          )}
        </div>
      )}

      {/* Resultado */}
      {mostrarResultado && <Resultado score={score} onReset={reiniciar} />}

      {/* Disclaimer + reiniciar */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-400 leading-relaxed max-w-prose">
          Este test es orientativo y se basa en los criterios DSM-5 para el trastorno de juego.
          No reemplaza una evaluación clínica profesional.
        </p>
        {mostrarResultado && (
          <button
            onClick={reiniciar}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors flex-shrink-0"
          >
            Reiniciar test
          </button>
        )}
      </div>
    </div>
  );
}
