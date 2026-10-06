import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import {
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Lock,
  Smartphone,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen8Deposit: React.FC = () => {
  const { diagnosedPhone, goToStep } = useKiosk();

  const [simRemoved, setSimRemoved] = useState<boolean>(true);
  const [doorState, setDoorState] = useState<'closed' | 'opening' | 'open' | 'deposited'>('closed');

  const handleOpenChute = () => {
    sounds.playClick();
    setDoorState('opening');

    setTimeout(() => {
      setDoorState('open');
      sounds.playLockerUnlock();
    }, 1000);
  };

  const handleDepositPhone = () => {
    sounds.playClick();
    setDoorState('deposited');
    sounds.playFanfare();

    // After 2 seconds, proceed to ticket
    setTimeout(() => {
      goToStep(9);
    }, 2200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold">
          <PackageCheck className="w-4 h-4 text-[#0A4DA2]" />
          Entrega del Celular Usado
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Depósito seguro en bóveda interna
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Data Wipe Certificate & Verification */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Borrado Seguro de Datos Certificado
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              Tu privacidad está 100% protegida
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Antes de entregar tu equipo, el protocolo Coppel Renueva ejecuta un restablecimiento de fábrica irreversible.
            </p>
          </div>

          {/* Privacy Checklist */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 space-y-3 shadow-sm text-sm">
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Fotos, videos y mensajes eliminados permanentemente.</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Sesiones bancarias y cuentas de correo desvinculadas.</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Certificación de borrado con estándar internacional NIST SP 800-88.</span>
            </div>
          </div>

          {/* SIM Card & MicroSD Reminder checkbox */}
          <div
            onClick={() => setSimRemoved(prev => !prev)}
            className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center gap-3.5 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={simRemoved}
              onChange={() => {}}
              className="w-5 h-5 rounded text-[#0A4DA2] focus:ring-[#0A4DA2] cursor-pointer"
            />
            <div className="text-xs">
              <strong className="text-amber-950 font-bold block text-sm">
                Confirmación de Chip SIM y Memoria
              </strong>
              <span className="text-amber-800">
                Confirmo que he retirado mi tarjeta SIM (chip de línea) y tarjeta de memoria microSD de mi teléfono.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Kiosk Intake Hatch Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md h-80 rounded-3xl bg-slate-950 border-4 border-slate-800 shadow-2xl p-6 flex flex-col items-center justify-between text-white relative overflow-hidden">
            {/* Status bar */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${doorState === 'deposited' ? 'bg-emerald-400' : 'bg-[#FFD200]'}`} />
                COMPUERTA DE RECEPCIÓN
              </span>
              <span className="text-[#FFD200] font-bold">
                {doorState === 'closed' && 'COMPUERTA CERRADA'}
                {doorState === 'opening' && 'ABRIENDO COMPUERTA...'}
                {doorState === 'open' && 'COMPUERTA ABIERTA'}
                {doorState === 'deposited' && 'EQUIPO RESGUARDADO'}
              </span>
            </div>

            {/* Hatch opening animation container */}
            <div className="relative my-auto flex flex-col items-center justify-center w-full">
              {/* Hatch enclosure */}
              <div className="w-64 h-36 rounded-2xl bg-slate-900 border-4 border-slate-700 shadow-inner relative flex items-center justify-center overflow-hidden">
                {/* Interior illumination */}
                <div
                  className={`absolute inset-0 bg-blue-500/10 transition-opacity duration-500 ${
                    doorState === 'open' || doorState === 'deposited' ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {doorState === 'closed' && (
                  <div className="text-center space-y-1">
                    <Lock className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400 font-mono">Presiona el botón para abrir</p>
                  </div>
                )}

                {doorState === 'opening' && (
                  <div className="text-center space-y-1">
                    <Loader2 className="w-8 h-8 text-[#FFD200] mx-auto animate-spin" />
                    <p className="text-xs text-slate-300 font-mono">Desbloqueando electroimán...</p>
                  </div>
                )}

                {doorState === 'open' && (
                  <div className="text-center space-y-2 animate-bounce">
                    <Smartphone className="w-10 h-10 text-[#FFD200] mx-auto" />
                    <p className="text-xs text-emerald-400 font-bold">Deposita tu celular aquí</p>
                  </div>
                )}

                {doorState === 'deposited' && (
                  <div className="text-center space-y-1 animate-fade-in">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-xs text-emerald-300 font-bold">¡Equipo recibido con éxito!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom chute status text */}
            <div className="text-xs text-center text-slate-400">
              {doorState === 'deposited'
                ? 'Bóveda asegurada. Generando ticket de entrega...'
                : 'La compuerta cuenta con sensores de peso y volumen.'}
            </div>
          </div>

          {/* Action triggers */}
          <div className="w-full max-w-md mt-4">
            {doorState === 'closed' && (
              <button
                type="button"
                disabled={!simRemoved}
                onClick={handleOpenChute}
                className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  simRemoved
                    ? 'bg-[#0A4DA2] hover:bg-blue-800 text-white shadow-blue-900/20 active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Abrir compuerta del kiosco</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {doorState === 'open' && (
              <button
                type="button"
                onClick={handleDepositPhone}
                className="w-full py-4 px-6 rounded-2xl bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] font-black text-lg shadow-xl shadow-yellow-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <span>Depositar celular en la compuerta</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            )}

            {doorState === 'deposited' && (
              <div className="w-full py-4 px-6 rounded-2xl bg-emerald-600 text-white font-black text-center shadow-lg animate-fade-in">
                Compuerta cerrada y asegurada
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-slate-400 text-center pt-2">
        Al depositar el equipo, se transfiere la titularidad al programa Coppel Renueva según los términos y condiciones acordados.
      </div>
    </div>
  );
};
