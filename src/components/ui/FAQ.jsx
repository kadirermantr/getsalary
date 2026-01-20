import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 px-4 flex items-center justify-between text-left cursor-pointer"
      >
        <span className="font-medium text-[var(--text-primary)] pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = i18n.language === 'tr' ? [
    {
      question: 'Veriler nereden geliyor?',
      answer: <span>Veriler, <a href="https://www.linkedin.com/in/oncekiyazilimci/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">@oncekiyazilimci</a> tarafından yıllık olarak düzenlenen Yazılım Sektörü Maaş Anketinden gelmektedir. Her yıl binlerce yazılımcı anonim olarak katılmaktadır. Ham veriler: <a href="https://github.com/oncekiyazilimci/2025-yazilim-sektoru-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2025</a>, <a href="https://github.com/oncekiyazilimci/2024-yazilim-sektoru-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2024</a>, <a href="https://github.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2023</a>, <a href="https://github.com/oncekiyazilimci/2022-yazilimci-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2022</a>, <a href="https://github.com/oncekiyazilimci/2021-yazilimci-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2021</a></span>,
    },
    {
      question: 'Veriler ne kadar güncel?',
      answer: 'Site, en güncel anket verilerini kullanmaktadır. Yeni anket yayınlandığında veriler güncellenir. Şu anda 2021-2025 yılları arası veriler mevcuttur.',
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
      question: 'Yurt dışı verileri dahil mi?',
      answer: 'Hayır. Bu site Türkiye\'deki yazılım sektörü maaşlarına odaklanmaktadır. Yurt dışında çalışanların verileri analizlere dahil edilmemiştir.',
    },
    {
      question: 'Neden bazı şehirler/pozisyonlar yok?',
      answer: 'Anket verilerinde yeterli katılımcı sayısı olmayan kategoriler istatistiksel olarak güvenilir olmadığı için gösterilmemektedir.',
    },
    {
      question: 'Pozisyonlar nasıl kategorize ediliyor?',
      answer: (
        <div className="space-y-3">
          <p>Ankette 50+ farklı pozisyon başlığı, analiz kolaylığı için 22 ana kategoriye gruplandırılmıştır:</p>
          <div className="flex flex-wrap gap-1.5">
            {['Backend Developer', 'Frontend Developer', 'Fullstack Developer', 'Mobile Developer', 'DevOps Engineer', 'Data/AI Engineer', 'QA Engineer', 'Security Engineer', 'Embedded Developer', 'Game Developer', 'Software Engineer', 'Software Architect', 'System/DB Admin', 'SAP/ERP Developer', 'Engineering Manager', 'Product/Project Manager', 'Team/Tech Lead', 'Agile Coach', 'Business Analyst', 'UI/UX Designer', 'Consultant/Support', 'Diğer'].map(cat => (
              <span key={cat} className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded">{cat}</span>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-6 mb-3">Örnek eşleştirmeler:</p>
          <div className="overflow-x-auto">
            <table className="text-xs border-collapse">
              <tbody>
                {[
                  ['Team / Tech Lead', 'Team/Tech Lead'],
                  ['Back-end Developer', 'Backend Developer'],
                  ['Mobile App Developer (iOS)', 'Mobile Developer'],
                  ['CTO, Chief Data Officer', 'Engineering Manager'],
                  ['Data Scientist, ML Engineer', 'Data/AI Engineer'],
                ].map(([from, to], i) => (
                  <tr key={i}>
                    <td className="py-1.5 pr-4 text-[var(--text-muted)]">{from}</td>
                    <td className="py-1.5 px-2 text-[var(--accent)]">→</td>
                    <td className="py-1.5 pl-2 font-medium">{to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      question: 'Projeye nasıl katkıda bulunabilirim?',
      answer: 'Proje açık kaynaklıdır. GitHub üzerinden hata bildirimi yapabilir, özellik önerebilir veya doğrudan kod katkısında bulunabilirsiniz.',
    },
    {
      question: 'Bordro hesaplayıcı nedir?',
      answer: 'Bordro hesaplayıcı, brüt maaşınızdan net maaşınızı veya net maaşınızdan brüt maaşınızı hesaplamanızı sağlar. Türkiye\'deki güncel vergi dilimleri ve SGK parametreleri kullanılır.',
    },
    {
      question: 'Bordro hesaplamasında hangi kesintiler var?',
      answer: 'SGK işçi payı (%14), işsizlik sigortası (%1), gelir vergisi (kümülatif dilimli, %15-%40 arası) ve damga vergisi (%0.759). Asgari ücret tutarı kadar kısım gelir vergisi ve damga vergisinden muaftır.',
    },
    {
      question: 'Neden bordro hesaplaması gerçek bordromdan farklı olabilir?',
      answer: 'Hesaplama sade brüt maaş içindir. Yol, yemek, özel sağlık sigortası, prim gibi ek ödemeler dahil değildir. Ayrıca şirketinizin uyguladığı özel kesintiler de farklılık yaratabilir.',
    },
  ] : [
    {
      question: 'Where does the data come from?',
      answer: <span>The data comes from the annual Software Industry Salary Survey conducted by <a href="https://www.linkedin.com/in/oncekiyazilimci/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">@oncekiyazilimci</a>. Thousands of developers participate anonymously each year. Raw data: <a href="https://github.com/oncekiyazilimci/2025-yazilim-sektoru-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2025</a>, <a href="https://github.com/oncekiyazilimci/2024-yazilim-sektoru-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2024</a>, <a href="https://github.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2023</a>, <a href="https://github.com/oncekiyazilimci/2022-yazilimci-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2022</a>, <a href="https://github.com/oncekiyazilimci/2021-yazilimci-maaslari" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">2021</a></span>,
    },
    {
      question: 'How current is the data?',
      answer: 'The site uses the most recent survey data. Data is updated when new surveys are published. Currently, data from 2021-2025 is available.',
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
      question: 'Is foreign data included?',
      answer: 'No. This site focuses on software industry salaries in Turkey. Data from those working abroad is not included in the analyses.',
    },
    {
      question: 'Why are some cities/positions missing?',
      answer: 'Categories with insufficient participant numbers in the survey data are not shown as they are not statistically reliable.',
    },
    {
      question: 'How are positions categorized?',
      answer: (
        <div className="space-y-3">
          <p>The survey contains 50+ different position titles, grouped into 22 main categories for easier analysis:</p>
          <div className="flex flex-wrap gap-1.5">
            {['Backend Developer', 'Frontend Developer', 'Fullstack Developer', 'Mobile Developer', 'DevOps Engineer', 'Data/AI Engineer', 'QA Engineer', 'Security Engineer', 'Embedded Developer', 'Game Developer', 'Software Engineer', 'Software Architect', 'System/DB Admin', 'SAP/ERP Developer', 'Engineering Manager', 'Product/Project Manager', 'Team/Tech Lead', 'Agile Coach', 'Business Analyst', 'UI/UX Designer', 'Consultant/Support', 'Other'].map(cat => (
              <span key={cat} className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded">{cat}</span>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-6 mb-3">Example mappings:</p>
          <div className="overflow-x-auto">
            <table className="text-xs border-collapse">
              <tbody>
                {[
                  ['Team / Tech Lead', 'Team/Tech Lead'],
                  ['Back-end Developer', 'Backend Developer'],
                  ['Mobile App Developer (iOS)', 'Mobile Developer'],
                  ['CTO, Chief Data Officer', 'Engineering Manager'],
                  ['Data Scientist, ML Engineer', 'Data/AI Engineer'],
                ].map(([from, to], i) => (
                  <tr key={i}>
                    <td className="py-1.5 pr-4 text-[var(--text-muted)]">{from}</td>
                    <td className="py-1.5 px-2 text-[var(--accent)]">→</td>
                    <td className="py-1.5 pl-2 font-medium">{to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      question: 'How can I contribute to the project?',
      answer: 'The project is open source. You can report bugs, suggest features, or contribute code directly on GitHub.',
    },
    {
      question: 'What is the payroll calculator?',
      answer: 'The payroll calculator allows you to calculate your net salary from gross or your gross salary from net. It uses current Turkish tax brackets and social security parameters.',
    },
    {
      question: 'What deductions are included in the payroll calculation?',
      answer: 'SSI employee contribution (14%), unemployment insurance (1%), income tax (cumulative brackets, 15%-40%), and stamp tax (0.759%). The minimum wage portion is exempt from income tax and stamp tax.',
    },
    {
      question: 'Why might the payroll calculation differ from my actual payslip?',
      answer: 'The calculation is for base gross salary only. Additional payments like transportation, meals, private health insurance, or bonuses are not included. Your company may also apply specific deductions.',
    },
  ];

  return (
    <div>
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
