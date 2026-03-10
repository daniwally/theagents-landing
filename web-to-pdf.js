const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the URL
  await page.goto('https://budget-landing.emergent.host/');
  
  // Wait for content to load
  await page.waitForTimeout(3000);
  
  // Generate PDF
  await page.pdf({
    path: 'budget-landing.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px'
    }
  });
  
  await browser.close();
  console.log('PDF generado: budget-landing.pdf');
})();