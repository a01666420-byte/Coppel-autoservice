import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { NumericKeypad } from '../common/NumericKeypad';
import { QrCode, User, CreditCard, Sparkles, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen1Account: React.FC = () => {
  const { customer, loginCustomer, goToStep } = useKiosk();

  const [activeField, setActiveField] = useState<'clientNumber' | 'pin'>('clientNumber');
  const [clientNumber, setClientNumber] = useState<string>('84920193');
  const [pin, setPin] = useState<string>('1234');
  const [showQrScan, setShowQrScan] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleNumber = (digit: string) => {
    if (activeField === 'clientNumber') {
      if (clientNumber.length < 8) {
        setClientNumber(prev => prev + digit);
        if (clientNumber.length + 1 === 8) {
          setActiveField('pin');
        }
      }
    } else {
      if (pin.length < 4) {
        setPin(prev => prev + digit);
      }
    }
  };

  const handleDelete = () => {
    if (activeField === 'clientNumber') {
      setClientNumber(prev => prev.slice(0, -1));
    } else {
      if (pin.length > 0) {
        setPin(prev => prev.slice(0, -1));
      } else {
        setActiveField('clientNumber');
      }
    }
  };

  const handleClear = () => {
    if (activeField === 'clientNumber') {
      setClientNumber('');
    } else {
      setPin('');
    }
  };

  const handleFillDemo = () => {
    sounds.playClick();
    setClientNumber('84920193');
    setPin('4821');
    setActiveField('pin');
  };

  const handleSimulateQrScan = () => {
    sounds.playScanBeam();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowQrScan(false);
      sounds.playCheckSuccess();
      loginCustomer();
    }, 1200);
  };

  const handleConfirmLogin = () => {
    sounds.playFanfare();
    loginCustomer();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* If customer is already logged in, show celebration & confirmation to proceed */}
      {customer ? (
        <div className="max-w-2xl mx-auto my-auto w-full bg-white rounded-3xl p-8 shadow-xl border-4 border-[#0A4DA2] text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-blue-50 border-4 border-[#FFD200] text-[#0A4DA2] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-[#0A4DA2]" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
            Cliente Coppel {customer.tier}
          </span>

          <h2 className="text-3xl font-black text-slate-900 mb-1">
            ¡Hola, {customer.name}!
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Número de cliente: <span className="font-mono font-bold text-slate-700">{customer.customerNumber}</span>
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-left">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span className="text-xs font-semibold text-slate-600 block">Línea de Crédito Coppel</span>
              <span className="text-2xl font-black text-[#0A4DA2] font-mono">
                ${customer.availableCredit.toLocaleString('es-MX')} MXN
              </span>
              <span className="text-[11px] text-emerald-600 font-bold block mt-1">Disponible para compras</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-xs font-semibold text-slate-600 block">Historial de Pago</span>
              <span className="text-xl font-bold text-slate-800 block mt-1">
                {customer.punctualityScore}
              </span>
              <span className="text-[11px] text-amber-700 font-bold block mt-1">Beneficios activos</span>
            </div>
          </div>

          <button
            onClick={() => goToStep(2)}
            className="w-full max-w-md py-4 px-8 bg-[#0A4DA2] hover:bg-blue-800 text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-blue-900/20 active:scale-98 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
          >
            <span>Continuar a Conectar Celular</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      ) : (
        /* Identification Step */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
          {/* Left Column: Form & Mode Selector */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold mb-2">
                <User className="w-3.5 h-3.5" />
                Paso 1 de 7 · Identificación
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
                Ingresa a tu Cuenta Coppel
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Para vincular tu línea de crédito y calcular tus abonos quincenales exactos.
              </p>
            </div>

            {/* Selector: Teclado vs App Coppel QR */}
            <div className="flex gap-2 p-1.5 bg-slate-200/80 rounded-2xl">
              <button
                type="button"
                onClick={() => setShowQrScan(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  !showQrScan ? 'bg-white text-[#0A4DA2] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Número de Cliente y NIP
              </button>

              <button
                type="button"
                onClick={() => setShowQrScan(true)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  showQrScan ? 'bg-white text-[#0A4DA2] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-4 h-4" />
                Escanear App Coppel
              </button>
            </div>

            {!showQrScan ? (
              <div className="space-y-4">
                {/* Field 1: Customer number */}
                <div
                  onClick={() => setActiveField('clientNumber')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    activeField === 'clientNumber'
                      ? 'border-[#0A4DA2] bg-white ring-4 ring-blue-100 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                    <span>NÚMERO DE CLIENTE (8 DÍGITOS)</span>
                    {clientNumber.length === 8 && (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completo
                      </span>
                    )}
                  </div>
                  <div className="h-10 flex items-center font-mono text-2xl font-black text-slate-900 tracking-wider">
                    {clientNumber || <span className="text-slate-300 font-normal text-lg">Ej: 84920193</span>}
                  </div>
                </div>

                {/* Field 2: PIN */}
                <div
                  onClick={() => setActiveField('pin')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    activeField === 'pin'
                      ? 'border-[#0A4DA2] bg-white ring-4 ring-blue-100 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                    <span>NIP CONFIDENCIAL (4 DÍGITOS)</span>
                    {pin.length === 4 && (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completo
                      </span>
                    )}
                  </div>
                  <div className="h-10 flex items-center font-mono text-3xl font-black text-slate-900 tracking-widest">
                    {pin ? '•'.repeat(pin.length) : <span className="text-slate-300 font-normal text-lg">••••</span>}
                  </div>
                </div>

                {/* Demo autofill hint */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    Cualquier dato entra en esta prueba
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[#0A4DA2] hover:underline font-bold"
                  >
                    Usar datos de prueba
                  </button>
                </div>
              </div>
            ) : (
              /* QR Code Scan Mode */
              <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 text-center space-y-4">
                <div className="relative w-44 h-44 mx-auto rounded-2xl bg-slate-900 flex items-center justify-center border-4 border-[#0A4DA2] overflow-hidden">
                  <QrCode className="w-32 h-32 text-white/90" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-blue-500/10 animate-pulse border-b-4 border-[#FFD200]" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Abre la App Coppel en tu teléfono</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Muestra tu código de cliente frente al lector óptico ubicado debajo de la pantalla.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSimulateQrScan}
                  disabled={isScanning}
                  className="w-full py-3.5 px-6 bg-[#0A4DA2] hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98"
                >
                  {isScanning ? 'Escaneando código...' : 'Simular lectura de código QR'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Numeric Keypad (if not QR) */}
          <div className="lg:col-span-6 flex justify-center">
            {!showQrScan ? (
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 shadow-lg w-full max-w-sm">
                <div className="text-center mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {activeField === 'clientNumber' ? 'Introduce tu Número' : 'Introduce tu NIP'}
                  </span>
                </div>
                <NumericKeypad
                  onNumberPress={handleNumber}
                  onDeletePress={handleDelete}
                  onClearPress={handleClear}
                  onSubmitPress={handleConfirmLogin}
                  submitLabel="Ingresar a mi cuenta"
                  submitDisabled={clientNumber.length < 4 || pin.length < 2}
                />
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-blue-50 border-2 border-blue-200 text-slate-700 space-y-4 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-[#0A4DA2] text-[#FFD200] flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-black text-xl text-[#0A4DA2]">
                  ¿Aún no tienes tu App Coppel?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Descárgala gratis en tu tienda de aplicaciones o usa tu número de cliente tradicional con el teclado en pantalla para continuar.
                </p>
                <button
                  type="button"
                  onClick={() => setShowQrScan(false)}
                  className="px-4 py-2.5 bg-white border border-blue-300 text-[#0A4DA2] font-bold text-xs rounded-xl shadow-xs hover:bg-blue-100 transition-colors"
                >
                  Regresar a ingresar con número
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer helper */}
      <div className="text-center text-xs text-slate-400 pt-2">
        Tus datos están protegidos conforme a la Ley Federal de Protección de Datos Personales.
      </div>
    </div>
  );
};
