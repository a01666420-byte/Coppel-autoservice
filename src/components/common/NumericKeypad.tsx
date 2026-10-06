import React from 'react';
import { Delete, Check } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface NumericKeypadProps {
  onNumberPress: (digit: string) => void;
  onDeletePress: () => void;
  onClearPress?: () => void;
  onSubmitPress?: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberPress,
  onDeletePress,
  onClearPress,
  onSubmitPress,
  submitLabel = 'Aceptar',
  submitDisabled = false,
}) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleDigit = (digit: string) => {
    sounds.playClick();
    onNumberPress(digit);
  };

  const handleDelete = () => {
    sounds.playClick();
    onDeletePress();
  };

  const handleClear = () => {
    sounds.playClick();
    if (onClearPress) onClearPress();
  };

  const handleSubmit = () => {
    sounds.playClick();
    if (onSubmitPress && !submitDisabled) onSubmitPress();
  };

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      <div className="grid grid-cols-3 gap-3">
        {digits.map(num => (
          <button
            key={num}
            type="button"
            onClick={() => handleDigit(num)}
            className="h-16 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 border-2 border-slate-200 hover:border-[#0A4DA2] shadow-sm text-2xl font-black text-slate-800 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          >
            {num}
          </button>
        ))}

        {/* Bottom row: Clear/Action, 0, Delete */}
        {onClearPress ? (
          <button
            type="button"
            onClick={handleClear}
            className="h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border-2 border-slate-200 text-xs font-bold text-slate-600 transition-all active:scale-95 flex items-center justify-center cursor-pointer uppercase tracking-wider"
          >
            Limpiar
          </button>
        ) : (
          <div className="h-16" />
        )}

        <button
          type="button"
          onClick={() => handleDigit('0')}
          className="h-16 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 border-2 border-slate-200 hover:border-[#0A4DA2] shadow-sm text-2xl font-black text-slate-800 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
        >
          0
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="h-16 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-600 active:bg-red-100 border-2 border-slate-200 hover:border-red-200 shadow-sm text-slate-700 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title="Borrar dígito"
        >
          <Delete className="w-6 h-6" />
        </button>
      </div>

      {onSubmitPress && (
        <button
          type="button"
          disabled={submitDisabled}
          onClick={handleSubmit}
          className={`mt-4 w-full h-16 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer ${
            submitDisabled
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-200'
              : 'bg-[#FFD200] hover:bg-yellow-400 text-[#0A4DA2] border-2 border-yellow-400 shadow-yellow-500/20'
          }`}
        >
          <span>{submitLabel}</span>
          <Check className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
