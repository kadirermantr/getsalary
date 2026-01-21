import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '../public/og-image.png');

async function generateOgImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // OG image dimensions
  await page.setViewportSize({ width: 1200, height: 630 });

  // Create a custom HTML page with hero content + branding
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          width: 1200px;
          height: 630px;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
          background: #0f172a;
          color: #f1f5f9;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        /* Aurora background */
        .aurora {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 25% 5%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 75% 5%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          filter: blur(50px);
        }

        /* Dot grid */
        .dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.2;
          background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 60px;
          position: relative;
          z-index: 1;
        }

        h1 {
          font-size: 40px;
          font-weight: 500;
          color: #cbd5e1;
          margin-bottom: 40px;
        }

        .stats {
          display: flex;
          gap: 40px;
        }

        .stat {
          padding: 28px 48px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: rgba(30, 41, 59, 0.5);
        }

        .stat-value {
          font-size: 56px;
          font-weight: 700;
          font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
          color: #f1f5f9;
        }

        .stat-label {
          font-size: 18px;
          color: #94a3b8;
          margin-top: 8px;
        }

        .logo {
          font-size: 104px;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 8px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        }

        .branding {
          text-align: center;
          font-size: 36px;
          font-weight: 600;
          color: #6366f1;
          margin-top: 36px;
        }
      </style>
    </head>
    <body>
      <div class="aurora"></div>
      <div class="dots"></div>

      <div class="content">
        <div class="logo">getSalary()</div>
        <h1>Yazılım Sektörü Maaş Analizi</h1>

        <div class="stats">
          <div class="stat">
            <div class="stat-value">5+</div>
            <div class="stat-label">Yıllık Veri</div>
          </div>
          <div class="stat">
            <div class="stat-value">30K+</div>
            <div class="stat-label">Katılımcı</div>
          </div>
          <div class="stat">
            <div class="stat-value">15+</div>
            <div class="stat-label">Pozisyon</div>
          </div>
        </div>

        <div class="branding">getsalary.dev</div>
      </div>
    </body>
    </html>
  `);

  // Wait for fonts to load
  await page.waitForTimeout(500);

  // Screenshot
  await page.screenshot({
    path: OUTPUT_PATH,
    type: 'png'
  });

  await browser.close();

  console.log(`✓ OG image generated: ${OUTPUT_PATH}`);
}

generateOgImage().catch(console.error);
