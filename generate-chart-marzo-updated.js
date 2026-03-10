const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, 'finanzas-resumen-marzo-updated.html');
  await page.goto(`file://${htmlPath}`);
  
  // Wait for chart to load
  await page.waitForTimeout(3000);
  
  await page.screenshot({ 
    path: 'finanzas-grafico-marzo-updated.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Gráfico marzo updated generado: finanzas-grafico-marzo-updated.png');
})();