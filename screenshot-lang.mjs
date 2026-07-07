import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url    = process.argv[2] || 'http://localhost:3000';
const lang   = process.argv[3] || 'tr';
const width  = parseInt(process.argv[4]) || 1280;
const height = parseInt(process.argv[5]) || 900;

const outDir = path.join(process.cwd(), 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const existing = fs.readdirSync(outDir)
  .map(f => f.match(/^screenshot-(\d+)/))
  .filter(Boolean).map(m => parseInt(m[1], 10));
const next = existing.length ? Math.max(...existing) + 1 : 1;
const outPath = path.join(outDir, `screenshot-${next}-${lang}${width <= 480 ? '-mobile' : ''}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height, isMobile: width <= 480, deviceScaleFactor: width <= 480 ? 2 : 1 });

// Set language in localStorage before page loads
await page.evaluateOnNewDocument((l) => { localStorage.setItem('sd_lang', l); }, lang);
await page.goto(url, { waitUntil: 'networkidle2' });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
