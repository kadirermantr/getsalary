import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { FilterProvider } from './context/FilterContext';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Calculator } from './pages/Calculator';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import ErrorBoundary from './components/error/ErrorBoundary';
import { JsonLd } from './components/seo/JsonLd';
import './i18n';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="calculator" element={<Calculator />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppLayout() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
    </LanguageProvider>
  );
}

// Toast wrapper to use theme context
function ToasterWrapper() {
  const { theme } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      theme={theme}
      toastOptions={{
        style: {
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
        },
      }}
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <ToasterWrapper />
          <DataProvider>
            <FilterProvider>
              <JsonLd />
              <Routes>
                <Route path="/*" element={<AppLayout />} />
              </Routes>
            </FilterProvider>
          </DataProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
