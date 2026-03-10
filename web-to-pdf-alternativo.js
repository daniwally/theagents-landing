const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Simular desktop browser
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  // Navigate con todas las opciones de carga
  await page.goto('https://budget-landing.emergent.host/', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  
  // Esperar que se cargue todo
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(10000);
  
  // Scroll para disparar lazy loading si existe
  await page.evaluate(() => {
    return new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
  
  await page.waitForTimeout(3000);
  
  // Método 1: PDF con CSS optimizado para impresión
  await page.addStyleTag({
    content: `
      * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
      body { margin: 0 !important; padding: 0 !important; }
      @page { margin: 0; size: A4; }
      @media print { 
        * { background: initial !important; }
        .no-print { display: none !important; }
      }
    `
  });
  
  await page.pdf({
    path: 'budget-landing-alternativo.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: '0.5in',
      bottom: '0.5in',
      left: '0.5in', 
      right: '0.5in'
    },
    scale: 0.75
  });
  
  await browser.close();
  console.log('PDF alternativo generado: budget-landing-alternativo.pdf');
})();