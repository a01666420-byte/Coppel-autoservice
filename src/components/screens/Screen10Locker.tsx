import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { NumericKeypad } from '../common/NumericKeypad';
import {
  Box,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  RotateCcw,
  Zap,
  QrCode,
  Smartphone,
  Lock,
  Unlock,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const Screen10Locker: React.FC = () => {
  const { receipt, selectedPhone, acceleratePickupTimer, resetSession } = useKiosk();

  const [enteredCode, setEnteredCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLockerOpen, setIsLockerOpen] = useState<boolean>(false);
  const [isNotReadyModalOpen, setIsNotReadyModalOpen] = useState<boolean>(false);

  const correctCode = receipt?.collectionCode || '849201';
  const assignedLockerNumber = receipt?.lockerNumber || 4;
  const isReady = receipt ? receipt.isReadyForPickup : true;

  const handleNumber = (digit: string) => {
    if (enteredCode.length < 6) {
      setEnteredCode(prev => prev + digit);
      setErrorMessage(null);
    }
  };

  const handleDelete = () => {
    setEnteredCode(prev => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    setEnteredCode('');
    setErrorMessage(null);
  };

  const handleScanTicketQr = () => {
    sounds.playScanBeam();
    setEnteredCode(correctCode);
    setErrorMessage(null);
    sounds.playCheckSuccess();
  };

  const handleVerifyCode = () => {
    if (enteredCode !== correctCode) {
      sounds.playError();
      setErrorMessage('Código incorrecto. Verifica el número impreso en tu ticket.');
      return;
    }

    // Code is correct, check if timer is ready
    if (!isReady && receipt && receipt.countdownSeconds > 0) {
      sounds.playError();
      setIsNotReadyModalOpen(true);
      return;
    }

    // Success! Open locker
    sounds.playLockerUnlock();
    setIsLockerOpen(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A4DA2', '#FFD200', '#10B981', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  };

  const handleForceReady = () => {
    acceleratePickupTimer();
    setIsNotReadyModalOpen(false);
    // Proceed to open
    setTimeout(() => {
      sounds.playLockerUnlock();
      setIsLockerOpen(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0A4DA2', '#FFD200', '#10B981'],
        });
      } catch {
        // ignore
      }
    }, 300);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-900 text-white relative overflow-hidden select-none">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0A4DA2]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFD200] text-[#0A4DA2] flex items-center justify-center font-black text-base">
            C
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white font-sans">
              Coppel Locker Inteligente
            </h2>
            <p className="text-[11px] text-slate-400">Módulo de Entrega Automatizada · Tienda Centro</p>
          </div>
        </div>

        {/* Demo Helper Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleScanTicketQr}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-[#FFD200] border border-slate-700 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Autollenar código ({correctCode})</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      {!isLockerOpen ? (
        /* Code Input & Locker Matrix Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: Visual Locker Bank */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#FFD200] uppercase tracking-wider block mb-1">
                INGRESO DE RECOLECCIÓN
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-white">
                Digita tu código de 6 dígitos
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Introduce el número impreso en tu ticket para abrir la gaveta asignada.
              </p>
            </div>

            {/* Locker Bank Matrix (Lockers 1 to 8) */}
            <div className="p-4 rounded-3xl bg-slate-800/80 border-2 border-slate-700 shadow-xl">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700 text-xs font-mono text-slate-400">
                <span>ESTACIÓN LOCKERS MÓDULO A</span>
                <span className="text-emerald-400">8 GAVETAS OPERATIVAS</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                  const isAssigned = num === assignedLockerNumber;

                  return (
                    <div
                      key={num}
                      className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-between p-2 transition-all ${
                        isAssigned
                          ? 'border-[#FFD200] bg-blue-950/80 shadow-md ring-2 ring-[#FFD200]/40'
                          : 'border-slate-700 bg-slate-900/60 opacity-60'
                      }`}
                    >
                      <div className="w-full flex items-center justify-between text-[10px] font-mono">
                        <span className={isAssigned ? 'text-[#FFD200] font-bold' : 'text-slate-500'}>
                          #{num.toString().padStart(2, '0')}
                        </span>
                        {isAssigned ? (
                          <span className="w-2 h-2 rounded-full bg-[#FFD200] animate-ping" />
                        ) : (
                          <Lock className="w-3 h-3 text-slate-600" />
                        )}
                      </div>

                      <div className="text-center">
                        <span className={`text-[10px] font-bold ${isAssigned ? 'text-white' : 'text-slate-500'}`}>
                          {isAssigned ? 'TU LOCKER' : 'OCUPADO'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Message if wrong */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500 text-rose-200 text-xs font-bold flex items-center gap-2 animate-shake">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Right Column: Code Digits Display & Numeric Keypad */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* 6 Digit display boxes */}
            <div className="flex gap-2.5 mb-5">
              {Array.from({ length: 6 }).map((_, idx) => {
                const char = enteredCode[idx];
                return (
                  <div
                    key={idx}
                    className={`w-12 h-16 rounded-2xl border-2 flex items-center justify-center font-mono text-3xl font-black transition-all ${
                      char
                        ? 'border-[#FFD200] bg-slate-800 text-[#FFD200] shadow-lg shadow-yellow-500/10'
                        : 'border-slate-700 bg-slate-800/40 text-slate-600'
                    }`}
                  >
                    {char || '·'}
                  </div>
                );
              })}
            </div>

            {/* Keypad */}
            <div className="bg-slate-800/90 backdrop-blur-md p-5 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-sm">
              <NumericKeypad
                onNumberPress={handleNumber}
                onDeletePress={handleDelete}
                onClearPress={handleClear}
                onSubmitPress={handleVerifyCode}
                submitLabel="Abrir Locker"
                submitDisabled={enteredCode.length < 6}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Locker Door Open Celebration View */
        <div className="max-w-2xl mx-auto my-auto w-full text-center space-y-6 animate-fade-in">
          {/* Big Open Door Graphic */}
          <div className="relative w-80 h-80 mx-auto rounded-3xl bg-slate-800 border-4 border-[#FFD200] shadow-2xl p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Interior lights */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 to-amber-500/20 pointer-events-none" />

            {/* Phone Box inside */}
            <div className="relative z-10 flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-40 h-52 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-4 border-white/80 shadow-2xl p-3 flex flex-col justify-between items-center">
                {/* Ribbon */}
                <div className="w-full flex justify-between items-center text-[10px] font-bold text-[#FFD200] uppercase tracking-wider">
                  <span>NUEVO</span>
                  <span>SELLADO</span>
                </div>

                <div className="w-20 h-28 rounded-xl bg-gradient-to-tr from-[#0A4DA2] to-blue-500 flex flex-col items-center justify-center shadow-inner">
                  <Smartphone className="w-10 h-10 text-white" />
                  <span className="text-[9px] font-bold text-white mt-1">Garantía Coppel</span>
                </div>

                <span className="text-xs font-black text-white truncate max-w-full">
                  {selectedPhone?.name}
                </span>
              </div>
            </div>

            {/* Solenoid Unlock Tag */}
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
              <Unlock className="w-3.5 h-3.5" /> GAVETA #{assignedLockerNumber} ABIERTA
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider">
              ¡Operación Concluida con Éxito!
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-white font-sans">
              ¡Disfruta tu nuevo celular!
            </h1>
            <p className="text-slate-300 text-base max-w-md mx-auto">
              Retira la caja de tu nuevo <strong className="text-[#FFD200]">{selectedPhone?.name}</strong> y recuerda empujar la puerta del locker para que quede cerrada.
            </p>
          </div>

          {/* Reset Demo CTA */}
          <div className="pt-4 max-w-md mx-auto">
            <button
              onClick={resetSession}
              className="w-full py-4 px-8 bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] font-black text-xl rounded-2xl shadow-xl shadow-yellow-500/20 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
              <span>Cerrar Puerta y Finalizar Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal: Still in preparation */}
      {isNotReadyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in text-slate-900">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border-4 border-amber-400 text-center relative">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border-2 border-amber-200">
              <Clock className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Tu equipo aún no está listo
            </h3>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              El personal de almacén está terminando de preparar y empacar tu teléfono nuevo. El locker se habilitará en cuanto el paquete sea colocado en la gaveta.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleForceReady}
                className="w-full py-3.5 px-6 bg-[#0A4DA2] hover:bg-blue-800 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#FFD200]" />
                <span>Acelerar para demostración (Listo ahora)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsNotReadyModalOpen(false)}
                className="w-full py-2.5 px-6 text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Entendido, esperar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-slate-500 text-center pt-2">
        Coppel Locker Seguro · Sensores ópticos de extracción y cierre automático.
      </div>
    </div>
  );
};
