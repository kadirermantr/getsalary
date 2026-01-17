import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'getSalary',
  url: 'https://getsalary.dev',
  logo: 'https://getsalary.dev/favicon.svg',
  description: 'Turkish software industry salary analysis platform',
  sameAs: ['https://github.com/kadirermantr/getsalary'],
};

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'getSalary',
  url: 'https://getsalary.dev',
  description: 'Explore salary trends in the Turkish software industry',
  inLanguage: ['tr', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://getsalary.dev/dashboard?position={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Dataset Schema (for the salary data)
const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Turkish Software Industry Salary Survey Data',
  description:
    'Annual salary survey data from Turkish software developers including positions, experience levels, cities, and work modes.',
  url: 'https://getsalary.dev/dashboard',
  license: 'https://opensource.org/licenses/MIT',
  creator: {
    '@type': 'Organization',
    name: 'oncekiyazilimci',
    url: 'https://github.com/oncekiyazilimci',
  },
  temporalCoverage: '2021/2025',
  variableMeasured: [
    {
      '@type': 'PropertyValue',
      name: 'salary',
      description: 'Net monthly salary in Turkish Lira',
    },
    {
      '@type': 'PropertyValue',
      name: 'position',
      description: 'Job position/title',
    },
    {
      '@type': 'PropertyValue',
      name: 'experience',
      description: 'Years of experience level',
    },
  ],
};

// FAQ Schema Generator
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Helper to inject schema into head
function injectSchema(schema, id) {
  // Remove existing script if any
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  // Create and inject new script
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Main JsonLd component for global schemas
export function JsonLd() {
  useEffect(() => {
    injectSchema(organizationSchema, 'schema-organization');
    injectSchema(websiteSchema, 'schema-website');
    injectSchema(datasetSchema, 'schema-dataset');

    return () => {
      // Cleanup on unmount
      ['schema-organization', 'schema-website', 'schema-dataset'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return null;
}

// FAQ JsonLd component for About page
export function FAQJsonLd({ faqs }) {
  useEffect(() => {
    if (faqs && faqs.length > 0) {
      injectSchema(generateFAQSchema(faqs), 'schema-faq');
    }

    return () => {
      const el = document.getElementById('schema-faq');
      if (el) el.remove();
    };
  }, [faqs]);

  return null;
}

// BreadcrumbList Schema for navigation
export function BreadcrumbJsonLd({ items }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    injectSchema(schema, 'schema-breadcrumb');

    return () => {
      const el = document.getElementById('schema-breadcrumb');
      if (el) el.remove();
    };
  }, [items]);

  return null;
}

export default JsonLd;
