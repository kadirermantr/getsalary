import { useTranslation } from 'react-i18next';
import { formatPercent } from '../../utils/calculations';

function Slider({ label, value, min, max, step, onChange, lang }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        <span className="text-sm font-semibold font-mono text-[var(--text-primary)]">
          {formatPercent(Math.round(value * 100), lang)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-[var(--border)] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
      />
      <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-0.5 opacity-60">
        <span>{formatPercent(Math.round(min * 100), lang)}</span>
        <span>{formatPercent(Math.round(max * 100), lang)}</span>
      </div>
    </div>
  );
}

export function ScenarioControls({ scenario, onUpdate, onPreset, activePreset }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const presets = [
    { key: 'optimistic', label: t('prediction.optimistic'), base: 'border-emerald-500/30', active: 'bg-emerald-500/30 text-emerald-300 border-emerald-400/50 shadow-emerald-500/10 shadow-md', inactive: 'bg-emerald-500/10 text-emerald-400' },
    { key: 'normal', label: t('prediction.normal'), base: 'border-blue-500/30', active: 'bg-blue-500/30 text-blue-300 border-blue-400/50 shadow-blue-500/10 shadow-md', inactive: 'bg-blue-500/10 text-blue-400' },
    { key: 'pessimistic', label: t('prediction.pessimistic'), base: 'border-red-500/30', active: 'bg-red-500/30 text-red-300 border-red-400/50 shadow-red-500/10 shadow-md', inactive: 'bg-red-500/10 text-red-400' },
  ];

  return (
    <div>
      {/* Preset buttons */}
      <div className="flex gap-2 mb-6">
        {presets.map(({ key, label, base, active, inactive }) => (
          <button
            key={key}
            onClick={() => onPreset(key)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer hover:brightness-110 active:scale-[0.98] ${base} ${activePreset === key ? active : inactive}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-6">
        <Slider
          label={t('prediction.inflation')}
          value={scenario.inflation}
          min={0.10}
          max={0.80}
          step={0.01}
          onChange={(v) => onUpdate('inflation', v)}
          lang={lang}
        />
        <Slider
          label={t('prediction.exchangeRate')}
          value={scenario.exchangeRate}
          min={-0.10}
          max={0.50}
          step={0.01}
          onChange={(v) => onUpdate('exchangeRate', v)}
          lang={lang}
        />
        <Slider
          label={t('prediction.sectorGrowth')}
          value={scenario.sectorGrowth}
          min={0}
          max={0.30}
          step={0.01}
          onChange={(v) => onUpdate('sectorGrowth', v)}
          lang={lang}
        />
      </div>
    </div>
  );
}
