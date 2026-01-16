import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        dashboard: 'Dashboard',
        about: 'Hakkında',
      },
      hero: {
        title: 'Yazılım Sektörü Maaş Analizi',
        subtitle: 'return insights;',
        description: 'Türkiye yazılım sektöründeki maaş trendlerini keşfedin. 5 yıllık veri, binlerce katılımcı.',
        cta: "Dashboard'u Keşfet",
        stats: {
          years: 'Yıllık Veri',
          participants: 'Katılımcı',
          positions: 'Pozisyon',
        },
      },
      filters: {
        year: 'Yıl',
        position: 'Pozisyon',
        city: 'Şehir',
        experience: 'Deneyim',
        workMode: 'Çalışma Modu',
        all: 'Tümü',
        apply: 'Uygula',
        reset: 'Sıfırla',
      },
      positions: {
        backend: 'Backend Developer',
        frontend: 'Frontend Developer',
        fullstack: 'Fullstack Developer',
        mobile: 'Mobile Developer',
        devops: 'DevOps Engineer',
        data: 'Data Engineer',
        qa: 'QA Engineer',
      },
      experience: {
        junior: 'Junior (0-2 yıl)',
        mid: 'Mid-Level (2-5 yıl)',
        senior: 'Senior (5+ yıl)',
      },
      workMode: {
        remote: 'Remote',
        hybrid: 'Hybrid',
        office: 'Ofis',
      },
      charts: {
        salaryByPosition: 'Pozisyona Göre Maaş',
        salaryByExperience: 'Deneyime Göre Maaş',
        minWageMultiplier: 'Asgari Ücret Çarpanı',
        salaryByCity: 'Şehre Göre Maaş',
        remoteVsOffice: 'Remote vs Ofis',
        salaryByTech: 'Teknolojiye Göre Maaş',
        salaryByCompanyType: 'Şirket Tipine Göre Maaş',
        inflationComparison: 'Enflasyon Karşılaştırması',
        median: 'Medyan',
        average: 'Ortalama',
        netSalary: 'Net Maaş (TL)',
      },
      footer: {
        dataSource: 'Veri Kaynağı',
        openSource: 'Açık Kaynak',
        builtWith: 'ile yapıldı',
        copyright: 'Tüm hakları saklıdır.',
      },
      about: {
        title: 'Hakkında',
        description: 'getSalary, Türkiye yazılım sektöründeki maaş verilerini analiz eden açık kaynak bir projedir.',
        dataSources: 'Veri Kaynakları',
        methodology: 'Metodoloji',
        contact: 'İletişim',
      },
      common: {
        loading: 'Yükleniyor...',
        error: 'Bir hata oluştu',
        noData: 'Veri bulunamadı',
        currency: 'TL',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        dashboard: 'Dashboard',
        about: 'About',
      },
      hero: {
        title: 'Software Industry Salary Analysis',
        subtitle: 'return insights;',
        description: 'Explore salary trends in Turkish software industry. 5 years of data, thousands of participants.',
        cta: 'Explore Dashboard',
        stats: {
          years: 'Years of Data',
          participants: 'Participants',
          positions: 'Positions',
        },
      },
      filters: {
        year: 'Year',
        position: 'Position',
        city: 'City',
        experience: 'Experience',
        workMode: 'Work Mode',
        all: 'All',
        apply: 'Apply',
        reset: 'Reset',
      },
      positions: {
        backend: 'Backend Developer',
        frontend: 'Frontend Developer',
        fullstack: 'Fullstack Developer',
        mobile: 'Mobile Developer',
        devops: 'DevOps Engineer',
        data: 'Data Engineer',
        qa: 'QA Engineer',
      },
      experience: {
        junior: 'Junior (0-2 years)',
        mid: 'Mid-Level (2-5 years)',
        senior: 'Senior (5+ years)',
      },
      workMode: {
        remote: 'Remote',
        hybrid: 'Hybrid',
        office: 'Office',
      },
      charts: {
        salaryByPosition: 'Salary by Position',
        salaryByExperience: 'Salary by Experience',
        minWageMultiplier: 'Minimum Wage Multiplier',
        salaryByCity: 'Salary by City',
        remoteVsOffice: 'Remote vs Office',
        salaryByTech: 'Salary by Technology',
        salaryByCompanyType: 'Salary by Company Type',
        inflationComparison: 'Inflation Comparison',
        median: 'Median',
        average: 'Average',
        netSalary: 'Net Salary (TL)',
      },
      footer: {
        dataSource: 'Data Source',
        openSource: 'Open Source',
        builtWith: 'Built with',
        copyright: 'All rights reserved.',
      },
      about: {
        title: 'About',
        description: 'getSalary is an open-source project analyzing salary data in the Turkish software industry.',
        dataSources: 'Data Sources',
        methodology: 'Methodology',
        contact: 'Contact',
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        noData: 'No data found',
        currency: 'TL',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'tr', // default language
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
