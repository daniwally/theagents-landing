const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, 'finanzas-resumen.html');
  await page.goto(`file://${htmlPath}`);
  
  // Wait for chart to load
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: 'finanzas-grafico.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Gráfico generado: finanzas-grafico.png');
})();