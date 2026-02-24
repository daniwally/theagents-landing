import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
await page.goto('file:///home/ubuntu/.openclaw/workspace/shaq-listado.html');
await page.waitForTimeout(1000);
const body = page.locator('body');
await body.screenshot({ path: '/home/ubuntu/.openclaw/workspace/shaq-listado.png' });
await browser.close();
console.log('Done');
