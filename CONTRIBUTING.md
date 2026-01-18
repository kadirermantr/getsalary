# Katkıda Bulunma Rehberi

getSalary projesine katkıda bulunmak istediğiniz için teşekkürler! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## Geliştirme Ortamı Kurulumu

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Repoyu fork edin ve klonlayın
git clone https://github.com/kadirermantr/getsalary.git
cd getsalary

# Bağımlılıkları yükleyin
npm install

# Development server başlatın
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## Proje Yapısı

```
src/
├── components/
│   ├── charts/        # Grafik bileşenleri (Recharts)
│   ├── filters/       # Filtre bileşenleri
│   ├── layout/        # Header, Footer
│   ├── social/        # Paylaşım butonları
│   └── ui/            # Temel UI bileşenleri
├── context/           # React Context (Theme, Data, Filter, Language)
├── data/              # JSON veri dosyaları ve config
├── hooks/             # Custom React hooks
├── pages/             # Sayfa bileşenleri
├── styles/            # Global CSS
└── utils/             # Yardımcı fonksiyonlar
```

## Komutlar

```bash
# Development server
npm run dev

# Production build
npm run build

# Build preview
npm run preview

# Unit testler
npm run test          # Watch mode
npm run test:run      # Tek seferlik çalıştır
npm run test:coverage # Coverage raporu

# E2E testler
npm run test:e2e      # Headless
npm run test:e2e:ui   # UI mode

# Linting
npm run lint
```

## Katkı Türleri

### Bug Düzeltmeleri
1. GitHub Issues'da bug'ı raporlayın veya mevcut bir issue bulun
2. Issue'da çalışacağınızı belirtin
3. Bug'ı düzeltin ve test ekleyin
4. PR açın

### Yeni Özellikler
1. Önce GitHub Issues'da tartışın
2. Onay aldıktan sonra geliştirmeye başlayın
3. Testler ekleyin
4. Dokümantasyonu güncelleyin
5. PR açın

### Yeni Yıl Verisi Ekleme

Her yıl yeni anket verileri eklendiğinde:

1. `src/data/` klasörüne yeni JSON dosyası ekleyin (örn: `2026.json`)
2. `src/data/config.js` dosyasını güncelleyin:

```javascript
export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export const DATA_SOURCES = {
  // ... mevcut yıllar
  2026: {
    file: '2026.json',
    source: 'https://github.com/oncekiyazilimci/2026-yazilim-sektoru-maaslari',
    participants: 0, // Gerçek katılımcı sayısı
  },
};
```

3. Asgari ücret verisini `src/data/minWage.json`'a ekleyin
4. PR açın

### Çeviri Güncellemeleri

Çeviriler `src/i18n.js` dosyasında bulunur:
- `tr.translation` - Türkçe
- `en.translation` - İngilizce

## Branch Stratejisi

- `main` - Production branch
- `feature/*` - Yeni özellikler
- `fix/*` - Bug düzeltmeleri
- `docs/*` - Dokümantasyon

## Commit Mesajları

Conventional Commits standardını kullanın:

```
feat: yeni özellik ekle
fix: bug düzelt
docs: dokümantasyon güncelle
style: kod formatı düzelt
refactor: kod yeniden yapılandır
test: test ekle/güncelle
chore: build/config değişiklikleri
```

Örnekler:
```
feat: 2026 yılı verisi ekle
fix: dark mode toggle hatası düzelt
docs: README'ye kurulum adımları ekle
```

## Pull Request Süreci

1. Branch'inizi güncel tutun:
```bash
git checkout main
git pull upstream main
git checkout your-branch
git rebase main
```

2. Testlerin geçtiğinden emin olun:
```bash
npm run test:run
npm run lint
npm run build
```

3. PR açın ve şunları belirtin:
   - Ne değişti
   - Neden değişti
   - İlgili issue (varsa)
   - Test etme adımları

## Kod Standartları

### JavaScript/React
- ESLint kurallarına uyun
- Function components ve hooks kullanın
- Props için destructuring kullanın
- Dosya başına tek export tercih edin

### CSS/Tailwind
- CSS değişkenleri kullanın (`var(--bg-primary)`)
- Responsive tasarım için mobile-first yaklaşım
- Semantic class isimleri kullanın

### Erişilebilirlik (a11y)
- Tüm interaktif elementlere `aria-label` ekleyin
- Renk kontrastı WCAG AA standardına uygun olsun
- Klavye navigasyonu destekleyin

## Testler

### Unit Testler
- `tests/unit/` klasöründe
- Vitest + Testing Library kullanın
- Utility fonksiyonları ve hooks için

### E2E Testler
- `tests/e2e/` klasöründe
- Playwright kullanın
- Kritik kullanıcı akışları için

## Lisans

Katkılarınız MIT lisansı altında yayınlanacaktır.

## Sorular?

GitHub Issues üzerinden sorabilirsiniz.

---

Teşekkürler!
