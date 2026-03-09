// Shared stat card component used by Dashboard and Prediction pages
const COLOR_MAP = {
  accent: {
    gradient: 'from-blue-500/20 to-blue-600/5',
    text: 'text-blue-500',
  },
  green: {
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    text: 'text-emerald-500',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    text: 'text-emerald-500',
  },
  purple: {
    gradient: 'from-purple-500/20 to-purple-600/5',
    text: 'text-purple-500',
  },
  amber: {
    gradient: 'from-amber-500/20 to-amber-600/5',
    text: 'text-amber-500',
  },
  blue: {
    gradient: 'from-blue-500/20 to-blue-600/5',
    text: 'text-blue-500',
  },
};

export function StatCard({ value, label, subValue, icon, color = 'accent' }) {
  const colors = COLOR_MAP[color] || COLOR_MAP.accent;

  return (
    <div
      className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)]/50 overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
      <div className="relative px-4 py-5 lg:px-5 lg:py-6">
        <span className={`absolute top-4 right-3 lg:top-6 lg:right-5 ${colors.text}`}>{icon}</span>
        <div className="text-left">
          <p className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
            {value}
          </p>
          <p className="text-xs lg:text-sm text-[var(--text-secondary)] mt-1">{label}</p>
          {subValue && (
            <p className="text-xs text-[var(--text-secondary)]/70 mt-0.5">{subValue}</p>
          )}
        </div>
      </div>
    </div>
  );
}
