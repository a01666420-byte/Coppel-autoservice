import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { AlertCircle } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const CancelModal: React.FC = () => {
  const { isCancelModalOpen, setIsCancelModalOpen, resetSession } = useKiosk();

  if (!isCancelModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border-4 border-red-500 text-center relative">
        <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-2">
          ¿Deseas cancelar el proceso?
        </h3>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Si sales ahora, la sesión se reiniciará por tu seguridad y no se guardará el diagnóstico en progreso. Recuerda retirar tu celular de la bandeja antes de retirarte.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              setIsCancelModalOpen(false);
            }}
            className="w-full py-3.5 px-6 bg-[#0A4DA2] hover:bg-blue-800 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-98"
          >
            Continuar con mi trámite
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              resetSession();
            }}
            className="w-full py-3 px-6 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-sm rounded-2xl transition-all border border-slate-200"
          >
            Sí, cancelar y salir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
