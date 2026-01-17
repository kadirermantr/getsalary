export function PageContainer({ children, className = '', size = 'default' }) {
  const maxWidthClass = size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative">
      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--text-secondary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className={`relative ${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, description, children }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-[var(--text-secondary)]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
