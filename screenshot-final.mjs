import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
await page.goto('file:///home/ubuntu/.openclaw/workspace/wtf-final-visual.html');
await page.waitForTimeout(2000);
const slides = await page.locator('.slide').all();
for (let i = 0; i < slides.length; i++) {
  await slides[i].screenshot({ path: `/home/ubuntu/.openclaw/workspace/wtf-final-${i+1}.png` });
}
await browser.close();
console.log(`Done: ${slides.length} slides`);
