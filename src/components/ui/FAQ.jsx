import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-[var(--text-primary)] pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = i18n.language === 'tr' ? [
    {
      question: 'Veriler nereden geliyor?',
      answer: 'Veriler, @oncekiyazilimci tarafından yıllık olarak düzenlenen Yazılım Sektörü Maaş Anketinden gelmektedir. Her yıl binlerce yazılımcı anonim olarak katılmaktadır.',
    },
    {
      question: 'Medyan neden ortalamadan daha iyi?',
      answer: 'Medyan, aşırı yüksek veya düşük değerlerden (outlier) etkilenmez. Örneğin, 10 kişiden 9\'u 30.000 TL, 1 kişi 500.000 TL kazanıyorsa, ortalama 77.000 TL çıkar ama medyan gerçekçi olan 30.000 TL\'yi gösterir.',
    },
    {
      question: 'Asgari ücret çarpanı ne anlama geliyor?',
      answer: 'Medyan yazılımcı maaşının asgari ücrete bölünmesiyle hesaplanır. Örneğin 4.5x, yazılımcıların ortalamasının asgari ücretin 4.5 katı kazandığı anlamına gelir.',
    },
    {
      question: 'Neden bazı şehirler/pozisyonlar yok?',
      answer: 'Anket verilerinde yeterli katılımcı sayısı olmayan kategoriler istatistiksel olarak güvenilir olmadığı için gösterilmemektedir.',
    },
    {
      question: 'Veriler ne kadar güncel?',
      answer: 'Site, en güncel anket verilerini kullanmaktadır. Yeni anket yayınlandığında veriler güncellenir. Şu anda 2021-2025 yılları arası veriler mevcuttur.',
    },
    {
      question: 'Projeye nasıl katkıda bulunabilirim?',
      answer: 'Proje açık kaynaklıdır. GitHub üzerinden hata bildirimi yapabilir, özellik önerebilir veya doğrudan kod katkısında bulunabilirsiniz.',
    },
  ] : [
    {
      question: 'Where does the data come from?',
      answer: 'The data comes from the annual Software Industry Salary Survey conducted by @oncekiyazilimci. Thousands of developers participate anonymously each year.',
    },
    {
      question: 'Why is median better than average?',
      answer: 'Median is not affected by extreme values (outliers). For example, if 9 out of 10 people earn 30,000 TL and 1 person earns 500,000 TL, the average would be 77,000 TL but the median shows the realistic 30,000 TL.',
    },
    {
      question: 'What does the minimum wage multiplier mean?',
      answer: 'It\'s calculated by dividing the median developer salary by the minimum wage. For example, 4.5x means developers earn 4.5 times the minimum wage on average.',
    },
    {
      question: 'Why are some cities/positions missing?',
      answer: 'Categories with insufficient participant numbers in the survey data are not shown as they are not statistically reliable.',
    },
    {
      question: 'How current is the data?',
      answer: 'The site uses the most recent survey data. Data is updated when new surveys are published. Currently, data from 2021-2025 is available.',
    },
    {
      question: 'How can I contribute to the project?',
      answer: 'The project is open source. You can report bugs, suggest features, or contribute code directly on GitHub.',
    },
  ];

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}
