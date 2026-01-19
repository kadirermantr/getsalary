/**
 * Data processing script for getSalary
 * Transforms raw survey data into normalized format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');

// Parse salary string to number (take middle of range)
function parseSalary(salaryStr) {
  if (!salaryStr || salaryStr === '' || salaryStr === null) return null;

  // Remove currency symbols and "TL"
  const cleaned = salaryStr.replace(/[₺$€TL\s]/g, '').trim();

  // Handle range format: "140.000 - 144.999"
  const rangeMatch = cleaned.match(/([\d.]+)\s*-\s*([\d.]+)/);
  if (rangeMatch) {
    const low = parseFloat(rangeMatch[1].replace(/\./g, ''));
    const high = parseFloat(rangeMatch[2].replace(/\./g, ''));
    return Math.round((low + high) / 2);
  }

  // Handle single value
  const singleMatch = cleaned.match(/([\d.]+)/);
  if (singleMatch) {
    return parseFloat(singleMatch[1].replace(/\./g, ''));
  }

  return null;
}

// Map experience string to level
function mapExperienceLevel(expStr) {
  if (!expStr) return 'Mid-Level';

  const lower = expStr.toLowerCase();

  // Junior: 0-2 years
  if (lower.includes('0 - 1') || lower.includes('1 - 2') || lower.includes('0-1') || lower.includes('1-2')) {
    return 'Junior';
  }

  // Mid-Level: 2-5 years
  if (lower.includes('1 - 3') || lower.includes('3 - 5') || lower.includes('2 - 3') || lower.includes('2 - 4')) {
    return 'Mid-Level';
  }

  // Senior: 5+ years
  if (lower.includes('5 -') || lower.includes('7 -') || lower.includes('10 -') ||
      lower.includes('12 -') || lower.includes('15') || lower.includes('üzeri')) {
    return 'Senior';
  }

  return 'Mid-Level';
}

// Map position level from data
function mapLevel(level) {
  if (!level) return 'Mid-Level';
  const lower = level.toLowerCase();
  if (lower === 'junior') return 'Junior';
  if (lower === 'middle' || lower === 'mid') return 'Mid-Level';
  if (lower === 'senior' || lower === 'lead' || lower === 'principal') return 'Senior';
  return 'Mid-Level';
}

// Normalize position name to main categories
function normalizePosition(position) {
  if (!position) return 'Diğer';

  const lower = position.toLowerCase();

  // UI/UX Designer (before Frontend to catch separately)
  if (lower.includes('ui/ux') || lower.includes('ux/ui') || lower.includes('ui designer') || lower.includes('ux designer')) {
    return 'UI/UX Designer';
  }

  // Backend
  if (lower.includes('back-end') || lower.includes('backend') || lower.includes('back end')) {
    return 'Backend Developer';
  }

  // Frontend
  if (lower.includes('front-end') || lower.includes('frontend') || lower.includes('front end') || lower.includes('ui developer')) {
    return 'Frontend Developer';
  }

  // Mobile (before Fullstack to catch cross-platform mobile devs)
  if (lower.includes('mobile') || lower.includes('ios') || lower.includes('android') || lower.includes('swift') || lower.includes('kotlin')) {
    return 'Mobile Developer';
  }

  // Fullstack
  if (lower.includes('full stack') || lower.includes('fullstack') || lower.includes('full-stack')) {
    return 'Fullstack Developer';
  }

  // DevOps / SRE / Platform / Cloud
  if (lower.includes('devops') || lower.includes('sre') || lower.includes('platform') || lower.includes('cloud') || lower.includes('infrastructure') || lower.includes('site reliability')) {
    return 'DevOps Engineer';
  }

  // C-Level positions (before other checks to catch Chief Data Officer, etc.)
  if (lower.includes('chief') || lower.includes('cto') || lower.includes('cdo') || lower.includes('cio')) {
    return 'Engineering Manager';
  }

  // System Admin / DBA / Network (before Data to catch DBA correctly)
  if (lower.includes('system') || lower.includes('sysadmin') || lower.includes('dba') || lower.includes('database admin') || lower.includes('network') || lower.includes('linux') || lower.includes('windows admin')) {
    return 'System/DB Admin';
  }

  // Data (Engineer, Scientist, Analyst, ML, AI, BI, Computer Vision)
  if (lower.includes('data') || lower.includes('ml ') || lower.includes('machine learning') || lower.includes('ai ') || lower.includes('artificial') || lower.includes('bi ') || lower.includes('business intelligence') || lower.includes('deep learning') || lower.includes('big data') || lower.includes('etl') || lower.includes('dwh') || lower.includes('datawarehouse') || lower.includes('computer vision')) {
    return 'Data/AI Engineer';
  }

  // QA / Test
  if (lower.includes('qa') || lower.includes('test') || lower.includes('quality') || lower.includes('sdet') || lower.includes('automation')) {
    return 'QA Engineer';
  }

  // Security
  if (lower.includes('security') || lower.includes('güvenlik') || lower.includes('cyber') || lower.includes('infosec') || lower.includes('penetration')) {
    return 'Security Engineer';
  }

  // Embedded / Hardware
  if (lower.includes('embedded') || lower.includes('gömülü') || lower.includes('firmware') || lower.includes('hardware') || lower.includes('iot')) {
    return 'Embedded Developer';
  }

  // Game
  if (lower.includes('game') || lower.includes('oyun') || lower.includes('unity') || lower.includes('unreal')) {
    return 'Game Developer';
  }

  // SAP / ERP
  if (lower.includes('sap') || lower.includes('erp') || lower.includes('abap') || lower.includes('odoo')) {
    return 'SAP/ERP Developer';
  }

  // Architect (before manager/lead checks)
  if (lower.includes('architect')) {
    return 'Software Architect';
  }

  // Team / Tech Lead (before manager check - these are technical leadership, not management)
  if (lower.includes('tech lead') || lower.includes('team lead') || lower.includes('team / tech lead')) {
    return 'Team/Tech Lead';
  }

  // Engineering Management (Director, Engineering Manager, etc.) - before Product/Project to catch Directors correctly
  if (lower.includes('engineering manager') || lower.includes('software development manager') || lower.includes('r&d manager') || lower.includes('it manager') || lower.includes('director') || lower.includes('head of') || lower.includes('vp ') || lower.includes('müdür') || lower.includes('yönetici') || lower.includes('digital transformation')) {
    return 'Engineering Manager';
  }

  // Agile Coach (separate from Product/Project Manager)
  if (lower.includes('agile coach') || lower.includes('scrum master')) {
    return 'Agile Coach';
  }

  // Product / Project
  if (lower.includes('product') || lower.includes('project') || lower.includes('program manager') || lower.includes('proje')) {
    return 'Product/Project Manager';
  }

  // Support / Consultant
  if (lower.includes('support') || lower.includes('consultant') || lower.includes('destek') || lower.includes('danışman')) {
    return 'Consultant/Support';
  }

  // No-Code Developer (before Software Engineer - not really a developer)
  if (lower.includes('no-code') || lower.includes('nocode')) {
    return 'Diğer';
  }

  // Software Engineer (generic)
  if (lower.includes('software engineer') || lower.includes('software developer') || lower.includes('yazılım') || lower.includes('developer') || lower.includes('engineer') || lower.includes('programmer')) {
    return 'Software Engineer';
  }

  // Business Analyst
  if (lower.includes('business analyst') || lower.includes('iş analisti')) {
    return 'Business Analyst';
  }

  // Everything else
  return 'Diğer';
}

// Normalize work mode
function normalizeWorkMode(workType) {
  if (!workType) return 'Hybrid';

  const lower = workType.toLowerCase();

  if (lower.includes('remote') && !lower.includes('hibrit') && !lower.includes('hybrid')) return 'Remote';
  if (lower.includes('hibrit') || lower.includes('hybrid') || lower.includes('karma')) return 'Hybrid';
  if (lower.includes('ofis') || lower.includes('office') || lower.includes('yerinde')) return 'Ofis';

  return 'Hybrid';
}

// Normalize company type
function normalizeCompanyType(company) {
  if (!company) return 'Corporate';

  const lower = company.toLowerCase();

  if (lower.includes('startup') || lower.includes('start-up')) return 'Startup';
  if (lower.includes('kurumsal') || lower.includes('banka') || lower.includes('sigorta') || lower.includes('telekomünikasyon')) return 'Corporate';
  if (lower.includes('ajans') || lower.includes('yazılım evi') || lower.includes('danışmanlık') || lower.includes('outsourc')) return 'Agency';
  if (lower.includes('freelance') || lower.includes('serbest')) return 'Freelance';
  if (lower.includes('e-ticaret') || lower.includes('fintech') || lower.includes('oyun')) return 'Startup';

  return 'Corporate';
}

// Normalize city
function normalizeCity(city) {
  if (!city) return 'Diğer';

  // Use toLocaleLowerCase for proper Turkish character handling
  const lower = city.toLocaleLowerCase('tr-TR');

  // İstanbul check - handle both İ and I variants
  if (lower.includes('istanbul') || lower.includes('i̇stanbul') || city.includes('İstanbul')) return 'İstanbul';
  if (lower.includes('ankara')) return 'Ankara';
  // İzmir check - handle both İ and I variants
  if (lower.includes('izmir') || lower.includes('i̇zmir') || city.includes('İzmir')) return 'İzmir';
  if (lower.includes('bursa')) return 'Bursa';
  if (lower.includes('antalya')) return 'Antalya';
  if (lower.includes('yurt dışı') || lower.includes('ingiltere') || lower.includes('almanya') || city.startsWith('*')) return 'Yurtdışı';

  return 'Diğer';
}

// Process a single year's data
function processYear(rawData, year) {
  // Handle different wrapper formats
  let records = [];
  if (Array.isArray(rawData)) {
    records = rawData;
  } else if (rawData.RECORDS) {
    records = rawData.RECORDS;
  } else if (rawData.data) {
    records = rawData.data;
  }

  const processed = [];

  for (const record of records) {
    // Get salary (handle different field names for different years)
    let salaryStr = record.salary;
    if (!salaryStr && record.salary_for_tl_currency) {
      salaryStr = record.salary_for_tl_currency;
    }

    // Skip non-TL or invalid salaries
    if (record.currency && !record.currency.includes('Türk Lirası') && !record.currency.includes('TL')) {
      continue;
    }

    const salary = parseSalary(salaryStr);
    if (!salary || salary < 1000) continue; // Skip invalid salaries

    // Use level from data, fallback to experience-based mapping
    let experienceLevel = mapLevel(record.level);

    processed.push({
      id: `${year}-${processed.length}`,
      year,
      position: normalizePosition(record.position),
      originalPosition: record.position,
      techStack: record.tech_stack || '',
      experienceYears: record.experience || '',
      experienceLevel,
      salary,
      city: normalizeCity(record.city),
      workMode: normalizeWorkMode(record.work_type),
      companyType: normalizeCompanyType(record.company),
      companySize: record.company_size || '',
    });
  }

  return processed;
}

// Main processing function
async function main() {
  const years = [2021, 2022, 2023, 2024, 2025];
  const allData = {};

  for (const year of years) {
    const rawPath = path.join(DATA_DIR, `${year}-raw.json`);

    if (!fs.existsSync(rawPath)) {
      console.log(`Skipping ${year}: raw file not found`);
      continue;
    }

    console.log(`Processing ${year}...`);
    const rawContent = fs.readFileSync(rawPath, 'utf-8');
    const rawData = JSON.parse(rawContent);

    const processed = processYear(rawData, year);
    allData[year] = processed;

    // Save individual year file
    const outPath = path.join(DATA_DIR, `${year}.json`);
    fs.writeFileSync(outPath, JSON.stringify(processed, null, 2));

    console.log(`  ${year}: ${processed.length} records processed`);
  }

  // Print summary statistics
  console.log('\n=== Summary ===');
  for (const year of years) {
    if (allData[year]) {
      const data = allData[year];
      const positions = [...new Set(data.map(d => d.position))];
      const cities = [...new Set(data.map(d => d.city))];
      const avgSalary = Math.round(data.reduce((sum, d) => sum + d.salary, 0) / data.length);

      console.log(`${year}: ${data.length} records, ${positions.length} positions, avg salary: ${avgSalary.toLocaleString('tr-TR')} TL`);
    }
  }
}

main().catch(console.error);
