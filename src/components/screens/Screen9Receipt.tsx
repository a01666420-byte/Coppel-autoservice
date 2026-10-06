import React, { useEffect } from 'react';
import { useKiosk } from '../../context/KioskContext';
import {
  Printer,
  QrCode,
  Clock,
  Box,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Share2,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen9Receipt: React.FC = () => {
  const {
    receipt,
    setReceipt,
    selectedPhone,
    diagnosedPhone,
    valuation,
    paymentSelection,
    customer,
    acceleratePickupTimer,
    goToStep,
  } = useKiosk();

  // If receipt doesn't exist yet, initialize it
  useEffect(() => {
    if (!receipt) {
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      const lockerNum = Math.floor(1 + Math.random() * 8);

      const now = new Date();
      const newReceipt = {
        ticketNumber: `TK-${Math.floor(100000 + Math.random() * 900000)}`,
        collectionCode: randomCode,
        assignedLocker: `Locker #${lockerNum} · Módulo A`,
        lockerNumber: lockerNum,
        purchaseDate: now.toLocaleDateString('es-MX'),
        purchaseTime: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        countdownSeconds: 1800, // 30 minutes
        isReadyForPickup: false,
        storeName: 'Coppel Culiacán Centro',
        kioskId: 'K-104',
      };

      setReceipt(newReceipt);
      sounds.playFanfare();
    }
  }, [receipt, setReceipt]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSeconds = receipt ? receipt.countdownSeconds : 1800;
  const isReady = receipt ? receipt.isReadyForPickup : false;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-100 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ¡Operación Exitosa! Ticket Emitido
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Impresión térmica completada
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Realistic Printed Thermal Ticket */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border-t-8 border-[#0A4DA2] p-6 text-slate-800 font-mono text-xs space-y-4 animate-fade-in">
            {/* Header */}
            <div className="text-center pb-3 border-b-2 border-dashed border-slate-300">
              <div className="inline-block p-1 rounded-full bg-[#FFD200] text-[#0A4DA2] font-black text-lg px-3 mb-1">
                COPPEL RENUEVA
              </div>
              <p className="font-sans font-bold text-slate-900 text-sm">Coppel Centro Culiacán</p>
              <p className="text-[11px] text-slate-500">Kiosco de Autoservicio #K-104</p>
              <p className="text-[10px] text-slate-400">
                {receipt?.purchaseDate} · {receipt?.purchaseTime}
              </p>
            </div>

            {/* Collection Code Highlight */}
            <div className="bg-blue-50 border-2 border-[#0A4DA2] rounded-2xl p-3 text-center">
              <span className="text-[10px] font-sans font-black text-slate-500 uppercase tracking-widest block">
                CÓDIGO DE RECOLECCIÓN EN LOCKER
              </span>
              <span className="text-4xl font-black text-[#0A4DA2] tracking-wider block py-1 font-mono">
                {receipt?.collectionCode || '849201'}
              </span>
              <span className="text-xs font-sans font-bold text-emerald-700 block">
                {receipt?.assignedLocker || 'Locker #04 · Módulo A'}
              </span>
            </div>

            {/* QR Code graphic */}
            <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl border border-slate-200">
              <QrCode className="w-24 h-24 text-slate-800" />
              <span className="text-[9px] text-slate-500 mt-1">Escanéalo en la pantalla del locker</span>
            </div>

            {/* Purchase Details */}
            <div className="space-y-1.5 text-[11px] border-t-2 border-dashed border-slate-300 pt-3 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-500">Nuevo celular:</span>
                <span className="font-bold text-slate-900 text-right">{selectedPhone?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bono por retoma:</span>
                <span className="font-bold text-emerald-600">- ${valuation.finalValue.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Método de pago:</span>
                <span className="font-bold text-slate-800">
                  {paymentSelection?.method === 'credito_coppel' ? 'Crédito Coppel (Quincenas)' : 'Tarjeta de Contado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cliente:</span>
                <span className="font-bold text-slate-800">{customer?.name || 'Roberto Morales Gómez'}</span>
              </div>
            </div>

            {/* Ticket Footer barcode simulated */}
            <div className="text-center pt-2 border-t border-slate-200 text-[10px] text-slate-400">
              <div className="h-6 bg-slate-800 rounded flex items-center justify-around px-2 mb-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full ${i % 3 === 0 ? 'w-1 bg-white' : i % 2 === 0 ? 'w-0.5 bg-white' : 'w-1.5 bg-slate-800'}`}
                  />
                ))}
              </div>
              <span>{receipt?.ticketNumber || 'TK-84920193'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: 30-min countdown timer & Pickup Locker CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              Tu celular estará listo en el locker
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Nuestro personal de almacén está preparando tu equipo nuevo en su caja sellada con su póliza de garantía y accesorios.
            </p>
          </div>

          {/* Countdown Clock Card */}
          <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0A4DA2]" />
                <span className="font-bold text-sm text-slate-800">Tiempo de preparación estimado</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                {isReady ? '¡Listo para entrega!' : 'En empaque'}
              </span>
            </div>

            {/* Countdown Numbers */}
            <div className="text-center py-2">
              <div className="font-mono text-5xl lg:text-6xl font-black text-[#0A4DA2] tracking-tight">
                {formatTimer(currentSeconds)}
              </div>
              <p className="text-xs text-slate-500 font-sans mt-1">
                {isReady
                  ? 'Tu equipo ya se encuentra depositado en la gaveta del locker inteligente.'
                  : 'Cuenta regresiva en tiempo real'}
              </p>
            </div>

            {/* Locker location */}
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A4DA2] text-[#FFD200] flex items-center justify-center font-bold shrink-0">
                <Box className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block text-sm">
                  {receipt?.assignedLocker || 'Locker #04 · Módulo A'}
                </span>
                <span className="text-slate-600">Ubicado a 5 metros junto a las cajas de abono</span>
              </div>
            </div>

            {/* Demo accelerator button for evaluators */}
            {!isReady && (
              <button
                type="button"
                onClick={acceleratePickupTimer}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Simular tiempo cumplido (Acelerar a "Listo ahora")</span>
              </button>
            )}
          </div>

          {/* Primary Action Button to Locker Screen */}
          <div className="space-y-3">
            <button
              onClick={() => goToStep(10)}
              className="w-full py-4 px-8 rounded-2xl bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] font-black text-xl shadow-xl shadow-yellow-500/20 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Ir a la pantalla del Locker de Entrega</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-slate-400 text-center pt-2">
        Conserva tu ticket o foto del código de recolección. El locker solo se abrirá al ingresar este código único.
      </div>
    </div>
  );
};
