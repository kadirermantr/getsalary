export function Card({ children, className = '', title, icon, ...props }) {
  return (
    <div
      className={`bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-primary)] ${className}`}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center gap-3 p-4 border-b border-[var(--bg-primary)]">
          {icon && <span className="text-2xl">{icon}</span>}
          {title && (
            <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
