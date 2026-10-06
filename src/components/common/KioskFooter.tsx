import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { RotateCcw, Info, ChevronRight } from 'lucide-react';
import { StepId } from '../../types/kiosk';

export const KioskFooter: React.FC = () => {
  const { currentStep, goToStep, resetSession } = useKiosk();

  const stepsList: { id: StepId; label: string }[] = [
    { id: 0, label: '0. Inicio' },
    { id: 1, label: '1. Cuenta' },
    { id: 2, label: '2. Conecta' },
    { id: 3, label: '3. Diag. Int.' },
    { id: 4, label: '4. Escaneo Ext.' },
    { id: 5, label: '5. Valuación' },
    { id: 6, label: '6. Catálogo' },
    { id: 7, label: '7. Pago' },
    { id: 8, label: '8. Entrega' },
    { id: 9, label: '9. Ticket' },
    { id: 10, label: '10. Locker' },
  ];

  return (
    <footer className="relative z-20 shrink-0 bg-slate-900 border-t border-slate-800 text-slate-300 py-2.5 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left Notice */}
        <div className="flex items-center gap-2 text-slate-400">
          <Info className="w-4 h-4 text-[#FFD200] shrink-0" />
          <span className="font-medium text-slate-300">
            Prototipo de demostración – datos simulados para Kiosco Coppel Renueva
          </span>
        </div>

        {/* Center Quick Step Jump (for review convenience) */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-2xl py-0.5 px-2 bg-slate-800/80 rounded-lg border border-slate-700/60 scrollbar-none">
          <span className="text-[10px] text-slate-400 font-semibold uppercase pr-1 shrink-0">
            Pantalla:
          </span>
          {stepsList.map(s => (
            <button
              key={s.id}
              onClick={() => goToStep(s.id)}
              className={`px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                currentStep === s.id
                  ? 'bg-[#FFD200] text-[#0A4DA2] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right Restart Demo button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={resetSession}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-colors active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FFD200]" />
            <span>Reiniciar demo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
