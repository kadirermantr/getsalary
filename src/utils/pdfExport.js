import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export a DOM element as PDF
 * @param {string} elementId - The ID of the element to export
 * @param {string} filename - The filename for the PDF
 * @param {object} options - Additional options
 */
export async function exportToPDF(elementId, filename = 'report.pdf', options = {}) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  const {
    scale = 2,
    orientation = 'landscape',
    format = 'a4',
    margin = 10,
  } = options;

  // Capture element as canvas
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#0f172a', // Dark background
    logging: false,
  });

  // Calculate dimensions
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = margin;
  let heightLeft = imgHeight;

  // Add first page
  pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
  heightLeft -= pageHeight - margin * 2;

  // Add additional pages if needed
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2;
  }

  // Save the PDF
  pdf.save(filename);

  return true;
}

/**
 * Generate a simple text-based PDF report
 * @param {object} stats - Statistics object
 * @param {object} filters - Current filters
 * @param {function} t - Translation function
 * @param {string} locale - Language locale (tr or en)
 */
export function generateReport(stats, filters, t, locale = 'tr') {
  const isTurkish = locale === 'tr';
  const localeCode = isTurkish ? 'tr-TR' : 'en-US';
  const currencySymbol = '₺';
  const formatSalary = (value) => {
    if (!value) return '—';
    const formatted = value.toLocaleString(localeCode);
    return isTurkish ? `${formatted} ${currencySymbol}` : `${currencySymbol}${formatted}`;
  };
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = 20;

  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(37, 99, 235); // Blue
  pdf.text('getSalary.dev', pageWidth / 2, y, { align: 'center' });
  y += 10;

  pdf.setFontSize(14);
  pdf.setTextColor(100, 116, 139); // Gray
  pdf.text(t('dashboard.surveyTitle'), pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Filters section
  pdf.setFontSize(12);
  pdf.setTextColor(30, 41, 59); // Dark
  pdf.text(`${t('filters.year')}: ${filters.year}`, 20, y);
  y += 8;

  if (filters.position !== 'all') {
    pdf.text(`${t('filters.position')}: ${filters.position}`, 20, y);
    y += 8;
  }

  if (filters.experience !== 'all') {
    pdf.text(`${t('filters.experience')}: ${filters.experience}`, 20, y);
    y += 8;
  }

  if (filters.city !== 'all') {
    pdf.text(`${t('filters.city')}: ${filters.city}`, 20, y);
    y += 8;
  }

  y += 10;

  // Statistics
  pdf.setFontSize(14);
  pdf.setTextColor(37, 99, 235);
  pdf.text(t('dashboard.medianSalary'), 20, y);
  y += 8;

  pdf.setFontSize(24);
  pdf.setTextColor(30, 41, 59);
  pdf.text(formatSalary(stats.medianSalary), 20, y);
  y += 15;

  // Additional stats
  pdf.setFontSize(11);
  pdf.setTextColor(100, 116, 139);

  const statsData = [
    [`${t('dashboard.participants')}:`, stats.filteredCount?.toLocaleString(localeCode)],
    [`${t('dashboard.minWageMultiplier')}:`, `${stats.multiplier?.toFixed(2)}x`],
    ['25%:', formatSalary(stats.p25)],
    ['75%:', formatSalary(stats.p75)],
  ];

  statsData.forEach(([label, value]) => {
    pdf.text(label, 20, y);
    pdf.text(value, 80, y);
    y += 7;
  });

  y += 10;

  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(148, 163, 184);
  const date = new Date().toLocaleDateString(localeCode);
  pdf.text(`${t('export.generatedAt')}: ${date}`, 20, 280);
  pdf.text('getsalary.dev', pageWidth - 20, 280, { align: 'right' });

  // Save
  const filename = `salary-report-${filters.year}.pdf`;
  pdf.save(filename);

  return filename;
}
