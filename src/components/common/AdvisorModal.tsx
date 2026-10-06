import React, { useState, useEffect } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Bell, CheckCircle2, UserCheck, X } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const AdvisorModal: React.FC = () => {
  const { isAdvisorModalOpen, setIsAdvisorModalOpen } = useKiosk();
  const [advisorDispatched, setAdvisorDispatched] = useState(false);

  useEffect(() => {
    if (isAdvisorModalOpen) {
      sounds.playClick();
      setAdvisorDispatched(false);
      const timer = setTimeout(() => {
        setAdvisorDispatched(true);
        sounds.playCheckSuccess();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAdvisorModalOpen]);

  if (!isAdvisorModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border-4 border-[#0A4DA2] text-center relative overflow-hidden">
        {/* Close icon */}
        <button
          onClick={() => setIsAdvisorModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-20 h-20 rounded-full bg-blue-50 border-4 border-[#0A4DA2] text-[#0A4DA2] flex items-center justify-center mx-auto mb-5 shadow-md">
          {advisorDispatched ? (
            <UserCheck className="w-10 h-10 text-emerald-600 animate-pulse" />
          ) : (
            <Bell className="w-10 h-10 text-[#0A4DA2] animate-bounce" />
          )}
        </div>

        <h3 className="text-2xl font-black text-[#0A4DA2] mb-2">
          {advisorDispatched ? '¡Asesor Asignado!' : 'Llamando a un Asesor Coppel'}
        </h3>

        <div className="space-y-3 mb-6 text-slate-600">
          <p className="text-base font-medium">
            {advisorDispatched ? (
              <span className="text-slate-800">
                El asesor <strong className="text-[#0A4DA2]">Carlos Mendoza</strong> del departamento de telefonía viene en camino a tu módulo.
              </span>
            ) : (
              'Estamos notificando al personal de piso de venta para que se acerque a ayudarte en este momento.'
            )}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-left space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-700">
              <span className="font-semibold">Ubicación del kiosco:</span>
              <span className="font-bold text-[#0A4DA2]">Kiosco #K-104 (Telefonía)</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-semibold">Tiempo estimado de llegada:</span>
              <span className="font-bold text-emerald-600">Menos de 1 minuto</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-semibold">Estado de la llamada:</span>
              <span className="flex items-center gap-1 font-bold text-blue-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {advisorDispatched ? 'Atención en camino' : 'Enviando señal...'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAdvisorModalOpen(false)}
          className="w-full py-4 px-6 bg-[#0A4DA2] hover:bg-blue-800 active:scale-98 text-white font-bold text-lg rounded-2xl shadow-lg transition-all"
        >
          Entendido, gracias
        </button>
      </div>
    </div>
  );
};
