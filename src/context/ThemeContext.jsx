import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  // Always dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const value = {
    theme: 'dark',
    isDark: true,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
