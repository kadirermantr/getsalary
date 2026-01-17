/**
 * Export data to CSV file
 * @param {Object} stats - Statistics object from getYearStats
 * @param {number} year - Year for the filename
 * @param {Object} filters - Applied filters
 */
export function exportToCSV(stats, year, filters = {}) {
  if (!stats) return;

  const rows = [];

  // Header info
  rows.push(['getSalary.dev - Yazılım Sektörü Maaş Verileri']);
  rows.push([`Yıl: ${year}`]);
  rows.push([`Toplam Katılımcı: ${stats.participants}`]);
  rows.push([`Filtrelenmiş Katılımcı: ${stats.filteredCount}`]);
  rows.push(['']);

  // Applied filters
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => key !== 'year' && value !== 'all')
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
  if (activeFilters) {
    rows.push([`Uygulanan Filtreler: ${activeFilters}`]);
    rows.push(['']);
  }

  // General statistics
  rows.push(['Genel İstatistikler']);
  rows.push(['Metrik', 'Değer']);
  rows.push(['Medyan Maaş', stats.medianSalary]);
  rows.push(['Ortalama Maaş', Math.round(stats.averageSalary)]);
  rows.push(['25. Yüzdelik', stats.p25]);
  rows.push(['75. Yüzdelik', stats.p75]);
  rows.push(['Minimum', stats.min]);
  rows.push(['Maximum', stats.max]);
  rows.push(['Asgari Ücret', stats.minWage]);
  rows.push(['Asgari Ücret Çarpanı', stats.multiplier?.toFixed(2)]);
  rows.push(['']);

  // By Position
  if (stats.byPosition) {
    rows.push(['Pozisyona Göre']);
    rows.push(['Pozisyon', 'Katılımcı', 'Medyan', 'Ortalama', '25%', '75%']);
    Object.entries(stats.byPosition).forEach(([position, data]) => {
      rows.push([
        position,
        data.count,
        Math.round(data.median),
        Math.round(data.average),
        Math.round(data.p25),
        Math.round(data.p75),
      ]);
    });
    rows.push(['']);
  }

  // By Experience
  if (stats.byExperience) {
    rows.push(['Deneyime Göre']);
    rows.push(['Seviye', 'Katılımcı', 'Medyan', 'Ortalama', '25%', '75%']);
    Object.entries(stats.byExperience).forEach(([level, data]) => {
      rows.push([
        level,
        data.count,
        Math.round(data.median),
        Math.round(data.average),
        Math.round(data.p25),
        Math.round(data.p75),
      ]);
    });
    rows.push(['']);
  }

  // By City
  if (stats.byCity) {
    rows.push(['Şehre Göre']);
    rows.push(['Şehir', 'Katılımcı', 'Medyan', 'Ortalama', '25%', '75%']);
    Object.entries(stats.byCity).forEach(([city, data]) => {
      rows.push([
        city,
        data.count,
        Math.round(data.median),
        Math.round(data.average),
        Math.round(data.p25),
        Math.round(data.p75),
      ]);
    });
    rows.push(['']);
  }

  // By Work Mode
  if (stats.byWorkMode) {
    rows.push(['Çalışma Moduna Göre']);
    rows.push(['Mod', 'Katılımcı', 'Medyan', 'Ortalama', '25%', '75%']);
    Object.entries(stats.byWorkMode).forEach(([mode, data]) => {
      rows.push([
        mode,
        data.count,
        Math.round(data.median),
        Math.round(data.average),
        Math.round(data.p25),
        Math.round(data.p75),
      ]);
    });
    rows.push(['']);
  }

  // Convert to CSV string
  const csvContent = rows
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  // Create and download file
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `getsalary-${year}-data.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
