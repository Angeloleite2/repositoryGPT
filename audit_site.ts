import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    executablePath: '/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating and scrolling...');
  await page.goto('https://ptpgroup.com.ar', { waitUntil: 'networkidle' });

  // Scroll in steps
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(500);
  }

  const mapData = await page.evaluate(() => {
    const mapContainer = document.querySelector('.mapboxgl-map');
    const canvas = document.querySelector('.mapboxgl-canvas');
    return {
      container: !!mapContainer,
      canvas: !!canvas,
      visible: canvas ? (canvas as HTMLElement).offsetParent !== null : false
    };
  });
  console.log('Map Audit:', mapData);

  await browser.close();
})();
