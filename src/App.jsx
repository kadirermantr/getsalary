import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { FilterProvider } from './context/FilterContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import './i18n';

function AppLayout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DataProvider>
          <FilterProvider>
            <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/tr" replace />} />

          {/* Language-prefixed routes */}
          <Route path="/:lang/*" element={<AppLayout />} />

          {/* Catch-all for invalid routes */}
          <Route path="*" element={<Navigate to="/tr" replace />} />
            </Routes>
          </FilterProvider>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
