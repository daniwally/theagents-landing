const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set large viewport to capture full content
  await page.setViewportSize({ width: 1200, height: 3000 });
  
  // Navigate to the URL
  await page.goto('https://budget-landing.emergent.host/', { 
    waitUntil: 'networkidle' 
  });
  
  // Wait for all content to load completely
  await page.waitForTimeout(8000);
  
  // First try: Take full page screenshot
  await page.screenshot({
    path: 'budget-landing-screenshot.png',
    fullPage: true
  });
  
  // Second try: PDF with height set to capture everything on one page
  const content = await page.content();
  await page.setContent(content);
  
  // Evaluate page height
  const pageHeight = await page.evaluate(() => {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  });
  
  await page.pdf({
    path: 'budget-landing-completo.pdf',
    width: '1200px',
    height: `${pageHeight + 100}px`,
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  });
  
  await browser.close();
  console.log('PDF completo generado: budget-landing-completo.pdf');
  console.log('Screenshot también generado: budget-landing-screenshot.png');
})();