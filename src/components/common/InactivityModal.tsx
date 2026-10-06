import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Clock } from 'lucide-react';

export const InactivityModal: React.FC = () => {
  const { isInactivityModalOpen, inactivityCountdown, dismissInactivityModal, resetSession } = useKiosk();

  if (!isInactivityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border-4 border-[#FFD200] text-center relative overflow-hidden">
        {/* Glow */}
        <div className="w-24 h-24 rounded-full bg-amber-50 border-4 border-[#FFD200] text-[#0A4DA2] flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Clock className="w-12 h-12 text-[#0A4DA2] animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <h3 className="text-3xl font-black text-[#0A4DA2] mb-2 font-sans">
          ¿Sigues ahí?
        </h3>

        <p className="text-slate-600 text-base mb-6">
          Por protección de tus datos personales y de tu cuenta Coppel, esta sesión se cerrará automáticamente en:
        </p>

        {/* Big countdown badge */}
        <div className="w-24 h-24 rounded-2xl bg-slate-900 text-[#FFD200] flex items-center justify-center mx-auto mb-8 shadow-xl font-mono text-5xl font-black border-2 border-slate-700">
          {inactivityCountdown}
        </div>

        <div className="space-y-3">
          <button
            onClick={dismissInactivityModal}
            className="w-full py-4 px-6 bg-[#0A4DA2] hover:bg-blue-800 text-white font-extrabold text-xl rounded-2xl shadow-xl transition-all active:scale-98"
          >
            ¡Sí, sigo aquí! Continuar
          </button>

          <button
            onClick={resetSession}
            className="w-full py-3 px-6 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors"
          >
            Cerrar sesión ahora
          </button>
        </div>
      </div>
    </div>
  );
};
