import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Smartphone, Zap, ShieldCheck, ArrowRight, Sparkles, CreditCard, Box } from 'lucide-react';

export const Screen0Welcome: React.FC = () => {
  const { goToStep } = useKiosk();

  return (
    <div className="flex-1 flex flex-col justify-between p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD200]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A4DA2]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#0A4DA2]" />
          <span className="text-sm font-bold text-[#0A4DA2] tracking-wide">
            Programa Oficial de Renovación de Celulares Coppel
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Toca la pantalla para interactuar
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
        {/* Left Column: Heading, Subtitle & Big CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none font-sans">
              Cambia tu celular <br />
              <span className="text-[#0A4DA2]">por uno nuevo </span>
              <span className="bg-gradient-to-r from-[#0A4DA2] to-blue-600 bg-clip-text text-transparent">
                en minutos.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 font-medium max-w-xl leading-relaxed">
              Entrega tu equipo actual, obtén el mejor valor garantizado y estrena el celular que siempre has querido con abonos fáciles a tu Crédito Coppel.
            </p>
          </div>

          {/* Value props in clean touch cards */}
          <div className="grid grid-cols-3 gap-3 max-w-xl">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-start gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0A4DA2] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Diagnóstico veloz</h4>
                <p className="text-[11px] text-slate-500">Escaneo de cámaras y batería en 60 seg.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-start gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Crédito Coppel</h4>
                <p className="text-[11px] text-slate-500">Paga solo la diferencia en quincenas.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-start gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Locker inteligente</h4>
                <p className="text-[11px] text-slate-500">Recoge tu equipo nuevo aquí mismo.</p>
              </div>
            </div>
          </div>

          {/* Primary Kiosk Button */}
          <div className="pt-2">
            <button
              onClick={() => goToStep(1)}
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-[#0A4DA2] hover:bg-blue-800 text-white font-black text-2xl shadow-xl shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Comenzar</span>
              <div className="w-10 h-10 rounded-xl bg-[#FFD200] text-[#0A4DA2] flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </div>
            </button>
            <p className="mt-3 text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Borrado de datos certificado y proceso 100% seguro.
            </p>
          </div>
        </div>

        {/* Right Column: Visual kiosk preview card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-200/80">
            {/* Tag */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Flujo de 3 pasos</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Sin filas ni espera
              </span>
            </div>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#0A4DA2] text-[#FFD200] font-black text-xl flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Conecta tu celular</h4>
                  <p className="text-xs text-slate-500">El kiosco evalúa la batería, pantalla y componentes.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#0A4DA2] text-[#FFD200] font-black text-xl flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Acepta la oferta</h4>
                  <p className="text-xs text-slate-500">Recibe dinero al instante como descuento directo.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#0A4DA2] text-[#FFD200] font-black text-xl flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Estrena y recoge</h4>
                  <p className="text-xs text-slate-500">Elige tu nuevo celular y recógelo en el locker de la tienda.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <div className="text-[11px] text-slate-400">
                Aceptamos todas las marcas comerciales: Samsung, Apple, Motorola, Xiaomi y más.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200/60">
        <div>
          ¿Necesitas ayuda para iniciar? Presiona el botón amarillo <strong className="text-[#0A4DA2]">"Llamar a un asesor"</strong> arriba a la derecha.
        </div>
        <div className="font-mono text-slate-400">
          KIOSK-VER 3.4.0 · COPPEL RENUEVA
        </div>
      </div>
    </div>
  );
};
