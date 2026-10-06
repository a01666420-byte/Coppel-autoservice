import React, { useState, useEffect } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { DamageSeverity } from '../../types/kiosk';
import {
  Camera,
  Scan,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  Layers,
  RotateCw,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen4ExternalScan: React.FC = () => {
  const { diagnosedPhone, goToStep } = useKiosk();

  const [scanPhase, setScanPhase] = useState<'front' | 'back' | 'lenses' | 'frame' | 'completed'>('front');
  const [activeAngle, setActiveAngle] = useState<'0°' | '90°' | '180°' | '270°'>('0°');

  useEffect(() => {
    sounds.playScanBeam();

    const t1 = setTimeout(() => {
      setScanPhase('back');
      setActiveAngle('180°');
      sounds.playScanBeam();
    }, 1400);

    const t2 = setTimeout(() => {
      setScanPhase('lenses');
      setActiveAngle('90°');
      sounds.playScanBeam();
    }, 2800);

    const t3 = setTimeout(() => {
      setScanPhase('frame');
      setActiveAngle('270°');
      sounds.playScanBeam();
    }, 4200);

    const t4 = setTimeout(() => {
      setScanPhase('completed');
      sounds.playFanfare();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleFastComplete = () => {
    setScanPhase('completed');
    sounds.playFanfare();
  };

  const getDamageBadge = (severity: DamageSeverity) => {
    switch (severity) {
      case 'sin_danio':
        return {
          label: 'Sin Daño',
          desc: 'Impecable / Óptico intacto',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
        };
      case 'desgaste_leve':
        return {
          label: 'Desgaste Leve',
          desc: 'Micro-rayones superficiales',
          color: 'bg-amber-50 text-amber-900 border-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        };
      case 'danio_visible':
        return {
          label: 'Daño Visible',
          desc: 'Fisura, golpe o rotura',
          color: 'bg-rose-50 text-rose-900 border-rose-300',
          icon: <XCircle className="w-4 h-4 text-rose-600" />,
        };
    }
  };

  const screenResult = getDamageBadge(diagnosedPhone.zones.screen);
  const backCoverResult = getDamageBadge(diagnosedPhone.zones.backCover);
  const lensesResult = getDamageBadge(diagnosedPhone.zones.cameraLenses);
  const frameResult = getDamageBadge(diagnosedPhone.zones.frameEdges);

  const isScanning = scanPhase !== 'completed';

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold mb-1">
            <Scan className="w-3.5 h-3.5" />
            Paso 4 de 7 · Escaneo Externo 360°
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
            Inspección Óptica de Alta Precisión
          </h2>
        </div>

        {isScanning && (
          <button
            onClick={handleFastComplete}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            Completar escaneo de inmediato
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left: Futuristic Scanner Bay animation */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 rounded-3xl bg-slate-950 border-4 border-slate-800 shadow-2xl p-5 flex flex-col items-center justify-between overflow-hidden">
            {/* Camera indicators top */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-[#FFD200]" />
                ÓPTICA HDR MULTI-ÁNGULO
              </span>
              <span className="text-[#FFD200] font-bold">ÁNGULO: {activeAngle}</span>
            </div>

            {/* Central chamber with phone and moving laser beam */}
            <div className="relative my-auto flex flex-col items-center justify-center w-full py-1">
              {/* Device Container with Viewfinder Frame */}
              <div className="relative">
                {/* HUD Viewfinder corner brackets */}
                {isScanning && (
                  <div className="absolute -inset-2.5 pointer-events-none z-30">
                    <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFD200] rounded-tl-sm shadow-[0_0_8px_#FFD200]" />
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFD200] rounded-tr-sm shadow-[0_0_8px_#FFD200]" />
                    <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFD200] rounded-bl-sm shadow-[0_0_8px_#FFD200]" />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFD200] rounded-br-sm shadow-[0_0_8px_#FFD200]" />
                  </div>
                )}

                {/* Phone graphic in chamber */}
                <div
                  className={`w-36 h-52 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-500 shadow-2xl relative transition-transform duration-700 flex flex-col items-center justify-center p-3 overflow-hidden ${
                    scanPhase === 'back' ? 'rotate-180 scale-95' : scanPhase === 'lenses' ? 'rotate-12 scale-105' : ''
                  }`}
                >
                  {/* Camera bumps */}
                  <div className="w-12 h-20 rounded-xl bg-slate-950/80 border border-slate-600 p-1 flex flex-col justify-around items-center">
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-blue-400/60 shadow-inner" />
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-blue-400/60 shadow-inner" />
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-blue-400/60 shadow-inner" />
                  </div>

                  <div className="mt-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                    {diagnosedPhone.model}
                  </div>

                  {/* Optical Digital Grid Overlay during scan */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:10px_10px] animate-scan-grid opacity-30" />
                  )}

                  {/* Vertical Sweeping Laser Beam across the device */}
                  {isScanning && (
                    <div className="absolute inset-x-0 top-0 pointer-events-none z-20 animate-laser-sweep">
                      {/* Trailing luminous fan / scanner illumination wash */}
                      <div className="h-12 bg-gradient-to-b from-transparent via-[#FFD200]/20 to-[#FFD200]/35 blur-[1px]" />

                      {/* Laser Line Core (White-hot center with yellow/blue aura) */}
                      <div className="relative h-[2.5px] w-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_#FFD200,0_0_22px_#FFD200,0_0_35px_#0A4DA2] animate-laser-core flex items-center justify-between">
                        {/* Left edge emitter spark */}
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFD200] ml-1" />
                        {/* Right edge emitter spark */}
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFD200] mr-1" />
                      </div>

                      {/* Forward soft glow under beam */}
                      <div className="h-3 bg-gradient-to-b from-[#FFD200]/30 to-transparent blur-xs" />
                    </div>
                  )}

                  {/* Success checkmark over device once scan is done */}
                  {!isScanning && (
                    <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-2 text-center animate-fade-in z-20">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg mb-1">
                        <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                        100% ESCANEADO
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Radial subtle chamber compass ring */}
              <div className="absolute inset-0 border border-blue-500/15 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '14s' }} />
            </div>

            {/* Chamber Footer */}
            <div className="w-full text-center text-xs font-mono">
              {isScanning ? (
                <span className="text-[#FFD200] font-bold animate-pulse">
                  {scanPhase === 'front' && 'ESCANEANDO: Pantalla Frontal...'}
                  {scanPhase === 'back' && 'ESCANEANDO: Tapa Trasera...'}
                  {scanPhase === 'lenses' && 'ESCANEANDO: Cristales de Cámara...'}
                  {scanPhase === 'frame' && 'ESCANEANDO: Marco y Esquinas...'}
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> ESCANEO 360° COMPLETADO
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Zone Results Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Resultados de Inspección por Zona
            </h3>
            <span className="text-xs font-bold text-slate-500">
              4 Zonas Analizadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Zone 1: Pantalla */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${screenResult.color}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">1. Pantalla Frontal</span>
                {screenResult.icon}
              </div>
              <div className="text-base font-extrabold text-slate-900">{screenResult.label}</div>
              <p className="text-xs text-slate-600 mt-0.5">{screenResult.desc}</p>
            </div>

            {/* Zone 2: Carcasa */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${backCoverResult.color}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">2. Tapa y Carcasa</span>
                {backCoverResult.icon}
              </div>
              <div className="text-base font-extrabold text-slate-900">{backCoverResult.label}</div>
              <p className="text-xs text-slate-600 mt-0.5">{backCoverResult.desc}</p>
            </div>

            {/* Zone 3: Lentes */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${lensesResult.color}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">3. Cristales de Cámara</span>
                {lensesResult.icon}
              </div>
              <div className="text-base font-extrabold text-slate-900">{lensesResult.label}</div>
              <p className="text-xs text-slate-600 mt-0.5">{lensesResult.desc}</p>
            </div>

            {/* Zone 4: Marco */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${frameResult.color}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">4. Marco y Esquinas</span>
                {frameResult.icon}
              </div>
              <div className="text-base font-extrabold text-slate-900">{frameResult.label}</div>
              <p className="text-xs text-slate-600 mt-0.5">{frameResult.desc}</p>
            </div>
          </div>

          {/* Explanation note */}
          <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-slate-700 leading-relaxed">
            Las cámaras del kiosco analizan la profundidad microscópica de cada superficie para garantizar que la oferta de trade-in sea 100% justa e inmediata.
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          {scanPhase === 'completed'
            ? 'Todos los datos físicos han sido registrados en tu cotización.'
            : 'Escaneo óptico en progreso...'}
        </div>

        <button
          onClick={() => goToStep(5)}
          disabled={isScanning}
          className={`py-4 px-8 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shrink-0 shadow-lg cursor-pointer ${
            !isScanning
              ? 'bg-[#0A4DA2] hover:bg-blue-800 text-white shadow-blue-900/20 active:scale-98'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Ver Valor de tu Celular</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
