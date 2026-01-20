import { ShareButtons } from '../social/ShareButtons';

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

export function PageHeaderWithShare({ title, description, shareTitle, shareDescription, className = '' }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:mb-6 ${className}`}>
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
          <div className="md:hidden flex-shrink-0">
            <ShareButtons compact title={shareTitle} description={shareDescription} />
          </div>
        </div>
        {description && (
          <p className="text-[var(--text-secondary)] mt-2">{description}</p>
        )}
      </div>
      <div className="hidden md:block flex-shrink-0">
        <ShareButtons compact title={shareTitle} description={shareDescription} />
      </div>
    </div>
  );
}
