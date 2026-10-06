import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import {
  Award,
  Sparkles,
  Calculator,
  CheckCircle2,
  ArrowRight,
  X,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen5Valuation: React.FC = () => {
  const { valuation, diagnosedPhone, goToStep, resetSession } = useKiosk();
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  const getGradeStyle = (grade: string) => {
    switch (grade) {
      case 'A':
        return {
          bg: 'bg-emerald-500',
          text: 'text-white',
          border: 'border-emerald-400',
          badge: 'bg-emerald-100 text-emerald-900',
          sub: 'Excelente Estado · Oferta Máxima',
        };
      case 'B':
        return {
          bg: 'bg-blue-600',
          text: 'text-white',
          border: 'border-blue-400',
          badge: 'bg-blue-100 text-blue-900',
          sub: 'Buen Estado · Desgaste Leve',
        };
      case 'C':
        return {
          bg: 'bg-amber-500',
          text: 'text-white',
          border: 'border-amber-400',
          badge: 'bg-amber-100 text-amber-900',
          sub: 'Estado Regular · Desgaste Visible',
        };
      case 'D':
      default:
        return {
          bg: 'bg-rose-500',
          text: 'text-white',
          border: 'border-rose-400',
          badge: 'bg-rose-100 text-rose-900',
          sub: 'Grado D · Requiere Reparación de Pantalla',
        };
    }
  };

  const gradeStyle = getGradeStyle(valuation.grade);

  const handleAccept = () => {
    sounds.playFanfare();
    goToStep(6);
  };

  const handleDecline = () => {
    sounds.playClick();
    setShowExitModal(true);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold">
          <Award className="w-4 h-4 text-[#0A4DA2]" />
          Paso 5 de 7 · Valuación Garantizada
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Cotización oficial Coppel Renueva
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left: Big Offer Card */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 lg:p-8 shadow-xl border-4 border-[#0A4DA2] relative text-center">
            {/* Grade Ribbon Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div
                className={`px-5 py-2 rounded-2xl font-black text-sm tracking-wider uppercase shadow-md flex items-center gap-2 ${gradeStyle.bg} ${gradeStyle.text}`}
              >
                <Award className="w-4 h-4" />
                <span>Calificación: Grado {valuation.grade}</span>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-3 mb-1">
              VALOR DE RETOMA INMEDIATO
            </p>

            {/* Giant Price Text */}
            <div className="py-2">
              <span className="text-5xl lg:text-6xl font-black text-[#0A4DA2] font-mono tracking-tight">
                ${valuation.finalValue.toLocaleString('es-MX')}
              </span>
              <span className="text-base font-extrabold text-slate-600 block mt-1">MXN</span>
            </div>

            <p className="text-xs font-semibold text-slate-600 mt-1">
              Por tu <strong className="text-slate-900">{diagnosedPhone.brand} {diagnosedPhone.model} {diagnosedPhone.storage}</strong>
            </p>

            {/* Grade summary pill */}
            <div className={`mt-4 py-2 px-4 rounded-xl text-xs font-bold inline-block ${gradeStyle.badge}`}>
              {gradeStyle.sub}
            </div>

            {/* Micro formula badge */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Valor Base del Modelo:</span>
                <span className="font-mono font-bold text-slate-800">${valuation.baseValue.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Factor Interno (Hardware):</span>
                <span className="font-mono font-bold text-slate-800">× {(valuation.internalFactor).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Factor Externo (Óptica):</span>
                <span className="font-mono font-bold text-slate-800">× {(valuation.externalFactor).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Este monto se descuenta al 100% de tu nuevo teléfono
            </div>
          </div>
        </div>

        {/* Right: Breakdown & Formula Explanations */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              ¿Cómo se calculó tu oferta?
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Desglose detallado de los componentes analizados en el diagnóstico del kiosco.
            </p>
          </div>

          {/* Breakdown Items List */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 divide-y divide-slate-100 shadow-sm text-sm">
            {valuation.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2.5">
                <div>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm block">{item.label}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{item.impact}</span>
                </div>
                <span className="font-mono text-xs font-black text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                  {item.score}
                </span>
              </div>
            ))}
          </div>

          {/* Collapsible formula details */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5">
            <button
              onClick={() => setShowFormulaDetails(prev => !prev)}
              className="w-full flex items-center justify-between text-xs font-bold text-[#0A4DA2]"
            >
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                Fórmula de valuación oficial Coppel
              </span>
              {showFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFormulaDetails && (
              <div className="mt-2.5 pt-2 border-t border-blue-200/60 text-xs text-slate-700 space-y-1.5">
                <p>
                  <strong>Fórmula:</strong> Valor Final = Valor Base × Factor Interno × Factor Externo.
                </p>
                <p className="text-[11px] text-slate-600">
                  • <strong>Grado A (≥ 0.90):</strong> Celular sin fallas y estética impecable.<br />
                  • <strong>Grado B (≥ 0.75):</strong> Batería normal y micro-desgaste superficial.<br />
                  • <strong>Grado C (≥ 0.60):</strong> Batería al límite o marcas visibles.<br />
                  • <strong>Grado D (&lt; 0.60):</strong> Pantalla fisurada o módulo dañado.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAccept}
              className="flex-1 py-4 px-6 bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] font-black text-lg rounded-2xl shadow-lg shadow-yellow-500/20 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Aceptar oferta y elegir celular</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              onClick={handleDecline}
              className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-all border border-slate-200 cursor-pointer"
            >
              No, gracias
            </button>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border-4 border-slate-300 text-center relative">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-[#0A4DA2]" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              ¿Deseas retirar tu celular?
            </h3>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              La compuerta de la bandeja se abrirá para que puedas retirar tu equipo de manera segura. Recuerda desconectar el cable antes de retirarte.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-3.5 px-6 bg-[#0A4DA2] hover:bg-blue-800 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-98"
              >
                Regresar y conservar mi oferta
              </button>

              <button
                onClick={() => {
                  setShowExitModal(false);
                  resetSession();
                }}
                className="w-full py-3 px-6 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-sm rounded-2xl transition-all border border-slate-200"
              >
                Abrir bandeja y salir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-xs text-slate-400 text-center pt-2">
        La oferta tiene una validez inmediata durante esta sesión y no genera ningún compromiso de compra.
      </div>
    </div>
  );
};
