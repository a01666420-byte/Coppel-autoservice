import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { CATALOG_PHONES } from '../../data/mockData';
import { CatalogPhone } from '../../types/kiosk';
import {
  Smartphone,
  Filter,
  Check,
  ArrowRight,
  Sparkles,
  Camera,
  Battery,
  HardDrive,
  Cpu,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Screen6Catalog: React.FC = () => {
  const { valuation, diagnosedPhone, selectedPhone, setSelectedPhone, goToStep } = useKiosk();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');

  const brands = ['all', 'Samsung', 'Apple', 'Xiaomi', 'Motorola', 'Honor', 'Google'];

  const filteredPhones = CATALOG_PHONES.filter(phone => {
    if (selectedBrand !== 'all' && phone.brand !== selectedBrand) return false;
    if (selectedPriceRange === 'under10k' && phone.price >= 10000) return false;
    if (selectedPriceRange === '10kto15k' && (phone.price < 10000 || phone.price > 15000)) return false;
    if (selectedPriceRange === 'over15k' && phone.price <= 15000) return false;
    return true;
  });

  const handleSelectPhone = (phone: CatalogPhone) => {
    sounds.playClick();
    setSelectedPhone(phone);
    goToStep(7);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 bg-slate-50 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#0A4DA2] text-xs font-bold mb-1">
            <Smartphone className="w-3.5 h-3.5" />
            Paso 6 de 7 · Catálogo de Nuevos Celulares
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
            Elige tu nuevo celular en tienda
          </h2>
        </div>

        {/* Trade-in Value Reminder Pill */}
        <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-white border-2 border-emerald-400 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="text-xs">
            <span className="text-slate-500 font-semibold block">Tu descuento por retoma:</span>
            <span className="font-mono font-black text-emerald-700 text-base">
              - ${valuation.finalValue.toLocaleString('es-MX')} MXN
            </span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-200/80 my-2">
        {/* Brand Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase mr-1">Marca:</span>
          {brands.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => {
                sounds.playClick();
                setSelectedBrand(b);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === b
                  ? 'bg-[#0A4DA2] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {b === 'all' ? 'Todas las marcas' : b}
            </button>
          ))}
        </div>

        {/* Price Range Segmented */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase mr-1">Precio:</span>
          <select
            value={selectedPriceRange}
            onChange={e => {
              sounds.playClick();
              setSelectedPriceRange(e.target.value);
            }}
            className="text-xs font-bold py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4DA2]"
          >
            <option value="all">Cualquier precio</option>
            <option value="under10k">Menos de $10,000</option>
            <option value="10kto15k">$10,000 a $15,000</option>
            <option value="over15k">Más de $15,000</option>
          </select>
        </div>
      </div>

      {/* Phones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-auto max-h-[56vh] overflow-y-auto pr-1">
        {filteredPhones.map(phone => {
          const finalPriceToPay = Math.max(0, phone.price - valuation.finalValue);
          const quincenalEstimate = Math.round(finalPriceToPay / 24);

          return (
            <div
              key={phone.id}
              className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#0A4DA2] hover:shadow-xl transition-all p-4 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Badge if present */}
              {phone.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFD200] text-[#0A4DA2] shadow-xs">
                    {phone.badge}
                  </span>
                </div>
              )}

              {/* Phone graphic container */}
              <div className="relative w-full h-36 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center p-3 mb-3">
                <div
                  className={`w-20 h-32 rounded-xl bg-gradient-to-br ${phone.imageAccent} shadow-lg border-2 border-white/60 relative flex flex-col items-center justify-between p-1.5 transition-transform group-hover:scale-105 duration-300`}
                >
                  {/* Camera bump */}
                  <div className="w-6 h-6 rounded-md bg-black/40 self-end border border-white/20 flex flex-wrap p-0.5 justify-around items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>

                  {/* Brand logo minimal */}
                  <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest pb-1">
                    {phone.brand}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#0A4DA2] uppercase tracking-wider block">
                  {phone.brand}
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
                  {phone.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">{phone.specs.storage} · {phone.color}</p>

                {/* Micro specs */}
                <div className="grid grid-cols-2 gap-1 py-1.5 text-[10px] text-slate-600 border-t border-slate-100">
                  <span className="flex items-center gap-1 truncate">
                    <Camera className="w-3 h-3 text-slate-400 shrink-0" />
                    {phone.specs.camera.split('+')[0]}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <Battery className="w-3 h-3 text-slate-400 shrink-0" />
                    {phone.specs.battery.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Pricing breakdown mandatory format */}
              <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Precio de lista:</span>
                  <span className="font-mono line-through">${phone.price.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-600 font-semibold">
                  <span>Menos tu celular:</span>
                  <span className="font-mono">- ${valuation.finalValue.toLocaleString('es-MX')}</span>
                </div>

                {/* Highlighted: Pagas solo */}
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <span className="text-xs font-black text-[#0A4DA2]">Pagas solo:</span>
                  <span className="font-mono font-black text-lg text-[#0A4DA2]">
                    ${finalPriceToPay.toLocaleString('es-MX')} <span className="text-[10px] text-slate-500">MXN</span>
                  </span>
                </div>

                <div className="text-[10px] text-center text-slate-500 font-medium">
                  o desde <strong className="text-slate-800">${quincenalEstimate} quincenales</strong> con Crédito Coppel
                </div>
              </div>

              {/* Select CTA button */}
              <button
                type="button"
                onClick={() => handleSelectPhone(phone)}
                className="mt-3 w-full py-3 px-4 rounded-xl bg-[#0A4DA2] hover:bg-blue-800 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Elegir este celular</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-xs text-slate-400 text-center pt-2">
        Todos los equipos nuevos cuentan con 1 año de garantía nacional en Coppel y se entregan sellados de fábrica.
      </div>
    </div>
  );
};
