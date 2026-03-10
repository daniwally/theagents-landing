const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, 'finanzas-resumen-final.html');
  await page.goto(`file://${htmlPath}`);
  
  // Wait for chart to load
  await page.waitForTimeout(3000);
  
  await page.screenshot({ 
    path: 'finanzas-grafico-final.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Gráfico final generado: finanzas-grafico-final.png');
})();