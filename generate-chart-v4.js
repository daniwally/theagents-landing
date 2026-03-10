const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, 'finanzas-resumen-v4.html');
  await page.goto(`file://${htmlPath}`);
  
  // Wait for chart to load
  await page.waitForTimeout(3000);
  
  await page.screenshot({ 
    path: 'finanzas-grafico-v4.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Gráfico v4 generado: finanzas-grafico-v4.png');
})();