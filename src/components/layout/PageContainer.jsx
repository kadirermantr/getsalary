export function PageContainer({ children, className = '', size = 'default' }) {
  const maxWidthClass = size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
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
