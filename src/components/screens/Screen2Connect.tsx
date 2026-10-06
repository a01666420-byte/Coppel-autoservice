import React, { useState, useEffect } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Smartphone, Cable, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen2Connect: React.FC = () => {
  const { diagnosedPhone, goToStep } = useKiosk();
  const [connectionStage, setConnectionStage] = useState<'waiting' | 'plugging' | 'detected'>('waiting');

  useEffect(() => {
    // Automatically trigger connection after 1.8 seconds for smooth kiosk experience
    const plugTimer = setTimeout(() => {
      setConnectionStage('plugging');
      sounds.playScanBeam();
    }, 1200);

    const detectTimer = setTimeout(() => {
      setConnectionStage('detected');
      sounds.playCheckSuccess();
    }, 3200);

    return () => {
      clearTimeout(plugTimer);
      clearTimeout(detectTimer);
    };
  }, []);

  const handleManualDetect = () => {
    sounds.playCheckSuccess();
    setConnectionStage('detected');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Top step banner */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold">
          <Cable className="w-4 h-4" />
          Paso 2 de 7 · Conecta tu celular
        </div>
        <div className="text-xs font-medium text-slate-500">
          Usa el cable multi-conector (USB-C / Lightning)
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left: Graphic animation of phone in tray and cable */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-md h-80 rounded-3xl bg-slate-900 border-4 border-slate-700 shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden">
            {/* Tray status indicator lights */}
            <div className="w-full flex items-center justify-between px-2 text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${connectionStage === 'detected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                BANDEJA DE PRUEBAS 01
              </span>
              <span className={`font-bold ${connectionStage === 'detected' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {connectionStage === 'waiting' && 'ESPERANDO CABLE'}
                {connectionStage === 'plugging' && 'CONECTANDO...'}
                {connectionStage === 'detected' && 'ENLACE ESTABLECIDO'}
              </span>
            </div>

            {/* Visual Phone Model in Tray */}
            <div className="relative flex flex-col items-center my-auto">
              {/* Phone silhouette */}
              <div className="w-40 h-52 rounded-2xl bg-slate-800 border-2 border-slate-600 shadow-2xl relative flex flex-col items-center justify-between p-3 overflow-hidden">
                {/* Screen content */}
                <div className="w-full h-full rounded-xl bg-slate-950 flex flex-col items-center justify-center p-2 text-center relative">
                  {connectionStage === 'waiting' && (
                    <div className="space-y-2">
                      <Cable className="w-8 h-8 text-[#FFD200] mx-auto animate-bounce" />
                      <p className="text-[10px] text-slate-300 font-medium">Inserta el cable en el puerto</p>
                    </div>
                  )}

                  {connectionStage === 'plugging' && (
                    <div className="space-y-2">
                      <Loader2 className="w-8 h-8 text-[#FFD200] mx-auto animate-spin" />
                      <p className="text-[10px] text-slate-300 font-medium">Leyendo protocolo...</p>
                    </div>
                  )}

                  {connectionStage === 'detected' && (
                    <div className="space-y-1.5 text-center animate-fade-in">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-xs font-bold text-white">{diagnosedPhone.brand}</p>
                      <p className="text-[10px] text-emerald-300 font-semibold">{diagnosedPhone.model}</p>
                    </div>
                  )}
                </div>

                {/* Cable entering from bottom */}
                <div
                  className={`absolute -bottom-8 w-6 h-12 bg-slate-400 rounded-t-md transition-all duration-700 flex flex-col items-center ${
                    connectionStage === 'waiting' ? 'translate-y-4' : 'translate-y-0'
                  }`}
                >
                  <div className="w-3.5 h-3 bg-slate-200 rounded-t-sm" />
                  <div className="w-2 h-9 bg-slate-600" />
                </div>
              </div>

              {/* Pulsing light rings around phone */}
              {connectionStage === 'detected' && (
                <div className="absolute inset-0 border-2 border-emerald-400/40 rounded-3xl animate-pulse pointer-events-none" />
              )}
            </div>

            {/* Instruction footnote */}
            <div className="text-[11px] text-slate-400 text-center">
              {connectionStage === 'detected'
                ? 'Conexión por cable de diagnóstico completada'
                : 'Coloca el teléfono de espaldas sobre el tapete de goma'}
            </div>
          </div>

          {/* Quick simulation helper button */}
          {connectionStage !== 'detected' && (
            <button
              onClick={handleManualDetect}
              className="mt-3 text-xs text-[#0A4DA2] font-semibold hover:underline"
            >
              Simular detección inmediata
            </button>
          )}
        </div>

        {/* Right: Detected Phone Details Card or Waiting instructions */}
        <div className="lg:col-span-6 space-y-5">
          {connectionStage !== 'detected' ? (
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
                Coloca tu celular en la bandeja
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Toma el cable retráctil ubicado junto a la compuerta e insértalo firmemente en el puerto de carga de tu teléfono. No es necesario quitarle la mica protectora.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A4DA2] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-sm">
                    <strong className="text-slate-800">Desbloquea la pantalla:</strong>
                    <p className="text-slate-500 text-xs mt-0.5">Si tu celular solicita "Permitir transferir datos / Confiar en este equipo", pulsa Aceptar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A4DA2] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-sm">
                    <strong className="text-slate-800">No desconectes el cable:</strong>
                    <p className="text-slate-500 text-xs mt-0.5">El sistema realizará pruebas de diagnóstico automáticas seguras y no invasivas.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Detected Phone Specs */
            <div className="space-y-5 animate-fade-in">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Equipo detectado exitosamente
                </div>
                <h2 className="text-3xl font-black text-slate-900">
                  {diagnosedPhone.brand} {diagnosedPhone.model}
                </h2>
                <p className="text-slate-500 text-sm">
                  Información extraída directamente de los módulos internos del teléfono.
                </p>
              </div>

              {/* Specs Table */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 divide-y divide-slate-100 shadow-sm text-sm">
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500 font-medium">Marca y Modelo</span>
                  <span className="font-bold text-slate-900">{diagnosedPhone.brand} {diagnosedPhone.model}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500 font-medium">Almacenamiento interno</span>
                  <span className="font-bold text-slate-900">{diagnosedPhone.storage}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500 font-medium">Color del equipo</span>
                  <span className="font-bold text-slate-900">{diagnosedPhone.color}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500 font-medium">Número IMEI</span>
                  <span className="font-mono font-bold text-slate-800">{diagnosedPhone.imei}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500 font-medium">Número de Serie</span>
                  <span className="font-mono text-xs text-slate-600">{diagnosedPhone.serialNumber}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500 font-medium">Cuentas vinculadas</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Libre para trade-in
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => goToStep(3)}
                className="w-full py-4 px-6 bg-[#0A4DA2] hover:bg-blue-800 text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-blue-900/20 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Iniciar Diagnóstico Interno</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-slate-400 text-center pt-2">
        La conexión solo lee diagnósticos de hardware. Ningún archivo personal es transferido ni copiado.
      </div>
    </div>
  );
};
