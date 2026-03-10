const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size to ensure proper rendering
  await page.setViewportSize({ width: 1200, height: 800 });
  
  // Navigate to the URL
  await page.goto('https://budget-landing.emergent.host/', { 
    waitUntil: 'networkidle' 
  });
  
  // Wait for all content to load completely
  await page.waitForTimeout(5000);
  
  // Generate PDF with better settings for web fidelity
  await page.pdf({
    path: 'budget-landing-mejorado.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: '10px',
      bottom: '10px', 
      left: '10px',
      right: '10px'
    },
    scale: 0.8
  });
  
  await browser.close();
  console.log('PDF mejorado generado: budget-landing-mejorado.pdf');
})();