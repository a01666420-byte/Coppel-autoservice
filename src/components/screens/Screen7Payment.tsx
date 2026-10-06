import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { PaymentMethodType } from '../../types/kiosk';
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Lock,
  Smartphone,
  Loader2,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen7Payment: React.FC = () => {
  const { selectedPhone, valuation, diagnosedPhone, customer, setPaymentSelection, goToStep } = useKiosk();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credito_coppel');
  const [selectedTermMonths, setSelectedTermMonths] = useState<12 | 18 | 24>(18);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // If no phone selected fallback
  const phonePrice = selectedPhone?.price || 17499;
  const tradeInDiscount = valuation.finalValue;
  const differenceToPay = Math.max(0, phonePrice - tradeInDiscount);

  // Installment calculation
  // 12 months = 24 quincenas, 18 months = 36 quincenas, 24 months = 48 quincenas
  const getQuincenalAmount = (months: 12 | 18 | 24) => {
    const quincenas = months * 2;
    // Low APR retail financing rate
    const interestFactor = months === 12 ? 1.12 : months === 18 ? 1.18 : 1.25;
    return Math.round((differenceToPay * interestFactor) / quincenas);
  };

  const currentQuincenal = getQuincenalAmount(selectedTermMonths);

  const handleProcessPayment = () => {
    sounds.playClick();
    setIsProcessing(true);

    if (paymentMethod === 'terminal_tarjeta') {
      sounds.playScanBeam();
    }

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      sounds.playFanfare();

      setPaymentSelection({
        method: paymentMethod,
        totalNewPhonePrice: phonePrice,
        tradeInDiscount,
        amountToPay: differenceToPay,
        creditTermMonths: paymentMethod === 'credito_coppel' ? selectedTermMonths : undefined,
        quincenalPayment: paymentMethod === 'credito_coppel' ? currentQuincenal : undefined,
        cardBrand: paymentMethod === 'terminal_tarjeta' ? 'Visa' : 'Coppel Pay',
        cardLastDigits: paymentMethod === 'terminal_tarjeta' ? '4092' : undefined,
        paidAt: new Date(),
      });

      // Auto proceed to Screen 8 after 1.5s
      setTimeout(() => {
        goToStep(8);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold">
          <CreditCard className="w-4 h-4 text-[#0A4DA2]" />
          Paso 7 de 7 · Pago de la Diferencia
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Transacción encriptada y segura
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Transaction Balance Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-md space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Resumen de la Operación
            </h3>

            {/* New phone */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0A4DA2] block">EQUIPO NUEVO ELEGIDO</span>
                <span className="font-extrabold text-slate-900 text-base">{selectedPhone?.name}</span>
                <p className="text-xs text-slate-500">{selectedPhone?.specs.storage} · {selectedPhone?.color}</p>
              </div>
              <span className="font-mono font-bold text-slate-900 text-sm">
                ${phonePrice.toLocaleString('es-MX')}
              </span>
            </div>

            {/* Old phone trade-in credit */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-600 block">BONO POR RETOMA</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {diagnosedPhone.brand} {diagnosedPhone.model}
                </span>
                <p className="text-xs text-slate-500">Calificación Grado {valuation.grade}</p>
              </div>
              <span className="font-mono font-bold text-emerald-600 text-sm">
                - ${tradeInDiscount.toLocaleString('es-MX')}
              </span>
            </div>

            {/* Total Balance */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-slate-500 uppercase block">Saldo total a liquidar:</span>
                <span className="text-xs text-slate-400">Impuestos y garantía incluidos</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-black text-3xl text-[#0A4DA2]">
                  ${differenceToPay.toLocaleString('es-MX')}
                </span>
                <span className="text-xs font-bold text-slate-500 block">MXN</span>
              </div>
            </div>
          </div>

          {/* Customer Credit Notice */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-slate-700 flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-900 block">Crédito Coppel Disponible</span>
              <span>{customer?.name || 'Roberto Morales Gómez'}</span>
            </div>
            <span className="font-mono font-black text-amber-800 text-base">
              ${(customer?.availableCredit || 16850).toLocaleString('es-MX')} MXN
            </span>
          </div>
        </div>

        {/* Right Column: Payment Method Selection */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
            ¿Cómo deseas liquidar la diferencia?
          </h2>

          {/* Payment Method Tabs */}
          <div className="grid grid-cols-2 gap-3">
            {/* Option A: Coppel Credit */}
            <div
              onClick={() => {
                sounds.playClick();
                setPaymentMethod('credito_coppel');
              }}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                paymentMethod === 'credito_coppel'
                  ? 'border-[#0A4DA2] bg-white ring-4 ring-blue-100 shadow-md'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5 text-[#0A4DA2]" />
                </div>
                {paymentMethod === 'credito_coppel' && (
                  <CheckCircle2 className="w-5 h-5 text-[#0A4DA2]" />
                )}
              </div>
              <h4 className="font-extrabold text-slate-900 text-base">Crédito Coppel</h4>
              <p className="text-xs text-slate-500 mt-0.5">Abonos fijos quincenales a tu cuenta</p>
            </div>

            {/* Option B: Terminal Card */}
            <div
              onClick={() => {
                sounds.playClick();
                setPaymentMethod('terminal_tarjeta');
              }}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                paymentMethod === 'terminal_tarjeta'
                  ? 'border-[#0A4DA2] bg-white ring-4 ring-blue-100 shadow-md'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0A4DA2] flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                {paymentMethod === 'terminal_tarjeta' && (
                  <CheckCircle2 className="w-5 h-5 text-[#0A4DA2]" />
                )}
              </div>
              <h4 className="font-extrabold text-slate-900 text-base">Pago de Contado</h4>
              <p className="text-xs text-slate-500 mt-0.5">Tarjeta Débito o Crédito en la terminal</p>
            </div>
          </div>

          {/* Conditional Method Details */}
          {paymentMethod === 'credito_coppel' ? (
            /* Coppel Credit Term Selector */
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  SELECCIONA TU PLAZO EN QUINCENAS:
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Elige la mensualidad que mejor se ajuste a tu presupuesto.
                </p>
              </div>

              {/* Term choices (12, 18, 24 months) */}
              <div className="grid grid-cols-3 gap-3">
                {[12, 18, 24].map(months => {
                  const m = months as 12 | 18 | 24;
                  const quincenal = getQuincenalAmount(m);
                  const isSelected = selectedTermMonths === m;

                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setSelectedTermMonths(m);
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-[#0A4DA2] bg-blue-50/80 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-black text-slate-600 uppercase block">{m} Meses</span>
                      <span className="text-[10px] text-slate-400 block mb-1">({m * 2} Quincenas)</span>
                      <span className="font-mono font-black text-xl text-[#0A4DA2] block">
                        ${quincenal}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">quincenales</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Enganche inicial requerido:</span>
                <span className="font-bold text-emerald-600">$0 MXN (Beneficio Cliente Oro)</span>
              </div>
            </div>
          ) : (
            /* Terminal Card Simulation */
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 text-center space-y-4">
              {/* POS Terminal Visual graphic */}
              <div className="relative w-48 h-32 mx-auto rounded-2xl bg-slate-900 border-4 border-slate-700 p-3 flex flex-col justify-between text-white shadow-xl">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400 rotate-90" />
                    CONTACTLESS NFC
                  </span>
                  <span className="text-[#FFD200]">TERMINAL 01</span>
                </div>

                <div className="my-auto">
                  <p className="text-[11px] text-slate-300 font-mono">TOTAL A COBRAR:</p>
                  <p className="text-xl font-mono font-black text-emerald-400">
                    ${differenceToPay.toLocaleString('es-MX')} MXN
                  </p>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div className="w-1/2 h-full bg-[#FFD200] animate-pulse" />
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Inserta tu tarjeta en la terminal o acércala sin contacto
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Aceptamos tarjetas de Débito y Crédito Visa, Mastercard y Tarjeta Departamental Coppel.
                </p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing || paymentSuccess}
              className={`w-full py-4 px-8 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer ${
                paymentSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] shadow-yellow-500/20 active:scale-98'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Procesando pago con banco...</span>
                </>
              ) : paymentSuccess ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span>¡Pago Aprobado con Éxito!</span>
                </>
              ) : paymentMethod === 'credito_coppel' ? (
                <>
                  <span>Autorizar ${currentQuincenal} Quincenales</span>
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </>
              ) : (
                <>
                  <span>Simular Cobro en Terminal</span>
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-slate-400 text-center pt-2">
        La transacción genera comprobante fiscal digital y queda registrada inmediatamente en tu estado de cuenta Coppel.
      </div>
    </div>
  );
};
