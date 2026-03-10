const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  // Navigate con todas las opciones de carga
  await page.goto('https://budget-landing.emergent.host/', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  
  // Esperar que se cargue todo
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(8000);
  
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
  
  // Método 1: PDF normal con mejor escala
  await page.pdf({
    path: 'budget-landing-v2.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5in',
      bottom: '0.5in',
      left: '0.5in', 
      right: '0.5in'
    },
    scale: 0.8
  });
  
  // Método 2: Captura como imagen de alta calidad y luego convertir
  const screenshot = await page.screenshot({
    fullPage: true,
    type: 'png',
    path: 'budget-landing-hq.png'
  });
  
  await browser.close();
  console.log('PDF v2 generado: budget-landing-v2.pdf');
  console.log('Screenshot HQ generado: budget-landing-hq.png');
})();