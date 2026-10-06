import React, { useState, useEffect } from 'react';
import { useKiosk } from '../../context/KioskContext';
import {
  BatteryCharging,
  HardDrive,
  Touchpad,
  Camera,
  Volume2,
  Wifi,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface DiagnosticItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: 'pending' | 'testing' | 'success' | 'warning';
  resultText?: string;
}

export const Screen3InternalDiagnostic: React.FC = () => {
  const { diagnosedPhone, goToStep } = useKiosk();

  const [activeTestIndex, setActiveTestIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const testList: DiagnosticItem[] = [
    {
      id: 'battery',
      title: 'Salud de Batería',
      subtitle: 'Capacidad de retención y ciclos de carga',
      icon: <BatteryCharging className="w-5 h-5 text-amber-500" />,
      status: 'pending',
      resultText: `${diagnosedPhone.batteryHealth}% · ${diagnosedPhone.batteryHealth >= 85 ? 'Excelente estado' : 'Capacidad reducida'}`,
    },
    {
      id: 'storage',
      title: 'Almacenamiento y Memoria RAM',
      subtitle: 'Integridad de lectura y escritura flash',
      icon: <HardDrive className="w-5 h-5 text-blue-500" />,
      status: 'pending',
      resultText: `${diagnosedPhone.storage} · Memoria Flash 100% íntegra`,
    },
    {
      id: 'touch',
      title: 'Digitalizador y Pantalla Táctil',
      subtitle: 'Matriz de detección capacitiva y tasa de refresco',
      icon: <Touchpad className="w-5 h-5 text-indigo-500" />,
      status: 'pending',
      resultText: diagnosedPhone.touchScreenStatus === 'OK' ? 'Respuesta táctil 100% calibrada' : 'Respuesta táctil con variaciones',
    },
    {
      id: 'camera',
      title: 'Módulos de Cámaras',
      subtitle: 'Apertura de diafragma y enfoque autofocus',
      icon: <Camera className="w-5 h-5 text-purple-500" />,
      status: 'pending',
      resultText: 'Cámara Frontal y Trasera funcionando OK',
    },
    {
      id: 'audio',
      title: 'Bocinas y Micrófonos',
      subtitle: 'Frecuencias altas, medias y cancelación de ruido',
      icon: <Volume2 className="w-5 h-5 text-cyan-500" />,
      status: 'pending',
      resultText: 'Altavoces estéreo y micrófonos limpios',
    },
    {
      id: 'connectivity',
      title: 'Conectividad Inalámbrica',
      subtitle: 'Módulos Wi-Fi, Bluetooth y módem 5G',
      icon: <Wifi className="w-5 h-5 text-emerald-500" />,
      status: 'pending',
      resultText: 'Antenas activas y sin interferencias',
    },
    {
      id: 'security',
      title: 'Seguridad y Reporte de Robo IFT',
      subtitle: 'Sin bloqueo de fabricante ni reporte en base de datos',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      status: 'pending',
      resultText: 'IMEI Limpio · Desvinculación de cuentas autorizada',
    },
  ];

  const [items, setItems] = useState<DiagnosticItem[]>(testList);

  useEffect(() => {
    let currentIdx = 0;

    const runNextTest = () => {
      if (currentIdx >= items.length) {
        setIsCompleted(true);
        sounds.playFanfare();
        return;
      }

      // Mark current as testing
      setItems(prev =>
        prev.map((item, i) => (i === currentIdx ? { ...item, status: 'testing' } : item))
      );
      setActiveTestIndex(currentIdx);
      sounds.playClick();

      // Complete test after 700ms
      setTimeout(() => {
        setItems(prev =>
          prev.map((item, i) => {
            if (i === currentIdx) {
              const isWarning = item.id === 'touch' && diagnosedPhone.touchScreenStatus !== 'OK';
              return { ...item, status: isWarning ? 'warning' : 'success' };
            }
            return item;
          })
        );
        sounds.playCheckSuccess();
        currentIdx++;
        setTimeout(runNextTest, 300);
      }, 700);
    };

    const startTimer = setTimeout(runNextTest, 400);
    return () => clearTimeout(startTimer);
  }, [diagnosedPhone]);

  const handleFastComplete = () => {
    setItems(prev =>
      prev.map(item => {
        const isWarning = item.id === 'touch' && diagnosedPhone.touchScreenStatus !== 'OK';
        return { ...item, status: isWarning ? 'warning' : 'success' };
      })
    );
    setIsCompleted(true);
    sounds.playFanfare();
  };

  const completedCount = items.filter(it => it.status === 'success' || it.status === 'warning').length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold mb-1">
            <Cpu className="w-3.5 h-3.5" />
            Paso 3 de 7 · Diagnóstico Interno
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
            Evaluando componentes internos
          </h2>
        </div>

        {/* Progress & Fast Skip */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Progreso</span>
            <span className="text-2xl font-black text-[#0A4DA2] font-mono">{progressPercent}%</span>
          </div>
          {!isCompleted && (
            <button
              onClick={handleFastComplete}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
            >
              Acelerar pruebas
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden my-3 border border-slate-300/40">
        <div
          className="h-full bg-gradient-to-r from-[#0A4DA2] via-blue-500 to-[#FFD200] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto max-h-[52vh] overflow-y-auto pr-1">
        {items.map((item, index) => {
          const isDone = item.status === 'success';
          const isWarning = item.status === 'warning';
          const isTesting = item.status === 'testing';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-white border-emerald-300 shadow-xs'
                  : isWarning
                  ? 'bg-amber-50 border-amber-300 shadow-xs'
                  : isTesting
                  ? 'bg-blue-50/80 border-[#0A4DA2] ring-2 ring-blue-200 shadow-md'
                  : 'bg-white/60 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-600'
                      : isWarning
                      ? 'bg-amber-100 text-amber-700'
                      : isTesting
                      ? 'bg-blue-100 text-[#0A4DA2]'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h4 className="font-extrabold text-slate-900 text-sm truncate">{item.title}</h4>
                  <p className="text-xs text-slate-500 truncate">
                    {isDone || isWarning ? item.resultText : item.subtitle}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {isDone && (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
                {isWarning && (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                    <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
                {isTesting && (
                  <div className="w-8 h-8 rounded-full bg-[#0A4DA2] text-white flex items-center justify-center shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
                {item.status === 'pending' && (
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {index + 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA when completed */}
      <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          {isCompleted ? (
            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Diagnóstico de 7 pruebas internas finalizado exitosamente.
            </span>
          ) : (
            <span>Pruebas automatizadas en ejecución. Por favor no desconectes el cable.</span>
          )}
        </div>

        <button
          onClick={() => goToStep(4)}
          disabled={!isCompleted}
          className={`py-4 px-8 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shrink-0 shadow-lg cursor-pointer ${
            isCompleted
              ? 'bg-[#0A4DA2] hover:bg-blue-800 text-white shadow-blue-900/20 active:scale-98'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continuar a Escaneo Externo</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
