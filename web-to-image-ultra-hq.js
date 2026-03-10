const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 2560, height: 1440 }, // 2K resolution
    deviceScaleFactor: 2 // Retina quality
  });
  
  const page = await context.newPage();
  
  // Navigate
  await page.goto('https://budget-landing.emergent.host/', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  
  // Wait for complete loading
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(10000);
  
  // Full scroll to trigger all lazy content
  await page.evaluate(() => {
    return new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
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
  
  await page.waitForTimeout(5000);
  
  // Ultra HQ screenshot
  await page.screenshot({
    fullPage: true,
    type: 'png',
    path: 'budget-landing-ultra-hq.png',
    quality: 100
  });
  
  await browser.close();
  console.log('Screenshot Ultra HQ generado: budget-landing-ultra-hq.png');
})();