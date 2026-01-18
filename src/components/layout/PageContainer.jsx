export function PageContainer({ children, className = '', size = 'default' }) {
  const maxWidthClass = size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, description, children, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">
        {title}
      </h1>
      {description && (
        <p className="text-[var(--text-secondary)] mt-2">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
