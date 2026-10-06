import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Bell, Volume2, VolumeX, Monitor, X, SlidersHorizontal } from 'lucide-react';
import { StepId } from '../../types/kiosk';

export const KioskHeader: React.FC = () => {
  const {
    currentStep,
    goToStep,
    demoScenario,
    setDemoScenario,
    setIsAdvisorModalOpen,
    setIsCancelModalOpen,
    isSoundEnabled,
    toggleSound,
    kioskFrameMode,
    toggleKioskFrameMode,
  } = useKiosk();

  // Steps mapping to the 7 customer progression stages
  const getStepProgressText = (step: StepId): { text: string; percent: number } | null => {
    switch (step) {
      case 1:
        return { text: 'Paso 1 de 7 · Identificación', percent: 14 };
      case 2:
        return { text: 'Paso 2 de 7 · Conexión', percent: 28 };
      case 3:
        return { text: 'Paso 3 de 7 · Diagnóstico interno', percent: 42 };
      case 4:
        return { text: 'Paso 4 de 7 · Escaneo externo', percent: 57 };
      case 5:
        return { text: 'Paso 5 de 7 · Valuación', percent: 71 };
      case 6:
        return { text: 'Paso 6 de 7 · Elige tu equipo', percent: 85 };
      case 7:
        return { text: 'Paso 7 de 7 · Pago y plazo', percent: 100 };
      case 8:
        return { text: 'Depósito de equipo', percent: 100 };
      case 9:
        return { text: 'Ticket y recolección', percent: 100 };
      case 10:
        return { text: 'Locker de autoservicio', percent: 100 };
      default:
        return null;
    }
  };

  const stepInfo = getStepProgressText(currentStep);

  return (
    <header className="relative z-30 shrink-0 bg-[#0A4DA2] text-white shadow-md border-b-4 border-[#FFD200]">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => currentStep === 0 && goToStep(0)}
            className="flex items-center gap-2 cursor-pointer select-none"
            role="button"
            tabIndex={0}
          >
            <div className="w-10 h-10 rounded-full bg-[#FFD200] flex items-center justify-center shadow-inner">
              <span className="text-[#0A4DA2] font-black text-xl tracking-tighter">C</span>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white font-sans">Coppel</span>
                <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-[#FFD200] text-[#0A4DA2] tracking-wider">
                  Renueva
                </span>
              </div>
              <p className="text-[11px] text-blue-100/90 font-medium">Kiosco de Autoservicio · Tienda Centro</p>
            </div>
          </div>
        </div>

        {/* Center Progress Indicator */}
        {stepInfo && (
          <div className="hidden md:flex flex-col items-center max-w-md w-full px-4">
            <span className="text-sm font-bold text-white tracking-wide mb-1">
              {stepInfo.text}
            </span>
            <div className="w-full h-2.5 bg-blue-900/60 rounded-full overflow-hidden border border-blue-400/30">
              <div
                className="h-full bg-gradient-to-r from-[#FFD200] to-amber-300 transition-all duration-500 rounded-full shadow-sm"
                style={{ width: `${stepInfo.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hidden/Discreet Demo Scenario Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-900/70 border border-blue-400/30 text-xs text-blue-100 hover:bg-blue-800 transition-colors cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFD200]" />
              <span className="font-medium hidden lg:inline">Modo Demo:</span>
              <span className="font-bold text-[#FFD200] capitalize">
                {demoScenario === 'excelente' ? 'Excelente' : demoScenario === 'desgaste' ? 'Desgaste' : 'Pantalla dañada'}
              </span>
            </div>
            {/* Dropdown for evaluator */}
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700 p-2 hidden group-hover:block z-50 text-xs">
              <p className="font-semibold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider">Escenario de valuación:</p>
              <button
                onClick={() => setDemoScenario('excelente')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
                  demoScenario === 'excelente' ? 'bg-[#0A4DA2] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>Excelente estado</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Grado A</span>
              </button>
              <button
                onClick={() => setDemoScenario('desgaste')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
                  demoScenario === 'desgaste' ? 'bg-[#0A4DA2] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>Con desgaste normal</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Grado B/C</span>
              </button>
              <button
                onClick={() => setDemoScenario('pantalla_rota')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
                  demoScenario === 'pantalla_rota' ? 'bg-[#0A4DA2] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>Pantalla fisurada</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">Grado D</span>
              </button>
            </div>
          </div>

          {/* Sound audio toggle */}
          <button
            onClick={toggleSound}
            title={isSoundEnabled ? 'Silenciar sonidos del kiosco' : 'Activar sonidos del kiosco'}
            className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 border border-blue-400/20 text-blue-100 transition-colors"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Kiosk bezel frame toggle */}
          <button
            onClick={toggleKioskFrameMode}
            title="Alternar vista marco de Kiosco / Pantalla completa"
            className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 border border-blue-400/20 text-blue-100 transition-colors"
          >
            <Monitor className={`w-4 h-4 ${kioskFrameMode ? 'text-[#FFD200]' : 'text-blue-200'}`} />
          </button>

          {/* Llamar a un asesor - High visibility button */}
          <button
            onClick={() => setIsAdvisorModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Bell className="w-4 h-4 text-[#0A4DA2] animate-bounce" />
            <span>Llamar a un asesor</span>
          </button>

          {/* Cancel button if inside flow */}
          {currentStep > 0 && currentStep < 9 && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
