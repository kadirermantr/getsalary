import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function EmbedCode({ chartId, title }) {
  const { i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const isTr = i18n.language === 'tr';

  const embedUrl = `${window.location.origin}/embed/${chartId}`;
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0" title="${title}"></iframe>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {isTr ? 'Embed Kodu' : 'Embed Code'}
        </span>
        <button
          onClick={copyToClipboard}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent)]'
          }`}
        >
          {copied ? (isTr ? 'Kopyalandı!' : 'Copied!') : (isTr ? 'Kopyala' : 'Copy')}
        </button>
      </div>
      <pre className="bg-[var(--bg-primary)] p-3 rounded text-xs text-[var(--text-secondary)] overflow-x-auto">
        <code>{embedCode}</code>
      </pre>
    </div>
  );
}
